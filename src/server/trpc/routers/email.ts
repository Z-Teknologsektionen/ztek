import { sendEmailSchema } from "~/schemas/email";
import { trpc } from "~/server/trpc/init";
import { publicProcedure } from "~/server/trpc/procedure-builders";
import { sendEmail } from "~/utils/mail/mail-engine";

export const emailRouter = trpc.router({
  sendEmail: publicProcedure
    .input(sendEmailSchema)
    .mutation(async ({ input }) => {
      // Send email
      await sendEmail(input);
    }),
});
