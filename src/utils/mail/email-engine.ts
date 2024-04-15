import { createTransport } from "nodemailer";
import { env } from "~/env.mjs";

const transporter = createTransport({
  host: env.EMAIL_HOST,
  port: Number(env.EMAIL_PORT),
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

export const sendEmail = async (): Promise<void> => {
  try {
    // Verify your transporter
    await transporter.verify();

    const mailOptions = {
      from: '"ZTEK.SE" <noreply@ztek.se>',
      to: "dev5@ztek.se, dev@ztek.se",
      subject: "Automagiskt mail",
      text: "Ztek.se skickar nu mail ;O :D",
      html: "<b>Ztek.se skickar nu mail ;O :D</b>",
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(`Message sent: ${info.messageId}`);
  } catch (error) {
    console.log(error);
  }
};
