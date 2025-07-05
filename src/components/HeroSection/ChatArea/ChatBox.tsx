import { Input } from '@/components/ui/input'
import { sendMessage } from '@/utils/apis/chats'
import { useStore } from '@/zustand/store'
import React, { useState } from 'react'

const ChatBox = () => {
    const convParti = useStore(store => store.convParti)
    const [msg, setMsg] = useState<string>("")
    const sendMsg = async () => {
        try {
            const payload = {
                userId: convParti!.userId,
                msg,
                convType: "normal",
                partiId: convParti!.id,
                mediaUrl: "",
                type: "text"
            }
            const response = await sendMessage(payload)
            setMsg("");

        } catch (error) {

        }
    }


    return (
        <div className='w-full absolute bottom-20'>
            <div className='pl-3 grid grid-cols-12 '>
                <div className='col-span-1 bg-white rounded-l-full flex justify-between px-[6px] items-center '>
                    <span className='h-10 w-10 hover:bg-gray-50 rounded-full flex items-center justify-center cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" />
                            <title>Attach</title>
                        </svg>
                    </span>
                    <span className='h-10 w-10 hover:bg-gray-50 rounded-full flex items-center justify-center cursor-pointer'>
                        < svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" fill="none" >
                            <title>expressions</title>
                            <path d="M8.49893 10.2521C9.32736 10.2521 9.99893 9.5805 9.99893 8.75208C9.99893 7.92365 9.32736 7.25208 8.49893 7.25208C7.6705 7.25208 6.99893 7.92365 6.99893 8.75208C6.99893 9.5805 7.6705 10.2521 8.49893 10.2521Z" fill="currentColor"></path>
                            <path d="M17.0011 8.75208C17.0011 9.5805 16.3295 10.2521 15.5011 10.2521C14.6726 10.2521 14.0011 9.5805 14.0011 8.75208C14.0011 7.92365 14.6726 7.25208 15.5011 7.25208C16.3295 7.25208 17.0011 7.92365 17.0011 8.75208Z" fill="currentColor"></path>
                            <path fillRule="evenodd" clipRule="evenodd" d="M16.8221 19.9799C15.5379 21.2537 13.8087 21.9781 12 22H9.27273C5.25611 22 2 18.7439 2 14.7273V9.27273C2 5.25611 5.25611 2 9.27273 2H14.7273C18.7439 2 22 5.25611 22 9.27273V11.8141C22 13.7532 21.2256 15.612 19.8489 16.9776L16.8221 19.9799ZM14.7273 4H9.27273C6.36068 4 4 6.36068 4 9.27273V14.7273C4 17.6393 6.36068 20 9.27273 20H11.3331C11.722 19.8971 12.0081 19.5417 12.0058 19.1204L11.9935 16.8564C11.9933 16.8201 11.9935 16.784 11.9941 16.7479C11.0454 16.7473 10.159 16.514 9.33502 16.0479C8.51002 15.5812 7.84752 14.9479 7.34752 14.1479C7.24752 13.9479 7.25585 13.7479 7.37252 13.5479C7.48919 13.3479 7.66419 13.2479 7.89752 13.2479L13.5939 13.2479C14.4494 12.481 15.5811 12.016 16.8216 12.0208L19.0806 12.0296C19.5817 12.0315 19.9889 11.6259 19.9889 11.1248V9.07648H19.9964C19.8932 6.25535 17.5736 4 14.7273 4ZM14.0057 19.1095C14.0066 19.2605 13.9959 19.4089 13.9744 19.5537C14.5044 19.3124 14.9926 18.9776 15.4136 18.5599L18.4405 15.5576C18.8989 15.1029 19.2653 14.5726 19.5274 13.996C19.3793 14.0187 19.2275 14.0301 19.0729 14.0295L16.8138 14.0208C15.252 14.0147 13.985 15.2837 13.9935 16.8455L14.0057 19.1095Z" fill="currentColor"></path>
                        </svg >
                    </span>
                </div>
                <div className='col-span-11 grid grid-cols-12 mr-2'>
                    <input className=' col-span-11 h-12 focus-visible:ring-0 border-0 outline-0 active:border-0 active:outline-0 ' placeholder='Type a message' value={msg} onChange={(e) => setMsg(e.target.value)} />
                    <div className='col-span-1 rounded-r-full  flex justify-end items-center bg-white  '>
                        {!msg ? <span className='h-10 w-10 rounded-full hover:bg-blue-500 hover:text-white cursor-pointer flex justify-center items-center mr-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mic-icon lucide-mic"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>
                        </span> :
                            <span className='h-10 w-10 rounded-full bg-blue-500 hover:opacity-80 text-white cursor-pointer flex justify-center items-center mr-2'
                                onClick={() => sendMsg()}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send-horizontal-icon lucide-send-horizontal"><path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" /><path d="M6 12h16" /></svg>
                            </span>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatBox
