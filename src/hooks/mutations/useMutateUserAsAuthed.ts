/* eslint-disable @typescript-eslint/explicit-function-return-type */
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import type { UseMutationFunctionProps } from "./types";

export const useUpdateUserAsAuthed = ({
  onError,
  onSettled,
  onSuccess,
}: UseMutationFunctionProps) => {
  const ctx = api.useUtils();

  return api.user.updateUserRolesAsAuthed.useMutation({
    onMutate: () => toast.loading("Uppdaterar behörigheter..."),
    onSettled: (_, __, ___, toastId) => {
      toast.dismiss(toastId);
      onSettled?.();
    },
    onSuccess: async ({ roles }) => {
      toast.success(`Följade behörigheter har satts: ${roles.join(", ")}`);
      await ctx.user.invalidate();
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
