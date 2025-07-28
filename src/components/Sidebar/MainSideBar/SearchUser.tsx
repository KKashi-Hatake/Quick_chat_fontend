import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createConversationPaticipant, searchUser } from '@/utils/apis/searchUser'
import { toast } from 'sonner'
import { ConversationParticipantType, StoreType, User } from '../../../../types'
import Image from 'next/image'
import { useStore } from '@/zustand/store'




const FormSchema = z.object({
    mobile: z
        .string()
        .min(10, "Mobile number must be 10 digits")
        .max(10, "Mobile number must be 10 digits")
        .regex(/^\d+$/, "Mobile number must contain only digits"),
    first_name: z
        .string()
        .max(50, "First name must be less than 50 characters"),

    last_name: z
        .string()
        .max(50, "Last name must be less than 50 characters")
})


type FormData = z.infer<typeof FormSchema>;

const SearchUser = ({ setOpen, setContact }: { setOpen: Dispatch<SetStateAction<boolean>>, setContact: Dispatch<SetStateAction<boolean>> }) => {
    const setParticipant = useStore((state: StoreType) => state.setConvParti);
    const [user, setUser] = useState<{ user: string, convParti: ConversationParticipantType | null } | null>(null);
    const {
        register,
        handleSubmit,
        trigger,
        watch,
        getValues,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(FormSchema),
    })
    const mobileValue = watch("mobile");
    const firstName = watch("first_name");
    const lastName = watch("last_name");




    useEffect(() => {
        const getUser = async () => {
            const res = await searchUser(mobileValue);
            if (res == null) {
                setUser(null)
            } else {
                setUser(res)
            }
        }
        trigger('mobile');
        if (mobileValue?.length > 9) {
            setUser(null)
        } else {
            setUser(null)
        };
        if (mobileValue?.length === 10) {
            getUser();
        }
    }, [mobileValue, trigger])



    const onSubmit = async () => {
        if (!user) {
            return toast("Searched user not found");
        }
        const payload = {
            id: user.user,
            firstName,
            lastName,
        }
        try {
            const convParti = await createConversationPaticipant(payload);
            setParticipant(convParti)
            setOpen(false);
            setContact(false);
        } catch (error) {
            console.log("Error while create conversation participant", error);
            toast.error("Something went wrong, Please try again later!");
        }
    }


    return (
        <div className='flex-1 overflow-y-scroll scrollbar-hide'>
            <form onSubmit={handleSubmit(onSubmit)} className='h-full  min-h-[500px] pt-10 mx-4 relative '>
                <div className="flex flex-col px-2">
                    {/* First Name */}
                    <div className='flex'>
                        <Label htmlFor="first_name" className='w-10 h-10 px-2 grid place-content-center mr-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-icon lucide-user-round "><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
                        </Label>
                        <div className='w-full relative'>
                            <input id="first_name" type="text" placeholder=" " className='peer w-full h-full border-b-2 outline-none ring-none focus:ring-0 focus:border-b-2 focus:border-blue-500 focus:outline-none border-gray-400 '
                                {...register("first_name")} />
                            <label
                                htmlFor="firstName"
                                className={`absolute left-0 bottom-10 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:bottom-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 ${firstName && "peer-focus:bottom-10 peer-focus:text-xs"}`}
                            >
                                First Name
                            </label>
                            {errors.first_name && (
                                <p className="text-sm text-red-500 mt-1">{errors.first_name.message}</p>
                            )}
                        </div>
                    </div>
                    {/* Last Name */}
                    <div className='flex mt-14'>
                        <Label htmlFor="last_name" className='w-10 h-10 px-2 grid place-content-center mr-1'>
                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone-icon lucide-phone"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" /></svg> */}
                        </Label>
                        <div className='w-full relative'>
                            <input id="last_name" type="text" placeholder=" " className='peer w-full h-full border-b-2 outline-none ring-none focus:ring-0 focus:border-b-2 focus:border-blue-500 focus:outline-none border-gray-400'
                                {...register("last_name")} />
                            <label
                                htmlFor="lastName"
                                className={`absolute left-0 bottom-10 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:bottom-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 ${lastName && "peer-focus:bottom-10 peer-focus:text-xs"}`}
                            >
                                Last Name
                            </label>
                            {errors.last_name && (
                                <p className="text-sm text-red-500 mt-1">{errors.last_name.message}</p>
                            )}
                        </div>
                    </div>
                    <div className='flex mt-14'>
                        <Label htmlFor="mobile" className='h-10 px-2 grid place-content-center mr-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone-icon lucide-phone"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" /></svg>
                        </Label>
                        <div className='flex w-full border-b-2 border-gray-400 focus-within:border-blue-500'>
                            <input id="mobile" type="text" maxLength={10} placeholder="Enter 10-digit mobile number" className='peer w-full h-full border-none outline-none ring-none focus:ring-0'
                                {...register("mobile")} />
                            {
                                user &&
                                <span className='w-fit h-full py-auto mr-2'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-icon lucide-check text-blue-600 peer-focus:border-blue-500"><path d="M20 6 9 17l-5-5" /></svg></span>

                            }
                        </div>
                    </div>
                </div>
                {
                    user?.convParti?.id ?
                        <p className='ml-14 mt-5 text-sm text-gray-400'>You already have this person in your contact list.</p> :
                        user as User | null !== null ?
                            <p className='ml-14 mt-5 text-sm text-gray-400'>This phone number is on Quick chat</p> :
                            (errors.mobile && mobileValue) && (
                                <p className="ml-14 mt-5 text-sm text-gray-400">{errors.mobile.message}</p>
                            )
                }
                {user && !user?.convParti?.id && (firstName || lastName) && <Button variant="ghost" type='submit' className='h-12 w-12 rounded-full absolute bottom-5 left-1/2 transform -translate-x-1/2 text-white bg-blue-600 hover:bg-blue-600 hover:text-white '>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 lucide lucide-check-icon lucide-check  "><path d="M20 6 9 17l-5-5" /></svg>
                </Button>}
            </form>
        </div>
    )
}

export default SearchUser