import { LoginForm } from "@/components/auth/login-form"
import { authOptions, CustomSession } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"


export default async function LoginPage() {
  const session: CustomSession | null = await getServerSession(authOptions)


  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm session={session} />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/assets/chat.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
