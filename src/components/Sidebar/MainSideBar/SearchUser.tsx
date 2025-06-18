import React, { useEffect, useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { searchUser } from '@/utils/apis/searchUser'
import { toast } from 'sonner'
import { User } from '../../../../types'
import Image from 'next/image'




const FormSchema = z.object({
    mobile: z
        .string()
        .min(10, "Mobile number must be 10 digits")
        .max(10, "Mobile number must be 10 digits")
        .regex(/^\d+$/, "Mobile number must contain only digits"),
    first_name: z
        .string()
        .min(2, "First name must be at least 2 characters")
        .max(50, "First name must be less than 50 characters"),

    last_name: z
        .string()
        .min(2, "Last name must be at least 2 characters")
        .max(50, "Last name must be less than 50 characters")
})


type FormData = z.infer<typeof FormSchema>;

const SearchUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const {
        register,
        handleSubmit,
        trigger,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(FormSchema),
    })
    const mobileValue = watch("mobile");




    useEffect(() => {
        if (mobileValue?.length >= 10) {
            trigger('mobile')
        }
        console.log(errors.mobile)
    }, [mobileValue, trigger])



    const onSubmit = async (data: FormData) => {
        const res = await searchUser(data?.mobile);
        if (res == null) {
            toast("No user found");
        } else {
            setUser(res)
        }
    }


    return (
        <div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col px-2">
                    {/* First Name */}
                    <div className='flex'>
                        <Label htmlFor="first_name" className='h-10 px-2 grid place-content-center mr-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-icon lucide-user-round "><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
                        </Label>
                        <div className='w-full h-fit'>
                            <input id="first_name" type="text" placeholder="First Name" className='border-none outline-none ring-none focus:ring-0 focus:border-none focus:outline-none border-b border-gray-400'
                                {...register("first_name")} />
                            {errors.first_name && (
                                <p className="text-sm text-red-500 mt-1">{errors.first_name.message}</p>
                            )}
                        </div>
                    </div>
                    {/* Last Name */}
                    <div className='flex mt-3'>
                        <Label htmlFor="last_name" className='w-10 h-10 px-2 grid place-content-center mr-1'>
                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone-icon lucide-phone"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" /></svg> */}
                        </Label>
                        <div className='w-full h-fit'>
                            <Input id="last_name" type="text" placeholder="Last Name"
                                {...register("last_name")} />
                            {errors.last_name && (
                                <p className="text-sm text-red-500 mt-1">{errors.last_name.message}</p>
                            )}
                        </div>
                    </div>
                    <Label htmlFor="mobile" className='h-10 px-2 grid place-content-center mr-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone-icon lucide-phone"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" /></svg>
                    </Label>
                    <div className='w-full h-fit'>
                        <Input id="mobile" type="text" placeholder="Enter 10-digit mobile number"
                            {...register("mobile")} />
                        {errors.mobile && (
                            <p className="text-sm text-red-500 mt-1">{errors.mobile.message}</p>
                        )}
                    </div>
                    {/* <Button variant="ghost" type='submit' className='hover:bg-white ml-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>
                    </Button> */}
                </div>
            </form>
            {
                user as User | null !== null && (
                    <div className=' h-[68px] mt-2 border-[1px] rounded-lg mx-2'>
                        <div className='grid grid-cols-10 w-full h-[68px] rounded-xl'>
                            <div className='col-span-2 flex justify-center items-center'>
                                {user?.image != null ? <Image src={user?.image} width={45} height={45} className='rounded-full' alt='Profile Pic' />
                                    :
                                    <span className='rounded-full bg-gray-100 p-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-icon lucide-user-round "><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
                                    </span>
                                }
                            </div>
                            <div className='col-span-6 '>
                                <p className='mt-2 text-lg'>{user?.name || "NA"}</p>
                                <div className='flex'>
                                    <p className='text-xs'>{user?.about || "Hey there I am using Quick chat!"}</p>
                                </div>
                            </div>
                            <Button className='col-span-2 w-fit my-auto'>Chat</Button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default SearchUser