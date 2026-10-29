const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const verificationTemplate = async ({ firstName, lastName, email, verificationUrl }) => {
  const fullName = `${firstName} ${lastName}`.trim();

  return `
      <!doctype html>
      <html lang="en">
        <body style="margin:0;padding:24px;background:#f4f6f8;font-family:Arial,sans-serif;color:#222;">
          <div style="max-width:560px;margin:0 auto;padding:32px;background:#fff;border-radius:8px;">
            <h1 style="margin-top:0;font-size:24px;">Verify your email</h1>
            <p>Hello ${fullName},</p>
            <p>Thanks for signing up. Click the button below to verify your email address.</p>
            <p style="margin:28px 0;">
              <a href="${verificationUrl}"
                 style="display:inline-block;padding:12px 20px;background:#2563eb;color:#fff;text-decoration:none;border-radius:5px;">
                Verify email
              </a>
            </p>
            <p>If the button doesn’t work, copy and paste this link into your browser:</p>
            <p style="word-break:break-all;">
              <a href="${verificationUrl}">${verificationUrl}</a>
            </p>
            <p style="color:#666;font-size:13px;">If you didn’t create an account, you can ignore this email.</p>
          </div>
        </body>
      </html>
    `;
};

const sendVerificationEmail = async ({ firstName, lastName, email, verificationUrl }) => {
  return transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: "Verification Mail",
    text: `Hello ${firstName} ${lastName}, welcome`,
    html: await verificationTemplate({ firstName, lastName, email, verificationUrl }),
  });
};

module.exports = sendVerificationEmail;