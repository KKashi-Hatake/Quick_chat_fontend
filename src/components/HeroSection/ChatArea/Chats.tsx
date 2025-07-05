import React from 'react'
import { MessageType } from '../../../../types'

const Chats = ({ messages }: { messages: MessageType[] }) => {
    console.log(messages)
    return (
        <div className=''>Chats</div>
    )
}

export default Chats