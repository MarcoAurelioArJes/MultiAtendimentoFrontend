"use client";
import './style.css'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React, { useState, useEffect, useRef } from 'react';
import ChatList from '../components/chatList/page.jsx';
import Navbar from '../components/navbar/navbar';

import chatService from '@/api/chatService';
import websocketService from '@/api/websocketService'
import cargoEnum from '@/enums/cargoEnum';

export default function Chat() {
    const [mensagem, setMensagem] = useState("");
    const [chats, setChats] = useState([]);
    const chatsRef = useRef();
    const [chatAtual, setChatAtual] = useState(null);
    const chatAtualRef = useRef();
    const [mensagensAtuais, setMensagensAtuais] = useState(null);
    const mensagensAtuaisRef = useRef();
    const [conexao, setConexao] = useState();
    
    useEffect(() => {
        async function iniciarConexao() {
            let conexaoInicial = websocketService.obterConexao();
            await websocketService.iniciarConexao(conexaoInicial);
            setConexao(conexaoInicial);
            conexaoInicial.invoke("VincularAUmGrupoDeChats");

            definirEventosASeremEscutados.bind(this)(conexaoInicial);
        }
        iniciarConexao();

        async function obterChats() {
            try {
                let retorno = await chatService.obterTodos();
                chatsRef.current = retorno.resultado;
                setChats(chatsRef.current);
            } catch(erro) {
                let erroJson = JSON.parse(erro.message);
          
                if (Object.keys(erroJson.resultado).length === 0) {
                    toast.error(erroJson.mensagem)
                  return;
                }
                erroJson.resultado.forEach(result => {
                  toast.error(result.mensagens[0], { id: result.campo })
                });
            }
        }
        obterChats()
    }, [])

    const definirEventosASeremEscutados = (conexao) => {
        conexao.on("MensagemRecebida", handleMensagemRecebida);
        conexao.on("MensagemAtualEnviada", handleMensagemAtualEnviada);

        conexao.on("ChatCriado", (chat) => {
            let chatExiste = chatsRef.current.some(chatRef => chatRef.id == chat.id)
            if (chatExiste)
                return;

            chatsRef.current = [...chatsRef.current, chat]
            setChats(chatsRef.current)
        })
    }

    const handleAtualizarChatsEMensagens = (mensagemRecebida) => {
        let indexChatQueRecebeuAMensagem = chatsRef.current.findIndex(chatRef => chatRef.id === mensagemRecebida.chatId);

        if (chatsRef.current 
            && chatsRef.current[indexChatQueRecebeuAMensagem].mensagens.some(mensagem => mensagem.id == mensagemRecebida.id))
            return;

        if (chatAtualRef.current && chatAtualRef.current.id === mensagemRecebida.chatId) {
            mensagensAtuaisRef.current = [...mensagensAtuaisRef.current, mensagemRecebida];
            chatAtualRef.current.mensagens = mensagensAtuaisRef.current;
            
            setChatAtual(chatAtualRef.current)
            setMensagensAtuais(mensagensAtuaisRef.current)
        }
        else {
            chatsRef.current[indexChatQueRecebeuAMensagem].mensagens = [...chatsRef.current[indexChatQueRecebeuAMensagem].mensagens, mensagemRecebida]
            setChats(chatsRef.current)
        }
    }

    const handleMensagemRecebida = (mensagemRecebida) => {
        handleAtualizarChatsEMensagens(mensagemRecebida);
    }

    const handleMensagemAtualEnviada = (mensagemRecebida) => {
        handleAtualizarChatsEMensagens(mensagemRecebida);
    }
    
    const handleAoDigitarMensagem = (event) => {
        setMensagem(event.target.value)
    };

    const handleEnviarMensagem = () => {
        const novaMensagem = {
            chatId: chatAtual.id,
            conteudo: mensagem
        }
        conexao.invoke("EnviarMensagem", novaMensagem);
        setMensagem("");
    };

    const handleAoClicarNoChat = (chat) => {
        chatAtualRef.current = chat;
        setChatAtual(chatAtualRef.current);
        mensagensAtuaisRef.current = chatAtualRef.current.mensagens;
        setMensagensAtuais(mensagensAtuaisRef.current);

        conexao.invoke("VincularAUmChat", chat.id);
    };

    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main className="main-container">
                {
                        chats != undefined && <ChatList chats={chats} onChatClick={handleAoClicarNoChat} />
                }
                <div className="message-input bg-gray-100">
                    {chatAtual ? (
                        <>
                            <h2 className="bg-gray-800 tituloChats">
                                {chatAtual.cliente.nome}
                            </h2>
                            <div className="messages">
                                {mensagensAtuais.map((mensagem) => (
                                    <div key={mensagem.id} className={`${mensagem.remetente != cargoEnum.CLIENTE ? 'posicaoMensagemMinha' : 'posicaoMensagemDele'}`}>
                                        <p className={`message ${mensagem.remetente != cargoEnum.CLIENTE ? 'mensagemMinha' : 'mensagemDele'}`}>{mensagem.conteudo}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="input-container">
                                <input
                                    type="text"
                                    value={mensagem}
                                    onChange={handleAoDigitarMensagem}
                                    placeholder="Digite sua mensagem..."
                                />

                                <button onClick={handleEnviarMensagem} src="https://www.myinstants.com/instant/cebolinha-maltratando-11511/embed/">Enviar</button>
                            </div>
                        </>
                    ) 
                    : (
                        <>
                            <h2 className="bg-gray-800 tituloChats"></h2>
                            <div className="vazio">
                                Selecione uma conversa
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};