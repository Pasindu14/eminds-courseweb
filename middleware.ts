import { withAuth } from "next-auth/middleware"

export default withAuth(
    {
        callbacks: {
            authorized: ({ token }) => {
                if (token?.role === "ADMIN") {
                    return true;
                }
                return false;
            },
        },
    }
)

export const config = { matcher: ["/badges", "/batches", "/courses", "/events", "/exam-results", "/exams", "/expire-badges", "/final-exams-submissions-results", "/jobs", "/payment-report", "/payments", "/questions", "/sessions", "/student-mapping", "/students"] }