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