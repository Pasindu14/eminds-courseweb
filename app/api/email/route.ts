import { fetchStudentAttendanceForSendingEmails } from "@/server/actions/attendance.actions";
import transporter from "@/utils/mail.util";
import { NextResponse } from "next/server";

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function sendEmailBatch(batch: any) {
    const results = [];

    for (const student of batch) {
        const {
            student_email: studentEmail,
            batch_name: batchName,
            course_name: courseName,
            total_schedules: totalSessions,
            attended_sessions: attendedSessions,
            attendance_percentage: attendancePercentage
        } = student;

        const htmlContent = `
            <p>Dear Student,</p>
            <p><strong>Greetings from the eMinds Academic Team!</strong> </p>
            <p>Please find the attendance details below for your course:</p>
            <ul>
                <li><strong>Course Name:</strong> ${courseName}</li>
                <li><strong>Batch:</strong> ${batchName}</li>
                <li><strong>Month:</strong> ${new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</li>
                <li><strong>Total Sessions:</strong> ${totalSessions}</li>
                <li><strong>Attended Sessions:</strong> ${attendedSessions}</li>
                <li><strong>Attendance Percentage:</strong> ${attendancePercentage}%</li>
            </ul>
            <p>Please be reminded that if you have missed any classes, you can access recorded videos of the lectures through the student portal.</p>
            <p>This document is for your self-evaluation. We recommend maintaining at least a 60% attendance rate.</p>
            <p>Best regards,<br>Piyumi Anushka,<br>Lead Admin</p>
        `;

        try {
            const info = await transporter.sendMail({
                from: '"Course Web Admin" <edu@eminds.com.au>',
                to: studentEmail,
                subject: `Attendance Report for ${courseName}`,
                html: htmlContent,
                headers: {
                    'X-Priority': '1',
                    'X-MSMail-Priority': 'High',
                    'Importance': 'high',
                    'Message-ID': `<${Date.now()}@edu@eminds.com.au>`,
                    'Date': new Date().toUTCString()
                },
                priority: 'high',
                envelope: {
                    from: "edu@eminds.com.au",
                    to: studentEmail
                }
            });

            results.push({ studentEmail, success: true, messageId: info.messageId });
        } catch (error: any) {
            results.push({ studentEmail, success: false, error: error.message });
        }
    }

    return results;
}

export async function POST(request: Request) {
    try {
        const attendanceData = await fetchStudentAttendanceForSendingEmails();

        if (!attendanceData.length) {
            return NextResponse.json({
                success: false,
                message: "No attendance data available for the previous month"
            });
        }

        const batchSize = 10; // Set the batch size
        const emailResults = [];

        for (let i = 0; i < attendanceData.length; i += batchSize) {
            const batch = attendanceData.slice(i, i + batchSize);
            const batchResults = await sendEmailBatch(batch);
            emailResults.push(...batchResults);
            await delay(5000); // Optional delay between batches to avoid rate limiting
        }

        return NextResponse.json({
            success: true,
            results: emailResults,
            message: "Emails sent successfully"
        });
    } catch (error) {
        console.error('Detailed error:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred',
            message: "Failed to send emails"
        }, {
            status: 500
        });
    }
}
