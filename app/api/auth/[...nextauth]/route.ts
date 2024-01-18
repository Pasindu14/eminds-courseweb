
import { validateUser } from "@/server/actions/auth.action";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOption: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    value: "",
                },
                password: { label: "Password", type: "password", value: "" },
            },
            async authorize(credentials) {
                if (credentials) {
                    const authResult = await validateUser(credentials.username, credentials.password);
                    if (authResult) {
                        const user = { id: authResult.students.auto_id, name: authResult.students.name, email: authResult.students.email, role: 'STUDENT', phoneNumber: authResult.students.phonenumber, batchId: authResult.batch_auto_id, batchName: authResult.batches.batch_name };
                        return user;
                    }
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            if (url.startsWith(baseUrl)) {
                return url;
            } else if (url.startsWith("/")) {
                return new URL(url, baseUrl).toString();
            }
            return baseUrl;
        },
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
                token.phoneNumber = user.phoneNumber;
                token.batchId = user.batchId;
                token.batchName = user.batchName;
            }
            return token;
        },

        async session({ session, token }: any) {
            session.id = token.id;
            session.name = token.name;
            session.email = token.email;
            session.role = token.role;
            session.phoneNumber = token.phoneNumber;
            session.batchId = token.batchId;
            session.batchName = token.batchName;
            return session;
        }
    }, pages: {
        signIn: '/signin',

    }
}

const authHandler = NextAuth(authOption);

export { authHandler as GET, authHandler as POST };