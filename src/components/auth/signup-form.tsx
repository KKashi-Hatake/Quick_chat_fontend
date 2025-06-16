'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { MouseEvent, useEffect, useState } from "react"
import { toast } from "sonner"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { StoreType, User } from "../../../types"
import { useStore } from "@/zustand/store"




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
    image: z.string().optional(),
})


type SignUpData = z.infer<typeof FormSchema>;






export function SignupForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const router = useRouter();
    const setUser = useStore((state: StoreType) => state.setUser);
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [avatar, setAvatar] = useState<{ url: string } | null>(null);
    const [status, setStatus] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpData>({
        resolver: zodResolver(FormSchema),
    })

    const uploadFile = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file as File);
        setStatus('loading');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/upload`, {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                toast(`${data?.key} ${data?.message}`)
                setStatus(`Uploaded`);
                setAvatar({ url: data?.url });
            } else {
                toast("Something went wrong while uploading the file.")
                setStatus(`Error`);
            }
        } catch (err) {
            console.error(err);
            setStatus('Upload failed');
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;

        if (selectedFile) {
            // ✅ Restrict to image files
            if (!selectedFile.type.startsWith('image/')) {
                setStatus('Only image files (JPEG, PNG, etc.) are allowed');
                setFile(null);
                setPreviewUrl(null);
                return;
            }
            setFile(selectedFile);
            setStatus('');
            setPreviewUrl(URL.createObjectURL(selectedFile)); // ✅ Set preview URL
        }
    };

    const handleDelete = async () => {
        if (avatar == null) {
            setFile(null);
            setPreviewUrl(null);
            setAvatar(null)
        } else {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/profile_pic?key=${avatar?.url}`, {
                    method: 'DELETE',
                });

                const data = await res.json();
                if (res.ok) {
                    toast(`${data?.message}`)
                    setStatus(`Uploaded`);
                    setFile(null);
                    setPreviewUrl(null);
                    setAvatar(null)
                } else {
                    toast("Something went wrong while uploading the file.")
                    setStatus(`Error`);
                }
            } catch (err) {
                console.error(err);
                setStatus('Upload failed');
            }
        }
    }

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const onSubmit = async (payload: SignUpData) => {
        payload.image = avatar?.url;
        try {
            const { data }: { data: { user: User, success: boolean, message: string } } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/signup`, payload);
            if (data.success) {
                toast(data?.message)
                setStatus(`Uploaded`);
                setFile(null);
                setPreviewUrl(null);
                setAvatar(null)
                setUser(data.user);
                // router.push('/signup/verify-otp')
                router.push('/login')
            } else {
                toast(data?.message)
                setStatus(`Error`);
            }
        } catch (error: any) {
            console.log(error)
            toast(error?.response?.data?.message || "Something went wrong while Signing up.")
        }
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
                <Input id="password" type="password" {...register("password")} placeholder="*************" />
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="avatar">Avatar</Label>
                <div className="flex gap-x-2">
                    {previewUrl ? (
                        <div className="mt-2 w-full flex flex-col ">
                            <div className="w-fit mx-auto relative ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    className={`lucide lucide-circle-x-icon lucide-circle-x absolute top-0 right-0 font-normal text-red-600 cursor-pointer`}
                                    onClick={() => handleDelete()}
                                >
                                    <title>delete</title>
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="m15 9-6 6" />
                                    <path d="m9 9 6 6" />
                                </svg>
                                <img src={previewUrl} alt="Preview" width={200} className="shadow-sm mx-auto h-32 w-32" />
                            </div>
                            <Button disabled={!file || status === 'loading' || status === "Error" || avatar !== null} variant="outline" className="w-fit text-sm hover:bg-[#0e1a33] hover:text-white mx-auto mt-2" onClick={(e) => { uploadFile(e) }}>
                                Upload
                            </Button>
                        </div>
                    ) :
                        <Input id="avatar" type="file" accept="image/*" className="cursor-pointer" onChange={handleFileChange} />

                    }

                </div>
                {/* {errors.avatar && <p className="text-sm text-red-500">{errors.avatar.message}</p>} */}
            </div>

            <Button type="submit" className="w-full">
                Signup
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
