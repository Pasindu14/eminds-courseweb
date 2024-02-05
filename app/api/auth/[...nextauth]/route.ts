
import { authOption } from "@/lib/auth-options";
import NextAuth from "next-auth/next";

const authHandler = NextAuth(authOption);
export { authHandler as GET, authHandler as POST };