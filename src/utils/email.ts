import nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/smtp-transport/index.js';

import { ServerError } from '@/errors/errors.js';

export async function sendEmail(options: MailOptions) {
  try {
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // 2) Define the email options
    const mailOptions = {
      from: 'Marilyn Hurley <from@example.com>',
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    // 3) Actually send the email
    await transporter.sendMail(mailOptions);
  } catch (e) {
    throw new ServerError(
      'There was an error sending the email. Try again later!',
    );
  }
}

export async function sendPasswordResetEmail(
  resetPasswordToken: string,
  email: string,
) {
  const resetURL = `${process.env.API_URL}/users/resetPassword/${resetPasswordToken}`;

  await sendEmail({
    to: email,
    subject: 'Reset your password (valid for 1 hour)',
    html: `<div>
          <p>Forgot your password? Please click the following link to reset your password.</p>
          <p>If you didn't forget your password, please ignore this email!</p>
          <p><a href="${resetURL}">${resetURL}</a></p>
      </div>`,
  });
}
