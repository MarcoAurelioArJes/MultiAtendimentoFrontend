"use client"

import React, { useState, useEffect, useRef } from 'react'
import Formulario from '../../components/cliente/formulario'
import Chat from '../../components/cliente/chat'
import { useParams } from 'next/navigation'
import websocketService from '@/api/websocketService'
import Cookies from 'js-cookie';

export default function ChatCliente() {
    const [formEstaAberto, setFormEstaAberto] = useState(false)
    const [chatEstaAberto, setChatEstaAberto] = useState(false)
    const [dadosDoChat, setDadosDoChat] = useState(null)
    const [conexao, setConexao] =  useState()

    const params = useParams()

    const toggleForm = () => {
        setFormEstaAberto(!formEstaAberto)
    }

    const handleFormSubmit = async (data) => {
      const cliente = {nome: data.nome, empresaCnpj: data.cnpj , setorId: data.setorSelecionado.id}

      const conexaoInstanciada = await obterConexaoInstanciada()
      conexaoInstanciada.on("TokenDoCliente", handleAdicionarTokenDoCliente)
      conexaoInstanciada.invoke("IniciarChat", cliente)
      
      setConexao(conexaoInstanciada)

      setDadosDoChat(data)
      setChatEstaAberto(true)
    }

    const obterConexaoInstanciada = async () => {
      let conexaoInicial = websocketService.obterConexao()
      await websocketService.iniciarConexao(conexaoInicial)
      return conexaoInicial
    }

    const handleAdicionarTokenDoCliente = (tokenDoCliente) => {
      Cookies.set("tokenDeAcessoCliente", tokenDoCliente)
    }

    return (
      <>
        {!chatEstaAberto ? 
        ( <Formulario onSubmit={handleFormSubmit} 
                      formEstaAberto={formEstaAberto} 
                      cnpj={params.cnpj} /> ) 
        : 
        ( <Chat dadosDoChat={dadosDoChat} 
                formEstaAberto={formEstaAberto}
                conexao={conexao} /> )}

        <div className="fixed bottom-0 right-0 mb-4 mr-4">
            <button
            onClick={toggleForm}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center">
            {formEstaAberto ? "Fechar Chat" : "Abrir Chat"}
            </button>
        </div>
      </>
    )
  }