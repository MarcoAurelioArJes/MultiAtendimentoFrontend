import './style.css'

import React from 'react'
import ChatCard from '../chatCard/page.jsx'

const ChatList = ({ chats, onChatClick }) => {
    return (
        <>
            <div className="chat-list bg-gray-300">
            <h2 className="bg-gray-800 tituloChats">Chats</h2>
                <div className="chat-list-children">
                    <ul className="divide-y divide-gray-100">
                    {chats && chats.map((chat) => (
                        <ChatCard key={chat.id} chat={chat} onClick={onChatClick} />
                    ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default ChatList;
