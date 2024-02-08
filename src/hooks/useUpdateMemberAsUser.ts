import toast from "react-hot-toast";
import { api } from "~/utils/api";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useUpdateMemberAsUser = () => {
  const ctx = api.useUtils();

  return api.member.updateMemberAsActive.useMutation({
    onMutate: () => toast.loading("Uppdaterar medlem..."),
    onSettled: async (_, __, ___, toastId) => {
      toast.dismiss(toastId);
      await ctx.committee.invalidate();
    },
    onSuccess: ({ role }) => {
      toast.success(`Medlem med roll "${role}" har uppdaterats!`);
    },
    onError: (error) => {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Något gick fel. Försök igen senare");
      }
    },
  });
};
