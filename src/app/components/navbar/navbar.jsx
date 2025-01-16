'use client'

import Link from "next/link"
import Image from 'next/image'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { generateColorFromInitial, getIniciaisPrimeiroEUltimoNome } from '@/utils/fotoPerfilUtils'
import { ENTRAR_ROTA } from "@/constants/rotasConstants"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const [nomeDeUsuario, setNomeDeUsuario] = useState('')
  const [estaLogado, setEstaLogado] = useState(false)
  const router = useRouter()

  const cor = generateColorFromInitial(nomeDeUsuario)
  const inicial = getIniciaisPrimeiroEUltimoNome(nomeDeUsuario)

  useEffect(() => {
    let estaLogado = Cookies.get("tokenDeAcesso") != undefined
    setEstaLogado(estaLogado)

    if (estaLogado) {
      const nomeUsuario = Cookies.get("nomeUsuario")
      setNomeDeUsuario(nomeUsuario || '')
    }
  }, [])

  const handleSair = () => {
    Cookies.remove("tokenDeAcesso")
    Cookies.remove("nomeUsuario")
    Cookies.remove("cargoUsuario")

    router.push(ENTRAR_ROTA)
  }

  return (
    <nav className="bg-gray-800 py-4 px-[6.25rem]">
      <div className="mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold flex items-center">
          <Image
            alt="ChatAtendimentoLogo"
            src="https://support.chatify.marketing/wp-content/uploads/2024/03/Chatify-Atendimento-5.svg"
            className="mx-auto h-10 w-auto"
            width={20}
            height={20}
          />
          <Link href={estaLogado ? "/chat" : "/inicio"} className="mx-2">Início</Link>
        </div>

        <ul className="flex space-x-4 items-center">
          {estaLogado ? (
            <>
              <li>
                <Link href="/chat" className="text-white hover:text-gray-300">Chat</Link>
              </li>
              <li>
                <Link href="/controle" className="text-white hover:text-gray-300">Controle</Link>
              </li>
              <li className="relative">
                <Menu as="div" className="relative ml-2">
                  <div>
                    <MenuButton className="relative flex items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: cor }}
                      >
                        {inicial}
                      </div>
                      <p className="text-white mx-2">{nomeDeUsuario}</p>
                    </MenuButton>
                  </div>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem>
                        {({ active }) => (
                          <button
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700', 'w-full')}
                            onClick={handleSair}
                          >
                            Sair
                          </button>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/entrar" className="text-white hover:text-gray-300">Entrar</Link>
              </li>
              <li>
                <Link href="/cadastro" className="text-white hover:text-gray-300">Cadastre-se</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}
