/* eslint-disable @typescript-eslint/explicit-function-return-type */
import toast from "react-hot-toast";
import type { UseMutationHookProps } from "~/types/mutation-hook-types";
import { api } from "~/utils/api";

export const useCreateCourseAsAuthed = ({
  onError,
  onSettled,
  onSuccess,
}: UseMutationHookProps) => {
  const ctx = api.useUtils();

  return api.course.createCourseAsAuthed.useMutation({
    onMutate: () => toast.loading("Skapar ny kurs..."),
    onSettled: (_, __, ___, toastId) => {
      toast.dismiss(toastId);
      onSettled?.();
    },
    onSuccess: async ({ name, code }) => {
      toast.success(`${code} - ${name} har skapats!`);
      await ctx.course.invalidate();
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
