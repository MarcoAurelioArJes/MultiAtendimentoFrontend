import React from 'react';
import { generateColorFromInitial, getInicial } from '@/utils/fotoPerfilUtils'

const ChatCard = ({ chat, onClick }) => {
    const inicialNome = getInicial(chat.cliente.nome);
    const corIcon = generateColorFromInitial(inicialNome);

    return (
        <li
            key={chat.id}
            className="flex justify-between gap-x-6 py-3 px-1 cursor-pointer"
            onClick={() => onClick(chat)}
        >
            <div className="flex min-w-0 gap-x-4 items-center">
                <div
                    className="h-10 w-10 flex items-center justify-center rounded-full text-white font-bold"
                    style={{ backgroundColor: corIcon }}
                >
                    {inicialNome}
                </div>
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{chat.cliente.nome}</p>
                </div>
            </div>
        </li>
    );
};

export default ChatCard;
