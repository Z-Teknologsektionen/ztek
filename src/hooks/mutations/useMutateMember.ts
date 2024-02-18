/* eslint-disable @typescript-eslint/explicit-function-return-type */
import toast from "react-hot-toast";
import type { UseMutationHookProps } from "~/types/mutation-hook-types";
import { api } from "~/utils/api";

export const useCreateMemberAsAuthed = ({
  onError,
  onSettled,
  onSuccess,
}: UseMutationHookProps) => {
  const ctx = api.useUtils();

  return api.member.createMemberAsAuthed.useMutation({
    onMutate: () => toast.loading("Skapar ny medlem..."),
    onSettled: (_, __, ___, toastId) => {
      toast.dismiss(toastId);
      onSettled?.();
    },
    onSuccess: async ({
      name: userName,
      committee: { name: committeeName },
    }) => {
      toast.success(`${userName} i ${committeeName} har skapats!`);
      await ctx.committee.invalidate();
      await ctx.member.invalidate();
      await ctx.user.invalidate();
      onSuccess?.();
    },
    onError: (error) => {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Något gick fel. Försök igen senare");
      }
      onError?.();
    },
  });
};

export const useUpdateMemberAsAuthed = ({
  onError,
  onSettled,
  onSuccess,
}: UseMutationHookProps) => {
  const ctx = api.useUtils();

  return api.member.updateMemberAsAuthed.useMutation({
    onMutate: () => toast.loading("Uppdaterar medlem..."),
    onSettled: (_, __, ___, toastId) => {
      toast.dismiss(toastId);
      onSettled?.();
    },
    onSuccess: async () => {
      toast.success(`Medlem har uppdaterats!`);
      await ctx.committee.invalidate();
      await ctx.member.invalidate();
      onSuccess?.();
    },
    onError: (error) => {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Något gick fel. Försök igen senare");
      }
      onError?.();
    },
  });
};

export const useDeleteMemberAsAuthed = ({
  onError,
  onSettled,
  onSuccess,
}: UseMutationHookProps) => {
  const ctx = api.useUtils();

  return api.member.deleteMemberAsAuthed.useMutation({
    onMutate: () => toast.loading("Raderar medlem..."),
    onSettled: (_c, _d, _e, toastId) => {
      toast.remove(toastId);
      onSettled?.();
    },
    onSuccess: async () => {
      toast.success("Medlem har raderats!");
      await ctx.member.invalidate();
      await ctx.committee.invalidate();
      onSuccess?.();
    },
    onError: (error) => {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Något gick fel. Försök igen senare");
      }
      onError?.();
    },
  });
};
export const useUpdateMemberAsActive = () => {
  const ctx = api.useUtils();

  return api.member.updateMemberAsActive.useMutation({
    onMutate: () => toast.loading("Uppdaterar medlem..."),
    onSettled: async (_, __, ___, toastId) => {
      toast.dismiss(toastId);
      await ctx.committee.invalidate();
    },
    onSuccess: ({ role }) => {
      toast.success(`Medlem med roll "${role}" har uppdaterats!`);
    },
    onError: (error) => {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Något gick fel. Försök igen senare");
      }
    },
  });
};
