import { fetchStudentAttendanceForSendingEmails } from "@/server/actions/attendance.actions";
import transporter from "@/utils/mail.util";
import { NextResponse } from "next/server";

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function POST(request: Request) {
    try {
        // Fetch attendance data for sending emails
        const attendanceData = await fetchStudentAttendanceForSendingEmails();

        if (!attendanceData.length) {
            return NextResponse.json({
                success: false,
                message: "No attendance data available for the previous month"
            });
        }

        const emailResults = <any[]>[];

        for (const student of attendanceData) {
            const {
                student_email: studentEmail,
                batch_name: batchName,
                course_name: courseName,
                total_schedules: totalSessions,
                attended_sessions: attendedSessions,
                attendance_percentage: attendancePercentage
            } = student;

            // Compose the email content
            const htmlContent = `
                <p>Dear Student,</p>
                
                <p>Greetings from the eMinds Academic Team!</p>

                <p>Please find the attendance details below for your course:</p>

                <ul>
                    <li><strong>Course Name:</strong> ${courseName}</li>
                    <li><strong>Batch:</strong> ${batchName}</li>
                    <li><strong>Month:</strong> ${new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</li>
                    <li><strong>Total Sessions:</strong> ${totalSessions}</li>
                    <li><strong>Attended Sessions:</strong> ${attendedSessions}</li>
                    <li><strong>Attendance Percentage:</strong> ${attendancePercentage}%</li>
                </ul>

                <p>Please be reminded that if you have missed any classes, you can access recorded videos of the lectures through the student portal. These resources are designed to help you catch up and stay aligned with the course material.</p>

                <p>This document is for your self-evaluation. While there is no compulsory attendance policy, we recommend maintaining at least a 60% attendance rate.</p>

                <p>Let's continue to strive for excellence together!</p>

                <p>Best regards,<br>
                Piyumi Anushka,<br>
                Lead Admin</p>
            `;

            // Send mail with defined transport object
            const info = await transporter.sendMail({
                from: '"Course Web Admin" <coursewebadmin@eminds.lk>',
                to: studentEmail,
                subject: `Attendance Report for ${courseName}`,
                html: htmlContent,
                headers: {
                    'X-Priority': '1',
                    'X-MSMail-Priority': 'High',
                    'Importance': 'high',
                    'Message-ID': `<${Date.now()}@coursewebadmin@eminds.lk>`,
                    'Date': new Date().toUTCString()
                },
                priority: 'high',
                envelope: {
                    from: "coursewebadmin@eminds.lk",
                    to: studentEmail
                }
            });

            emailResults.push({
                studentEmail,
                success: true,
                messageId: info.messageId
            });

            // Wait for 4 seconds before sending the next email
            await delay(4000);
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

/* export async function GET(request: Request) {
    return NextResponse.json({ message: "Email sending service is active" });
}
 */