'use client'


import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';



const LoginModal = () => {
    const router = useRouter();

    const handleLogin = () => {
        signIn('google', {
            callbackUrl: '/dashboard',
            redirect: true
        })
    }


    return (
        // <Dialog>
        //     <DialogTrigger asChild>
                <Button onClick={() => router.replace('/login')}>Getting Start</Button>
        //     </DialogTrigger>
        //     <DialogContent>
        //         <DialogHeader>
        //             <DialogTitle className='text-2xl'>Welcome to Quick Chat</DialogTitle>
        //             <DialogDescription>
        //                 Quick Chat makes it effortless to create secure chat links and start conversations in seconds.
        //             </DialogDescription>
        //         </DialogHeader>
        //         <Button variant={'outline'} onClick={handleLogin}>
        //             <Image
        //                 src='/assets/google.png'
        //                 className='mr-4'
        //                 width={25}
        //                 height={25}
        //                 alt='google_logo'
        //             />
        //             Continue with Google
        //         </Button>
        //     </DialogContent>
        // </Dialog>

    )
}

export default LoginModal