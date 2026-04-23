import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp.titan.email",
    port: 465,
    secure: true, // use TLS
    auth: {
        user: "edu@eminds.com.au",
        pass: "eminds@123",
    },
});

// Verify SMTP connection configuration
transporter.verify(function (error, success) {
    if (error) {
        console.log("SMTP connection error:", error);
    } else {
        console.log("SMTP server is ready to take our messages");
    }
});

export default transporter;

export async function sendPaymentConfirmationEmail(
  customerName: string,
  customerEmail: string,
  courseName: string,
): Promise<void> {
  const firstName = customerName.split(" ")[0] || customerName;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #E5E7EB;">
      <div style="height:5px;background:linear-gradient(90deg,#2563EB,#6366F1);"></div>
      <div style="padding:40px 36px;">
        <p style="font-size:22px;font-weight:700;color:#111827;margin:0 0 24px;">Hi ${firstName},</p>
        <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 16px;">
          Thank you for completing your payment for the <strong style="color:#2563EB;">${courseName}</strong> course.
        </p>
        <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 16px;">
          We really appreciate it and are excited to have you on board. Our team will be in touch with you shortly with the next steps and all the details you need to get started.
        </p>
        <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 32px;">
          If you have any questions in the meantime, feel free to reach out.
        </p>
        <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 4px;">Looking forward to working with you!</p>
        <p style="font-size:15px;color:#374151;margin:0 0 4px;">Best regards,</p>
        <p style="font-size:15px;font-weight:700;color:#2563EB;margin:0;">eMinds Academy Team</p>
      </div>
      <div style="background:#F9FAFB;padding:16px 36px;border-top:1px solid #E5E7EB;">
        <p style="font-size:12px;color:#9CA3AF;margin:0;text-align:center;">
          This is an automated confirmation email from eMinds Academy · edu@eminds.com.au
        </p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: '"eMinds Academy" <edu@eminds.com.au>',
    to: customerEmail,
    subject: "Payment Confirmed – Welcome to eMinds Academy",
    html,
    headers: {
      "X-Priority": "1",
      "X-MSMail-Priority": "High",
      "Importance": "high",
      "Message-ID": `<${Date.now()}@eminds.com.au>`,
      "Date": new Date().toUTCString(),
    },
    priority: "high",
    envelope: {
      from: "edu@eminds.com.au",
      to: customerEmail,
    },
  });
}