/* eslint-disable @typescript-eslint/explicit-function-return-type */
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import type { UseMutationFunctionProps } from "./types";

export const useCreateDocumentGroupAsAuthed = ({
  onError,
  onSettled,
  onSuccess,
}: UseMutationFunctionProps) => {
  const ctx = api.useUtils();

  return api.document.createOneGroupAsAuthed.useMutation({
    onMutate: () => toast.loading("Skapar ny dokumentgrupp..."),
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

export const useUpdateDocumentGroupAsAuthed = ({
  onError,
  onSettled,
  onSuccess,
}: UseMutationFunctionProps) => {
  const ctx = api.useUtils();

  return api.document.updateOneGroupAsAuthed.useMutation({
    onMutate: () => toast.loading("Uppdaterar dokumentgrupp..."),
    onSettled: (_, __, ___, toastId) => {
      toast.dismiss(toastId);
      onSettled?.();
    },
    onSuccess: async (response) => {
      toast.success(JSON.stringify(response, null, 2));
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

export const useDeleteDocumentGroupAsAuthed = ({
  onError,
  onSettled,
  onSuccess,
}: UseMutationFunctionProps) => {
  const ctx = api.useUtils();

  return api.document.deleteOneGroupAsAuthed.useMutation({
    onMutate: () => toast.loading("Raderar dokumentgrupp..."),
    onSettled: (_c, _d, _e, toastId) => {
      toast.remove(toastId);
      onSettled?.();
    },
    onSuccess: async () => {
      toast.success("Dokumentgruppen har raderats!");
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
