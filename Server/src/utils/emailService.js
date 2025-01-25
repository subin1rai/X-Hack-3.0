import nodemailer from "nodemailer";
import { StatusUpdateEmail } from "../email/statusUpdate.js";
import config from "../config/config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.emailUser,
    pass: config.emailPass,
  },
});

export const sendStatusUpdateEmail = async (user, status, userType) => {
  const emailHtml = StatusUpdateEmail({ user, status, userType });

  const mailOptions = {
    from: config.emailUser,
    to: user.email,
    subject: `${userType.charAt(0).toUpperCase() + userType.slice(1)} Account ${status.charAt(0).toUpperCase() + status.slice(1)}`,
    html: emailHtml,
  };

  await transporter.sendMail(mailOptions);
};

