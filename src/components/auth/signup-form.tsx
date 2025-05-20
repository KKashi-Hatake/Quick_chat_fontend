'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"




const FormSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    mobile: z
        .string()
        .regex(/^\d{10}$/, { message: "Mobile number must be exactly 10 digits" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/[A-Z]/, { message: "Must include at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Must include at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Must include at least one number" })
        .regex(/[^A-Za-z0-9]/, {
            message: "Must include at least one special character",
        }),
    avatar: z
        .custom<FileList>((v) => v instanceof FileList && v.length > 0, {
            message: "Avatar is required",
        }),
})


type FormData = z.infer<typeof FormSchema>;

export function SignupForm({
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Register account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your details below to register
                </p>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name")} placeholder="eg. Jhone Doe" />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="mobile">Mobile</Label>
                <Input id="mobile" type="text" {...register("mobile")} placeholder="Enter 10-digit mobile number" />
                {errors.mobile && <p className="text-sm text-red-500">{errors.mobile.message}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" {...register("password")} placeholder="*************"/>
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="avatar">Avatar</Label>
                <Input id="avatar" type="file" accept="image/*" {...register("avatar")} />
                {errors.avatar && <p className="text-sm text-red-500">{errors.avatar.message}</p>}
            </div>

            <Button type="submit" className="w-full">
                Login
            </Button>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Or continue with
                </span>
            </div>
            <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/login" className="underline underline-offset-4">
                    Sign in
                </a>
            </div>
        </form>
    )
}
