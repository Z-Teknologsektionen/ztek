import toast from "react-hot-toast";
import { api } from "~/utils/api";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAddCommitteeSocialLinksAsUser = () => {
  const ctx = api.useUtils();

  return api.committee.setCommitteeSocialLinksAsUser.useMutation({
    onMutate: () => toast.loading("Uppdaterar länkar..."),
    onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
    onSuccess: async () => {
      toast.success(`Länkarna har uppdaterats!`);
      await ctx.committee.invalidate();
    },
    onError: (error) => {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Någaot gick fel. Försök igen senare");
      }
    },
  });
};
