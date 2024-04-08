/* eslint-disable @typescript-eslint/explicit-function-return-type */
import toast from "react-hot-toast";
import type { UseMutationHookProps } from "~/types/mutation-hook-types";
import { api } from "~/utils/api";
import { handleDeleteSftpFile } from "~/utils/sftp/api-calls";

export const useCreateZenithMediaAsAuthed = ({
  onError,
  onSettled,
  onSuccess,
}: UseMutationHookProps) => {
  const ctx = api.useUtils();

  return api.zenithMedia.createOneAsAuthed.useMutation({
    onMutate: () => toast.loading("Skapar ny media..."),
    onSettled: (_, __, ___, toastId) => {
      toast.dismiss(toastId);
      onSettled?.();
    },
    onSuccess: () => {
      void ctx.zenithMedia.invalidate();
      onSuccess?.();
    },
    onError: (error, data) => {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Något gick fel. Försök igen senare");
      }
      const deleteToastId = toast.loading("Tar bort filen från servern...");
      handleDeleteSftpFile(data.url)
        .then(() => {
          toast.dismiss(deleteToastId);
          toast.success("Filen har tagits bort från servern.");
        })
        .catch((err: Error) => {
          toast.dismiss(deleteToastId);
          toast.error(
            `Kunde inte ta bort filen från servern. \n ${err.message}`,
          );
        });
      onError?.();
    },
  });
};

export const useUpdateZenithMediaAsAuthed = ({
  onError,
  onSettled,
  onSuccess,
}: UseMutationHookProps) => {
  const ctx = api.useUtils();

  return api.zenithMedia.updateOneAsAuthed.useMutation({
    onMutate: () => toast.loading("Uppdaterar media..."),
    onSettled: (_, __, ___, toastId) => {
      toast.dismiss(toastId);
      onSettled?.();
    },
    onSuccess: ({ title }) => {
      toast.success(`${title} har uppdaterats!`);
      void ctx.zenithMedia.invalidate();
      onSuccess?.();
    },
    onError: (error, data) => {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Något gick fel. Försök igen senare");
      }
      if (!data.url) return;
      const deleteToastId = toast.loading("Tar bort filen från servern...");
      handleDeleteSftpFile(data.url)
        .then(() => {
          toast.dismiss(deleteToastId);
          toast.success("Filen har tagits bort från servern.");
        })
        .catch((err: Error) => {
          toast.dismiss(deleteToastId);
          toast.error(
            `Kunde inte ta bort filen från servern. \n ${err.message}`,
          );
        });
      onError?.();
    },
  });
};

export const useDeleteZenithMediaAsAuthed = ({
  onError,
  onSettled,
  onSuccess,
}: UseMutationHookProps) => {
  const ctx = api.useUtils();

  return api.zenithMedia.deleteOneAsAuthed.useMutation({
    onMutate: () => toast.loading("Raderar mediet..."),
    onSettled: (_c, _d, _e, toastId) => {
      toast.remove(toastId);
      void ctx.zenithMedia.invalidate();
      onSettled?.();
    },
    onSuccess: () => {
      toast.success("Mediet har raderats!");
      void ctx.zenithMedia.invalidate();
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
