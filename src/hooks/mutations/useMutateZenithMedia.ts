/* eslint-disable @typescript-eslint/explicit-function-return-type */
import toast from "react-hot-toast";
import { env } from "~/env.mjs";
import type { UseMutationHookProps } from "~/types/mutation-hook-types";
import { api } from "~/utils/api";
import { handleDeleteSftpFile } from "~/utils/sftp/handle-delete-sftp-file";

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
    onSuccess: async ({ title }) => {
      await ctx.zenithMedia.invalidate();
      toast.success(`${title} har skapats!`);
      onSuccess?.();
    },
    onError: async (error, input) => {
      toast.error(error.message);

      if (input.url.startsWith(env.NEXT_PUBLIC_SFTP_BASE_URL)) {
        await handleDeleteSftpFile({ url: input.url }, true);
      }

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
    onSuccess: async ({ title }) => {
      toast.success(`${title} har uppdaterats!`);
      await ctx.zenithMedia.invalidate();
      onSuccess?.();
    },
    onError: async (error, input) => {
      toast.error(
        `${error.message}\n Mediet kan raderats eller ändrats i samband med med ovanstående fel\n Försök ladda upp mediet igen!`,
        {
          duration: 6000,
        },
      );

      if (input.url && input.url.startsWith(env.NEXT_PUBLIC_SFTP_BASE_URL)) {
        await handleDeleteSftpFile({ url: input.url }, true);
      }

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
    onSettled: async (_c, _d, _e, toastId) => {
      toast.remove(toastId);
      await ctx.zenithMedia.invalidate();
      onSettled?.();
    },
    onSuccess: () => {
      toast.success("Mediet har raderats!");
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message);
      onError?.();
    },
  });
};
