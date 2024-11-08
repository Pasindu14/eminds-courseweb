import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp.hostinger.com",
    port: 465,
    secure: true, // use TLS
    auth: {
        user: "admin@courseweb.eminds.com.au",
        pass: "3o8NdUew^C",
    },
});

export default transporter;