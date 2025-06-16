'use client'


import { useStore } from '@/zustand/store'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { StoreType } from '../../../../../types'
import { toast } from 'sonner'
import axios from 'axios'
import { useRouter } from 'next/navigation'




const Verify = () => {
  const router = useRouter();
  const user = useStore((state: StoreType) => state.user);
  const [seconds, setSeconds] = useState(60);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    if (isRunning && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [isRunning, seconds]);

  const handleResend = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("OTP resent");
    setSeconds(60);
    setIsRunning(true);
  };

  const verifyOTP = async (e: any) => {
    try {
      const { data }: { data: { success: boolean, message: string } } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/verify-otp/${user?.id || ""}?otp=${e}`);
      if (data.success) {
        toast(data?.message)
        router.replace('/login')
      } else {
        toast(data?.message)
      }
    } catch (error: any) {
      console.log(error)
      toast(error?.response?.data?.message || "Something went wrong while Signing up.")
    }
  }


  return (
    <div className='h-screen w-screen grid place-content-center'>
      <Card className="w-[450px] ">
        <CardHeader>
          <CardTitle>Verify Mobile Number</CardTitle>
          <CardDescription>A 6 digit OTP has been sent on your mobile number.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div>
              <InputOTP maxLength={6} onComplete={e => verifyOTP(e)}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <hr className='w-5 border-2 border-[#0d1a41] rounded-xl' />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Back</Button>

          {isRunning ? <p className='text-[#0d1a41] text-sm '>{`Resend OTP in ${seconds} sec`}</p> : <Button className="text-xs py-1" onClick={(e) => handleResend(e)} disabled={isRunning}>
            Resend OTP
          </Button>}

        </CardFooter>
      </Card>
    </div>
  )
}

export default Verify

