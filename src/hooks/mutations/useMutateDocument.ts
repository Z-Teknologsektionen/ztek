/* eslint-disable @typescript-eslint/explicit-function-return-type */
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import type { UseMutationFunctionProps } from "./types";

export const useCreateDocumentAsAuthed = ({
  onError,
  onSettled,
  onSuccess,
}: UseMutationFunctionProps) => {
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
}: UseMutationFunctionProps) => {
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
}: UseMutationFunctionProps) => {
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
