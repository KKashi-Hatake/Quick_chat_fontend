import { Account, AuthOptions, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import axios from 'axios';
import { toast } from "sonner";




export interface CustomSession {
  user?: CustomUser;
  expires: ISODateString
}

export interface CustomUser {
  id?: string | null
  name?: string | null
  email?: string | null
  image?: string | null
  provider?: string | null
  token?: string | null
}




export const authOptions: AuthOptions = {
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async session({ session, user, token }: { session: CustomSession, user: CustomUser, token: JWT }) {
      session.user = token.user as CustomUser
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    }
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        mobile: { label: "Mobile", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { mobile, password } = credentials || {};
        console.log(mobile, password);
        try {
          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`, { mobile, password })
          const { user } = data;
          return user;
        } catch (error: any) {
          const message = error.response?.data?.message || "Something went wrong during login";
          throw new Error(message);
        }
      },
    }),
  ]

}