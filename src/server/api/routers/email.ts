import { sendEmailSchema } from "~/schemas/email";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { sendEmail } from "~/utils/mail/mail-engine";

export const emailRouter = createTRPCRouter({
  sendEmail: publicProcedure
    .input(sendEmailSchema)
    .mutation(async ({ input }) => {
      // Send email
      await sendEmail(input);
    }),
});
