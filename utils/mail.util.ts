import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    pool: true,
    host: "mail.eminds.lk",
    port: 465,
    secure: true, // use TLS
    auth: {
        user: "coursewebadmin@eminds.lk",
        pass: "OO6#.8akki%u",
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