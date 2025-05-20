'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"




const FormSchema = z.object({
    mobile: z
        .string()
        .regex(/^\d{10}$/, {
            message: "Mobile number must be exactly 10 digits",
        }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long",
    }),
})


type FormData = z.infer<typeof FormSchema>;

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(FormSchema),
    })

    const onSubmit = (data: FormData) => {
        console.log("Form Data:", data)
        // Handle login logic here
    }

    return (
        <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit(onSubmit)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your mobile below to login to your account
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="mobile">Mobile</Label>
                    <Input id="mobile" type="text" placeholder="Enter 10-digit mobile number"
                        {...register("mobile")} />
                    {errors.mobile && (
                        <p className="text-sm text-red-500">{errors.mobile.message}</p>
                    )}
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                            href="#"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </a>
                    </div>
                    <Input id="password" type="password" placeholder="Enter password"
                        {...register("password")} />
                    {errors.password && (
                        <p className="text-sm text-red-500">{errors.password.message}</p>
                    )}
                </div>
                <Button type="submit" className="w-full">
                    Login
                </Button>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>

            </div>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="signup" className="underline underline-offset-4">
                    Sign up
                </a>
            </div>
        </form>
    )
}
