/* eslint-disable @typescript-eslint/explicit-function-return-type */
import toast from "react-hot-toast";
import type { UseMutationHookProps } from "~/types/mutation-hook-types";
import { api } from "~/utils/api";

export const useCreateCommitteeAsAuthed = ({
  onError,
  onSettled,
  onSuccess,
}: UseMutationHookProps) => {
  const ctx = api.useUtils();

  return api.committee.createCommitteeAsAuthed.useMutation({
    onMutate: () => toast.loading("Skapar nytt organ..."),
    onSettled: (_, __, ___, toastId) => {
      toast.dismiss(toastId);
      onSettled?.();
    },
    onSuccess: async ({ name }) => {
      toast.success(`Ett nytt organ med namnet: ${name} har skapats!`);
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

export const useUpdateCommitteeAsAuthed = ({
  onError,
  onSettled,
  onSuccess,
}: UseMutationHookProps) => {
  const ctx = api.useUtils();

  return api.committee.updateCommitteeAsAuthed.useMutation({
    onMutate: () => toast.loading("Uppdaterar organet..."),
    onSettled: (_, __, ___, toastId) => {
      toast.dismiss(toastId);
      onSettled?.();
    },
    onSuccess: async () => {
      toast.success(`Organet har uppdaterats!`);
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

export const useDeleteCommitteeAsAuthed = ({
  onError,
  onSettled,
  onSuccess,
}: UseMutationHookProps) => {
  const ctx = api.useUtils();

  return api.committee.deleteCommitteeAsAuthed.useMutation({
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

export const useAddCommitteeSocialLinksAsActive = () => {
  const ctx = api.useUtils();

  return api.committee.setCommitteeSocialLinksAsActive.useMutation({
    onMutate: () => toast.loading("Uppdaterar länkar..."),
    onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
    onSuccess: async () => {
      toast.success(`Länkarna har uppdaterats!`);
      await ctx.committee.invalidate();
    },
    onError: (error) => {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Någaot gick fel. Försök igen senare");
      }
    },
  });
};

export const useUpdateCommitteeAsActive = () => {
  const ctx = api.useUtils();

  return api.committee.updateCommitteeAsActive.useMutation({
    onMutate: () => toast.loading("Uppdaterar organet..."),

    onSettled: async (_, __, ___, toastId) => {
      toast.dismiss(toastId);
      await ctx.committee.invalidate();
    },
    onSuccess: () => toast.success("Organet har uppdaterats"),
    onError: (error) => {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Något gick fel. Försök igen senare");
      }
    },
  });
};
