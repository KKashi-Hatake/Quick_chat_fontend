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


const LoginModal = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Getting Start</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-2xl'>Welcome to Quick Chat</DialogTitle>
                    <DialogDescription>
                        Quick Chat akes it effortless to create secure chat links and start conversations in seconds.
                    </DialogDescription>
                </DialogHeader>
                <Button variant={'outline'}>
                    <Image
                        src = '/assests/google.png'
                        className='mr-4'
                        width={25}
                        height={25}
                        alt='google_logo'
                    />
                    Continue with Google
                </Button>
            </DialogContent>
        </Dialog>

    )
}

export default LoginModal