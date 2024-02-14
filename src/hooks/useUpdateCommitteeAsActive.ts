import toast from "react-hot-toast";
import { api } from "~/utils/api";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useUpdateCommitteeAsActive = () => {
  const ctx = api.useUtils();

  return api.committee.updateCommitteeAsActive.useMutation({
    onMutate: () => toast.loading("Uppdaterar organet..."),

    onSettled: async (_, __, ___, toastId) => {
      toast.dismiss(toastId);
      await ctx.committee.invalidate();
    },
    onSuccess: () => toast.success("Organet har uppdaterats"),
    onError: (error) => {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Något gick fel. Försök igen senare");
      }
    },
  });
};
