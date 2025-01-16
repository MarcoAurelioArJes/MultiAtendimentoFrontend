"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Navbar from '../components/navbar/navbar'
import usuarioService from '@/api/usuarioService'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AtualizarSenha() {
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const router = useRouter()

    const atualizarSenhaPayload = {
        senha: senha,
        confirmarSenha: confirmarSenha
    }

    const atualizarSenha = (e) => {
        e.preventDefault()
        usuarioService.atualizarSenha(atualizarSenhaPayload, router.token)
            .then(() => {
                toast.success("Senha atualizada com sucesso!!!")
                router.push('/entrar')
            })
            .catch(erro => {
                console.log(erro)
                let erroJson = JSON.parse(erro.message)

                if (Object.keys(erroJson.resultado).length === 0) {
                    toast.error(erroJson.mensagem)
                    return
                }
                erroJson.resultado.forEach(result => {
                    toast.error(result.mensagens[0], { id: result.campo })
                })
            })
    }

    return (
        <>
            <header>
                <Navbar />
            </header>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 items-center">
                <div className='w-2/5 border-solid border-2 border-gray-20 px-6 py-9 rounded-2xl'>
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <Image
                            alt="ChatAtendimentoLogo"
                            src="https://support.chatify.marketing/wp-content/uploads/2024/03/Chatify-Atendimento-5.svg"
                            className="mx-auto h-10 w-auto"
                            width={50}
                            height={100}
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Atualizar senha
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={atualizarSenha} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Senha
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={e => setSenha(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Confirmar Senha
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={e => setConfirmarSenha(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                                >
                                    Atualizar senha
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}