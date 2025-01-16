"use client"

import React, { useEffect, useState, useRef } from "react"
import Cookies from 'js-cookie'
import cargoEnum from "@/enums/cargoEnum"

export default function Chat({ dadosDoChat, formEstaAberto = false, conexao }) {
    const [mensagens, setMensagens] = useState([])
    const [mensagemDigitada, setMensagemDigitada] = useState("")
    const [avisoChatVinculado, setAvisoChatVinculado] = useState("")
    const avisoChatVinculadoRef = useRef();

    useEffect(() => {
        conexao.on("MensagemRecebida", handleMensagemRecebida)
        conexao.on("MensagemAtualEnviada", handleMensagemAtualEnviada)
        conexao.on("VinculadoAoChat", handleVinculadoAoChat)
    }, [])

    const handleMensagemRecebida = (mensagemRecebida) => {
        setMensagens(mensagensAntigas => [...mensagensAntigas, mensagemRecebida])
    }

    const handleMensagemAtualEnviada = (mensagemEnviada) => {
        console.log(mensagemEnviada)
        setMensagens(mensagensAntigas => [...mensagensAntigas, mensagemEnviada])
    }

    const handleEnviarMensagem = () => {
        if (mensagemDigitada.trim()) {
            let tokenDoCliente = Cookies.get("tokenDeAcessoCliente")
            if (tokenDoCliente == undefined)
                return

            conexao.invoke("EnviarMensagemCliente", { conteudo: mensagemDigitada, token: tokenDoCliente })
            setMensagemDigitada('')
        }
    }

    const handleVinculadoAoChat = (avisoChatVinculado) => {
        avisoChatVinculadoRef.current = avisoChatVinculado
        setAvisoChatVinculado(avisoChatVinculadoRef.current)
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleEnviarMensagem()
        }
    }

    return (
        <div>
            {formEstaAberto && (
                <div className="fixed bottom-16 right-4 w-96">
                    <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
                        <div className="p-4 bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
                            <p className="text-lg font-semibold">Chat - {dadosDoChat?.setorSelecionado.nome}</p>
                        </div>

                        <div className="p-4 h-80 overflow-y-auto">
                            {mensagens.map(mensagem => (
                            <div
                                key={mensagem.id}
                                className={`mb-2 ${mensagem.remetente === cargoEnum.CLIENTE ? "text-right" : "text-left"}`}>
                                <p
                                    className={`py-2 px-4 inline-block rounded-lg ${mensagem.remetente === cargoEnum.CLIENTE
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-700"}`}>
                                    {mensagem.conteudo}
                                </p>
                                {
                                    avisoChatVinculado === "" && (
                                        <span class="block p-4 border border-gray-300 rounded-md text-center bg-gray-100 my-2">{avisoChatVinculado}</span>
                                    )
                                }
                            </div>
                            ))}
                        </div>

                        <div className="p-4 border-t flex">
                            <input
                                type="text"
                                placeholder="Digite sua mensagem"
                                value={mensagemDigitada}
                                onChange={(e) => setMensagemDigitada(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={handleEnviarMensagem}
                                className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
                            >
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}