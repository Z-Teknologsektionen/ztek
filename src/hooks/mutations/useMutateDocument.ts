/* eslint-disable @typescript-eslint/explicit-function-return-type */
import toast from "react-hot-toast";
import type { UseMutationHookProps } from "~/types/mutation-hook-types";
import { api } from "~/utils/api";

export const useCreateDocumentAsAuthed = ({
  onError,
  onSettled,
  onSuccess,
}: UseMutationHookProps) => {
  const ctx = api.useUtils();

  return api.document.createOneAsAuthed.useMutation({
    onMutate: () => toast.loading("Skapar nytt dokument..."),
    onSettled: (_, __, ___, toastId) => {
      toast.dismiss(toastId);
      onSettled?.();
    },
    onSuccess: async () => {
      toast.success("En nytt dokument har skapats.");
      await ctx.document.invalidate();
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

export const useDeleteDocumentAsAuthed = ({
  onError,
  onSettled,
  onSuccess,
}: UseMutationHookProps) => {
  const ctx = api.useUtils();

  return api.document.deleteOneAsAuthed.useMutation({
    onMutate: () => toast.loading("Raderar dokument..."),
    onSettled: (_c, _d, _e, toastId) => {
      toast.remove(toastId);
      onSettled?.();
    },
    onSuccess: async () => {
      toast.success("Dokumentet har raderats!");
      await ctx.document.invalidate();
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

export const useUpdateDocumentAsAuthed = ({
  onError,
  onSettled,
  onSuccess,
}: UseMutationHookProps) => {
  const ctx = api.useUtils();

  return api.document.updateOneAsAuthed.useMutation({
    onMutate: () => toast.loading("Uppdaterar dokument..."),
    onSettled: (_c, _d, _e, toastId) => {
      toast.remove(toastId);
      onSettled?.();
    },
    onSuccess: async () => {
      toast.success("Dokumentet har uppdaterats!");
      await ctx.document.invalidate();
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
