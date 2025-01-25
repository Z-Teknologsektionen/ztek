import { createTransport } from "nodemailer";
import type { z } from "zod";
import { env } from "~/env.mjs";
import type { sendEmailSchema } from "~/schemas/email";

const transporter = createTransport({
  host: env.EMAIL_HOST,
  port: Number(env.EMAIL_PORT),
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

export type SendEmailProps = z.infer<typeof sendEmailSchema>;

export const sendEmail = async ({
  message,
  recipients,
  subject,
  cc,
  sender,
}: SendEmailProps): Promise<void> => {
  try {
    // Verify your transporter
    await transporter.verify();

    const mailOptions = {
      from: sender || '"ZTEK.SE" <noreply@ztek.se>',
      to: recipients.join(", "),
      subject,
      text: message,
      cc,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(`Message sent: ${info.messageId}`);
  } catch (error) {
    console.log(error);
  }
};
