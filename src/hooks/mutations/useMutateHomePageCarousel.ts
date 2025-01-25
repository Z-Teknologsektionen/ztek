/* eslint-disable @typescript-eslint/explicit-function-return-type */
import toast from "react-hot-toast";
import type { UseMutationHookProps } from "~/types/mutation-hook-types";
import { api } from "~/utils/api";

export const useCreateCarouselAsActive = ({
  onError,
  onSettled,
  onSuccess,
}: UseMutationHookProps) => {
  const ctx = api.useUtils();

  return api.homePageCarousel.createOneAsActive.useMutation({
    onMutate: () => toast.loading("Skapar karusellen..."),
    onSettled: async (_, __, ___, toastId) => {
      toast.dismiss(toastId);
      await ctx.homePageCarousel.invalidate();
      onSettled?.();
    },
    onSuccess: () => {
      toast.success("Karusellen har skapats");
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

export const useUpdateCarouselAsActive = ({
  onError,
  onSettled,
  onSuccess,
}: UseMutationHookProps) => {
  const ctx = api.useUtils();

  return api.homePageCarousel.updateOneAsActive.useMutation({
    onMutate: () => toast.loading("Uppdaterar karusellen..."),
    onSettled: async (_, __, ___, toastId) => {
      toast.dismiss(toastId);
      await ctx.homePageCarousel.invalidate();
      onSettled?.();
    },
    onSuccess: () => {
      toast.success("Karusellen har uppdaterats");
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

export const useDeleteCarouselAsActive = ({
  onError,
  onSettled,
  onSuccess,
}: UseMutationHookProps = {}) => {
  const ctx = api.useUtils();

  return api.homePageCarousel.deleteOneAsActive.useMutation({
    onMutate: () => toast.loading("Raderar karusellen..."),
    onSettled: async (_, __, ___, toastId) => {
      toast.dismiss(toastId);
      await ctx.homePageCarousel.invalidate();
      onSettled?.();
    },
    onSuccess: () => {
      toast.success("Karusellen har raderats");
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
