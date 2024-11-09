import transporter from "@/utils/mail.util";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    try {
        const info = await transporter.sendMail({
            from: '"Course Web Admin" <admin@courseweb.eminds.com.au>',
            to: "pasindu14@gmail.com",
            subject: "Test Email from Course Web Admin",
            text: "This is a plain text test message.",
            html: "<h1>This is a test email</h1><p>Sent from the Course Web Admin.</p>",
        });
        console.log(info);
        return NextResponse.json({ message: "Email sent" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error sending email" }, { status: 500 });
    }
}

export async function GET(request: Request) {
    return NextResponse.json({ message: "Email sent" });
}