/* eslint-disable @typescript-eslint/explicit-function-return-type */
import toast from "react-hot-toast";
import type { UseMutationHookProps } from "~/types/mutation-hook-types";
import { api } from "~/utils/api";

export const useSendZaloonenBookingEmail = ({
  onError,
  onSettled,
  onSuccess,
}: UseMutationHookProps) => {
  return api.email.send.useMutation({
    onMutate: () => toast.loading("Skickar email..."), // Changed the message here
    onSettled: (_, __, ___, toastId) => {
      toast.dismiss(toastId);
      onSettled?.();
    },
    onSuccess: () => {
      toast.success("Mailet har skickats");
      onSuccess?.();
    },
    onError: () => {
      toast.error("Något gick fel. Försök igen senare");
      onError?.();
    },
  });
};
