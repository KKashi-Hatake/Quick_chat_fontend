import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

const SearchBar = ({ placeholder, searchTerm, setSearchTerm, className }: { placeholder:string, searchTerm: string, setSearchTerm: React.Dispatch<React.SetStateAction<string>>, className?:string }) => {
    const [focus, setFocus] = useState(false);
    return (
        <div className={`w-[90%] h-10 border-[2px] pl-4 border-white mx-auto mt-2 flex items-center rounded-full focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 border-1 bg-gray-100  focus-within:bg-white ${focus?"hover:border-blue-500":"hover:border-gray-200"} ${className}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
            <input type='text' onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)} className='w-[88%] h-8 focus-visible:ring-0 border-0 outline-0 active:border-0 active:outline-0 ml-2 bg-gray-100 focus-within:bg-white' placeholder={placeholder} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
    )
}

export default SearchBar