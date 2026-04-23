import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {

        const path = new URL(req.url).pathname;
        const userRole = req.nextauth.token?.role;

        const adminPaths = [
            , "/badges", "/batches", "/courses", "/events", "/exam-results", "/exams", "/expire-badges", "/final-exams-submissions-results", "/jobs", "/payment-report", "/payments", "/questions", "/sessions", "/student-mapping", "/students", "/admin-dashboard", "/stripe-payments"
        ];
        const studentPaths = [
            "/dashboard", "/student-events", "/student-exams", "/student-payments", "/student-jobs", "/student-usage", "/zoom", "/password-reset",
        ];

        if (userRole === "ADMIN" && adminPaths.includes(path)) {
            return NextResponse.next();
        } else if (userRole === "STUDENT" && studentPaths.includes(path)) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);


export const config = { matcher: ["/badges", "/batches", "/courses", "/events", "/exam-results", "/exams", "/expire-badges", "/final-exams-submissions-results", "/jobs", "/payment-report", "/payments", "/questions", "/sessions", "/student-mapping", "/students", "/admin-dashboard", "/stripe-payments", "/dashboard", "/student-events", "/student-exams", "/student-payments", "/student-jobs", "/student-usage", "/zoom", "/password-reset"] };