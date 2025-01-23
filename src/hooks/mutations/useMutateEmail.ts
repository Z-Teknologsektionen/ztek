/* eslint-disable @typescript-eslint/explicit-function-return-type */
import toast from "react-hot-toast";
import type { UseMutationHookProps } from "~/types/mutation-hook-types";
import { api } from "~/utils/api";

export const useSendEmail = ({
  onError,
  onSettled,
  onSuccess,
}: UseMutationHookProps) => {
  return api.email.sendEmail.useMutation({
    onMutate: () => toast.loading("Skickar mail..."),
    onSettled: (_, __, ___, toastId) => {
      toast.dismiss(toastId);
      onSettled?.();
    },
    onSuccess: () => {
      toast.success("Mailet har skickats!");
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
