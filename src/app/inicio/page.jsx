'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '../components/navbar/navbar';

export default function Inicio() {
  // Estado para controle do popup de chat
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Estado para controle do modal de vídeo
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para abrir/fechar o popup de chat
  const toggleChatPopup = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Funções para abrir/fechar o modal de vídeo
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-black">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center py-16 px-4 bg-gradient-to-r from-blue-500 to-green-400">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl font-bold text-white">
              Multiatendimento, O chat de tempo real integrado para o seu site!
            </h1>
            <p className="text-xl text-white mt-4 mb-6">
              Ative o Sistema de Callback e converse com seus clientes utilizando um chat em tempo real.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <button
                className="px-6 py-2 bg-white text-black rounded-md"
                onClick={openModal}
              >
                Veja ao vivo como funciona
              </button>
              <button className="px-6 py-2 bg-transparent border-2 border-white text-white rounded-md">
                Confira os preços
              </button>
            </div>
          </div>
          
          <div className="md:w-1/2 mt-8 md:mt-0">
            <Image
              src="/images/robo.png"
              alt="Chat e ligações"
              width={300}
              height={400}
              className="mx-auto md:mx-0 rounded-lg"
            />
          </div>
          
        </section>

        {/* Seção adicional de benefícios */}
        <section className="py-16 px-4 bg-gray-100">
          <h2 className="text-3xl font-bold text-center mb-8">Benefícios para você e sua equipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <Image
                src="/images/carrosel_home3.avif"
                alt="Conversa online"
                width={150}
                height={150}
                className="mx-auto"
              />
              <h3 className="text-lg font-bold mt-4">Conexão em Tempo Real</h3>
              <p className="text-gray-500 mt-2">Responda instantaneamente às dúvidas de seus clientes.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <Image
                src="/images/carrosel_home2.avif"
                alt="Suporte ao cliente"
                width={150}
                height={150}
                className="mx-auto"
              />
              <h3 className="text-lg font-bold mt-4">Suporte Personalizado</h3>
              <p className="text-gray-500 mt-2">Tenha conversas que encantam e fidelizam.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <Image
                src="/images/carrosel_home1.jpg"
                alt="Trabalho em equipe"
                width={150}
                height={150}
                className="mx-auto"
              />
              <h3 className="text-lg font-bold mt-4">Integração Simplificada</h3>
              <p className="text-gray-500 mt-2">Conecte sua equipe em uma única plataforma.</p>
            </div>
          </div>
        </section>

        {/* Chat Popup Fixado */}
        <div className="fixed bottom-4 right-4 z-50">
          {!isChatOpen && (
            <button
              onClick={toggleChatPopup}
              className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-lg flex items-center gap-2 hover:bg-blue-600"
            >
              <Image
                src="/images/icon.png"
                alt="Ícone de chat"
                width={20}
                height={20}
              />
              Como podemos ajudar?
            </button>
          )}

          {isChatOpen && (
            <div className="w-80 bg-white shadow-lg rounded-lg p-4 border border-gray-300">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Fale com nosso atendente</h2>
                <button
                  onClick={toggleChatPopup}
                  className="text-gray-500 hover:text-red-500"
                >
                  &#x2715;
                </button>
              </div>
              <div className="h-60 overflow-y-auto bg-gray-100 rounded p-2">
                <p className="text-gray-600 mb-2">
                  Atendente: Olá! Como posso ajudar você hoje?
                </p>
              </div>
              <form className="flex mt-4">
                <input
                  type="text"
                  placeholder="Digite sua mensagem"
                  className="flex-grow px-4 py-2 border rounded-l-md"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
                >
                  Enviar
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Modal de Vídeo */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-lg p-6 relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-gray-600 text-lg"
                onClick={closeModal}
              >
                ✕
              </button>
              <div className="aspect-w-16 aspect-h-9">
                <video
                  controls
                  autoPlay
                  className="w-full rounded-lg"
                >
                  <source src="/videos/demo.mp4" type="video/mp4" />
                  Seu navegador não suporta a reprodução de vídeo.
                </video>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-6">
  <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
    {/* Informações gerais */}
    <div className="text-center md:text-left mb-4 md:mb-0">
      <h4 className="text-lg font-bold">© 2024 Multiatendimento</h4>
      <p className="text-gray-400 text-sm">Todos os direitos reservados.</p>
    </div>

    {/* Redes sociais */}
    <div className="flex gap-4">
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg"
          alt="Facebook"
          width={30}
          height={30}
          className="hover:opacity-75"
        />
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
          alt="Instagram"
          width={30}
          height={30}
          className="hover:opacity-75"
        />
      </a>
      <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
          alt="LinkedIn"
          width={30}
          height={30}
          className="hover:opacity-75"
        />
      </a>
    </div>

    {/* Links úteis */}
    <div className="text-center md:text-right">
      <a href="#!" className="text-gray-400 hover:text-white text-sm block">
        Política de Privacidade
      </a>
      <a href="#!" className="text-gray-400 hover:text-white text-sm block">
        Termos de Uso
      </a>
      <a href="#!" className="text-gray-400 hover:text-white text-sm block">
        Contato
      </a>
    </div>
  </div>
</footer>

    </>
  );
}
