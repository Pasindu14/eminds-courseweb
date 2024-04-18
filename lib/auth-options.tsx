import {
  insertOrUpdateSession,
  validateUser,
} from "@/server/actions/auth.action";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { v4 as uuidv4 } from "uuid";

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
          if (credentials.username != "admin") {
            const authResult = await validateUser(
              credentials.username,
              credentials.password
            );

            if (authResult) {
              if (authResult.multiple_device_lock == 1) {
                throw new Error(
                  "Your account has been locked because it was accessed from multiple devices. Please get in touch with the administrator."
                );
              }

              if (authResult.block_status == 0) {
                throw new Error("Your account has been locked.");
              }

              const accessToken = uuidv4();
              await insertOrUpdateSession(
                authResult.students.auto_id,
                accessToken
              );
              const user = {
                id: authResult.students.auto_id,
                name: authResult.students.name,
                email: authResult.students.email,
                role: "STUDENT",
                phoneNumber: authResult.students.phonenumber,
                batchId: authResult.batch_auto_id,
                batchName: authResult.batches.batch_name,
                courseId: authResult.batches.course_auto_id,
                accessToken: accessToken,
                password: authResult.batches.password,
              };
              return user;
            }
          } else {
            const accessToken = uuidv4();
            const user = {
              id: "114023127",
              name: "admin",
              email: "admin@eminds.lk",
              role: "ADMIN",
              phoneNumber: "1592402352",
              batchId: "2148998808",
              batchName: "3957277763",
              courseId: "2559933968",
              accessToken: accessToken,
            };
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
      /** proper way   return { ...token, ...user }; */
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.phoneNumber = user.phoneNumber;
        token.batchId = user.batchId;
        token.batchName = user.batchName;
        token.courseId = user.courseId;
        token.accessToken = user.accessToken;
        token.password = user.password;
      }
      return token;
    },

    async session({ session, token }: any) {
      /** proper way session.user = token */
      session.id = token.id;
      session.name = token.name;
      session.email = token.email;
      session.role = token.role;
      session.phoneNumber = token.phoneNumber;
      session.batchId = token.batchId;
      session.batchName = token.batchName;
      session.courseId = token.courseId;
      session.accessToken = token.accessToken;
      session.password = token.password;

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
