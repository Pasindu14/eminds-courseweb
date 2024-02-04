import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    /*    const token: any = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
       console.log(token.role);
       console.log(request.nextUrl.pathname); */
}