import { CHATS_URL } from "@/lib/apiEndPoints";


export async function fetchChats(id: string) {
    const res = await fetch(`${CHATS_URL}/${id}`, {
        cache:"no-cache"
    })
    if(!res.ok){
        throw new Error(res.statusText);
    }

    const response = await res.json()
    if(response?.data){
        return response.data
    }
    return [];
}