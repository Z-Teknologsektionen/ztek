/* eslint-disable @typescript-eslint/explicit-function-return-type */
import toast from "react-hot-toast";
import type { UseMutationHookProps } from "~/types/mutation-hook-types";
import { api } from "~/utils/api";

export const useCreateOldCommitteeAsActive = ({
  onError,
  onSettled,
  onSuccess,
}: UseMutationHookProps) => {
  const ctx = api.useUtils();

  return api.oldCommittee.createOldCommitteeAsActive.useMutation({
    onMutate: () => toast.loading("Skapar ny patetgrupp..."),
    onSettled: (_, __, ___, toastId) => {
      toast.dismiss(toastId);
      onSettled?.();
    },
    onSuccess: async ({ name: name }) => {
      toast.success(`${name} har skapats!`);
      await ctx.oldCommittee.invalidate();
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

export const useCreateOldCommitteeFromCommitteeAsActive = ({
  onError,
  onSettled,
  onSuccess,
}: UseMutationHookProps) => {
  const ctx = api.useUtils();

  return api.oldCommittee.createOldCommitteeFromCommitteeAsActive.useMutation({
    onMutate: () => toast.loading("Skapar ny patetgrupp från sittande..."),
    onSettled: (_, __, ___, toastId) => {
      toast.dismiss(toastId);
      onSettled?.();
    },
    onSuccess: async ({ name: name, year }) => {
      toast.success(
        `Ett nytt patetorgan med namnet: ${name} och året ${year} har skapats. \n Om någon blev fel eller om du vill ändra något kan du redigera patetorganet`,
      );
      await ctx.oldCommittee.invalidate();
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

export const useUpdateOldCommitteAsAuthed = ({
  onError,
  onSettled,
  onSuccess,
}: UseMutationHookProps) => {
  const ctx = api.useUtils();

  return api.oldCommittee.updateOneAsActive.useMutation({
    onMutate: () => toast.loading("Uppdaterar organet..."),
    onSettled: (_, __, ___, toastId) => {
      toast.dismiss(toastId);
      onSettled?.();
    },
    onSuccess: async () => {
      toast.success(`Patetorganet har uppdaterats!`);
      await ctx.oldCommittee.invalidate();
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

export const useDeleteOldCommitteAsAuthed = ({
  onError,
  onSettled,
  onSuccess,
}: UseMutationHookProps) => {
  const ctx = api.useUtils();

  return api.oldCommittee.deleteOneAsActive.useMutation({
    onMutate: () => toast.loading("Raderar patetorgan..."),
    onSettled: (_c, _d, _e, toastId) => {
      toast.remove(toastId);
      onSettled?.();
    },
    onSuccess: async () => {
      toast.success("Patetorganet har raderats!");
      await ctx.oldCommittee.invalidate();
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
