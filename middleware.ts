import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(

    function middleware(req) {
        console.log(req.nextauth);
        if (
            req.nextauth.token?.role != "ADMIN"
        ) {
            return new NextResponse("You are not authorized!");
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


export const config = { matcher: ["/badges", "/batches", "/courses", "/events", "/exam-results", "/exams", "/expire-badges", "/final-exams-submissions-results", "/jobs", "/payment-report", "/payments", "/questions", "/sessions", "/student-mapping", "/students"] }