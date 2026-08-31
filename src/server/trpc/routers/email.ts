import { sendEmailSchema } from "~/schemas/email";
import { trpc } from "~/server/trpc/init";
import { sendEmail } from "~/utils/mail/mail-engine";
import { publicProcedure } from "~/server/trpc/procedure-builders";

export const emailRouter = trpc.router({
  sendEmail: publicProcedure
    .input(sendEmailSchema)
    .mutation(async ({ input }) => {
      // Send email
      await sendEmail(input);
    }),
});
