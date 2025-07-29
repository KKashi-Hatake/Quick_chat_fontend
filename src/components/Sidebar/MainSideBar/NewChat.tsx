import React, { Dispatch, SetStateAction } from 'react'



interface Props {
    setOpen: Dispatch<SetStateAction<boolean>>;
    title?: string
}


const NewChat = ({ setOpen, title }: Props) => {
    return (
        <div className=" h-16 flex items-center mx-3">
            <span className='h-9 w-9 grid place-content-center rounded-full hover:bg-gray-100 cursor-pointer' onClick={() => setOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
            </span>
            <p className='ml-6'>{title || "New chat"}</p>
        </div>
    )
}

export default NewChat