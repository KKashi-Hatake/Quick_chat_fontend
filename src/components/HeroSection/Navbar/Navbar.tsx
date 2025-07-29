import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useStore } from '@/zustand/store'
import React from 'react'
import { StoreType } from '../../../../types'



type props = {
  image?: string | null,
  firstName?: string | null,
  lastName?: string | null
}


const Navbar = ({ image, firstName, lastName }: props) => {
  const setParticipant = useStore((state: StoreType) => state.setConvParti);

  const handleClick = () => {
    setParticipant(null)
  }
  return (
    <section className='w-full h-16 flex items-center justify-between'>
      <div className="w-full flex items-center h-full p-4 cursor-pointer">
        {image ? <Avatar className='h-9 w-9'>
          <AvatarImage src={image} />
          <AvatarFallback>DP</AvatarFallback>
        </Avatar> :
          <div className='w-10 h-10  grid place-content-center bg-gray-200 rounded-full'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-icon lucide-user-round "><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
          </div>
        }
        <span className='ml-5 '>
          <p className=''>{`${firstName || ""} ${lastName || ""}`}</p>
          <p className='text-xs text-gray-500 font-light'>click here for contact info</p>
        </span>
      </div>
      <div className='w-[150px] flex justify-between items-center  mr-6'>
        <span className='w-[70px] h-10 my-auto flex justify-center hover:bg-gray-100 rounded-3xl '>
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video-icon lucide-video my-auto"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" /><rect x="2" y="6" width="14" height="12" rx="2" /></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down-icon lucide-chevron-down my-auto"><path d="m6 9 6 6 6-6" /></svg>
        </span>
        <span className='h-8 w-8 hover:bg-gray-100 rounded-full flex justify-center items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search-icon lucide-search "><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>
        </span>
        <span className='h-8 w-8 hover:bg-gray-100 rounded-full flex justify-center items-center'>


          <div className='w-20 flex justify-between'>
            <DropdownMenu >
              <DropdownMenuTrigger>
                <div className={`h-8 w-8 hover:bg-gray-200 flex justify-center items-center rounded-full `}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-56 rounded-xl'>
                <DropdownMenuItem className='h-9 px-4 text-[#484a4d] font-light mt-1'>
                  <div className='w-full h-full grid grid-cols-5 text-base font-normal items-center '>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info-icon lucide-info"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                    <p className='col-span-4 text-sm'>Contact info</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className='h-9 px-4 text-[#484a4d] font-light mt-1'>
                  <div className='w-full grid grid-cols-5 text-base font-normal items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-check-icon lucide-square-check"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="m9 12 2 2 4-4" /></svg>
                    <p className='col-span-4 text-sm'>Select messages</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className='h-9 px-4 text-[#676d76] font-thin'>
                  <div className='w-full grid grid-cols-5 text-base font-normal items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=" col-span-1 lucide lucide-bell-off-icon lucide-bell-off"><path d="M10.268 21a2 2 0 0 0 3.464 0" /><path d="M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742" /><path d="m2 2 20 20" /><path d="M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05" /></svg>
                    <p className='col-span-4 text-sm'>Mute notifications</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className='h-9 px-4 text-[#676d76] font-thin'>
                  <div className='w-full grid grid-cols-5 text-base font-normal items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock-fading-icon lucide-clock-fading"><path d="M12 2a10 10 0 0 1 7.38 16.75" /><path d="M12 6v6l4 2" /><path d="M2.5 8.875a10 10 0 0 0-.5 3" /><path d="M2.83 16a10 10 0 0 0 2.43 3.4" /><path d="M4.636 5.235a10 10 0 0 1 .891-.857" /><path d="M8.644 21.42a10 10 0 0 0 7.631-.38" /></svg>
                    <p className='col-span-4 text-sm'>Disappearing messages</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className='h-9 px-4 text-[#484a4d] font-light mt-1 ' onClick={handleClick}>
                  <div className='w-full grid grid-cols-5 text-base font-normal items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-x-icon lucide-circle-x"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
                    <p className='col-span-4 text-sm'>Close chat</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className='border-b-[1px] border-gray-200 mx-1' />
                <DropdownMenuItem className='h-9 px-4 text-[#676d76] font-thin'>
                  <div className='w-full grid grid-cols-5 text-base font-normal items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-thumbs-down-icon lucide-thumbs-down"><path d="M17 14V2" /><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" /></svg>
                    <p className='col-span-4 text-sm'>Report chat</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className='h-9 px-4 text-[#676d76] font-thin'>
                  <div className='w-full grid grid-cols-5 text-base font-normal items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ban-icon lucide-ban"><circle cx="12" cy="12" r="10" /><path d="m4.9 4.9 14.2 14.2" /></svg>
                    <p className='col-span-4 text-sm'>Block</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className='h-9 px-4 text-[#676d76] font-thin'>
                  <div className='w-full grid grid-cols-5 text-base font-normal items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-slash-icon lucide-circle-slash"><circle cx="12" cy="12" r="10" /><line x1="9" x2="15" y1="15" y2="9" /></svg>
                    <p className='col-span-4 text-sm'>Clear chat</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className='h-9 px-4 text-[#676d76] font-thin'>
                  <div className='w-full grid grid-cols-5 text-base font-normal items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2-icon lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                    <p className='col-span-4 text-sm'>Delete chat</p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </span>

      </div>


    </section>
  )
}

export default Navbar