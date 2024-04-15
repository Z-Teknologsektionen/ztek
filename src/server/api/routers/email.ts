import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { sendEmail } from "~/utils/mail/email-engine";

export const emailRouter = createTRPCRouter({
  send: publicProcedure.mutation(async ({ ctx }) => {
    console.log(ctx.session?.user?.email);
    return await sendEmail();
  }),
});
