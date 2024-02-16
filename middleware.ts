import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(

    function middleware(req) {
        if (
            req.nextauth.token?.role != "ADMIN"
        ) {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
    },
    {
        callbacks: {
            authorized: (params) => {
                let { token } = params;
                return !!token;
            },
        },
    }
);


export const config = { matcher: ["/badges", "/batches", "/courses", "/events", "/exam-results", "/exams", "/expire-badges", "/final-exams-submissions-results", "/jobs", "/payment-report", "/payments", "/questions", "/sessions", "/student-mapping", "/students", "/admin-dashboard"] };