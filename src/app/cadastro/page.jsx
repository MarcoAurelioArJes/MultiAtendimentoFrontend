'use client'

import Image from 'next/image'
import Navbar from '../components/navbar/navbar';
import empresaService from '@/api/empresaService';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Cadastro() {
    const [nome, setNome] = useState();
    const [nomeEmpresa, setNomeEmpresa] = useState();
    const [cnpjEmpresa, setCnpjEmpresa] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [confirmarSenha, setConfirmarSenha] = useState();
    const router = useRouter();

    const enviarCadastro = (e) => {
        e.preventDefault();
        console.log("Função enviarCadastro foi chamada");

        empresaService.criar({
            nomeEmpresa: nomeEmpresa,
            cnpj: cnpjEmpresa,
            NomeUsuario: nome,
            email: email,
            senha: senha,
            compararSenha: confirmarSenha
        }).then(() => {
            toast.success("Empresa cadastrada com sucesso!");
            router.push('/entrar');
        }).catch(error => {
            toast.error(error.message)
        })
    };

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
                            Crie uma nova conta
                        </h2>
                        <h5 className="mt-2 text-center text-1xl font-semibold leading-9 tracking-tight text-gray-400">
                            É rápido e fácil!
                        </h5>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form action="#" method="POST" className="space-y-6" onSubmit={enviarCadastro}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Nome
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="noome"
                                        name="nome"
                                        type="text"
                                        required
                                        autoComplete="given-name"
                                        placeholder='O seu nome completo'
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={e => setNome(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Nome Empresa
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="nomeEmpresa"
                                        name="nomeEmpresa"
                                        type="text"
                                        required
                                        autoComplete="organization"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={e => setNomeEmpresa(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    CNPJ Empresa
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="cnpj"
                                        name="cnpj"
                                        type="text"
                                        required
                                        autoComplete="cnpj"
                                        placeholder='ex: XXXXXXXX0001XX'
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={e => setCnpjEmpresa(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="text"
                                        required
                                        autoComplete="email"
                                        placeholder='ex: exemplo@email.com'
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Senha
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={e => setSenha(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirmar Senha
                                </label>
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
                                    className="flex w-full justify-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500">
                                    Cadastrar
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            <span>Já possui conta? </span>
                            <a href="/entrar" className="font-semibold leading-6 text-sky-600 hover:text-sky-500">
                                clique aqui para entrar
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
