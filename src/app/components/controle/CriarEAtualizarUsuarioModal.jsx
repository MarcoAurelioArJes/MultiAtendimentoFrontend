import { useState, useEffect } from 'react';
import ListOptions from '../listOptions/listOptions';
import usuarioService from "@/api/usuarioService";
import setorService from "@/api/setorService";
import { ATUALIZAR, CRIAR } from '@/constants/operacaoConstants';

export default function CriarEAtualizarUsuarioModal({ usuario, onClose, dialogMode, manipularListaDeUsuarios }) {
    const dadosFormularioPadrao = { nome: '', email: '', senha: '', confirmarSenha: '', setorId: 0, cargo: 0 }
    const [dadosDoFormulario, setDadosDoFormulario] = useState(dialogMode === ATUALIZAR ? { ...usuario } : dadosFormularioPadrao)

    const [cargos, setCargos] = useState([{ id: 0, nome: "Selecionar" }]);
    const [cargoSelecionado, setCargoSelecionado] = useState(cargos[0]);
    const [setores, setSetores] = useState([{ id: 0, nome: "Selecionar" }]);
    const [setorSelecionado, setSetorSelecionado] = useState(setores[0]);

    useEffect(() => {
        usuarioService.obterCargos().then(data => {
            setCargos(data.resultado)
            
            if (usuario)
                setCargoSelecionado(data.resultado.find(x => x.codigo === usuario.cargo))
        })

        setorService.obterSetores().then(data => {
            setSetores(data.resultado)

            if (usuario)
                setSetorSelecionado(data.resultado.find(x => x.id === usuario.setor.id))
        })
    }, [])

    const handleAoMudarOValorDoInput = (e) => {
        const { name, value } = e.target
        setDadosDoFormulario((dadosDoFormulario) => ({...dadosDoFormulario, [name]: value,}))
      }

    const handleCriarAtualizarUsuario = (e) => {
        e.preventDefault();
        const dadosUsuario = {
            ...dadosDoFormulario,
            setorId: setorSelecionado.id,
            cargo: cargoSelecionado.codigo
        }

        if (dialogMode == ATUALIZAR)
            usuarioService.atualizar(usuario.id, dadosUsuario)
                          .then(usuarioAtualizado => {
                            manipularListaDeUsuarios(usuarioAtualizado.resultado)
                          })
        else {
            usuarioService.criar(dadosUsuario)
                          .then(usuarioCriado => {
                            manipularListaDeUsuarios(usuarioCriado.resultado)
                          })
        }

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {usuario ? 'Atualizar Usuário' : 'Criar Usuário'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form action="#" method="POST" className="space-y-6" onSubmit={handleCriarAtualizarUsuario}>
                    <div>
                        <label htmlFor="nome" className="block text-sm font-medium text-gray-900">
                            Nome
                        </label>
                        <div className="mt-2">
                            <input
                                id="nome"
                                name="nome"
                                type="text"
                                required
                                autoComplete="given-name"
                                placeholder="O seu nome completo"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={dadosDoFormulario.nome}
                                onChange={handleAoMudarOValorDoInput}
                            />
                        </div>
                    </div>
                    <div>
                        {
                            cargoSelecionado && (
                                <ListOptions
                                    id="cargoSelecionado"
                                    labelName="Cargos"
                                    itensArg={cargos}
                                    propriedadeChave={"codigo"}
                                    propriedadeAMostrar={"nome"}
                                    selecionado={cargoSelecionado}
                                    setFunc={setCargoSelecionado} />
                            )
                        }
                    </div>
                    <div>
                        {
                            setorSelecionado && (
                                <ListOptions
                                    id="setorSelecionado"
                                    labelName="Setores"
                                    itensArg={setores}
                                    propriedadeChave={"id"}
                                    propriedadeAMostrar={"nome"}
                                    selecionado={setorSelecionado}
                                    setFunc={setSetorSelecionado} />
                            )
                        }
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                disabled={dialogMode === ATUALIZAR}
                                autoComplete="email"
                                placeholder="ex: exemplo@email.com"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={dadosDoFormulario.email}
                                onChange={handleAoMudarOValorDoInput}
                            />
                        </div>
                    </div>

                    {
                        dialogMode === CRIAR && (
                            <>
                                <div>
                                    <label htmlFor="senha" className="block text-sm font-medium text-gray-900">
                                        Senha
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="senha"
                                            name="senha"
                                            type="password"
                                            required
                                            autoComplete="new-password"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={dadosDoFormulario.senha}
                                            onChange={handleAoMudarOValorDoInput}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-900">
                                        Confirmar Senha
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="confirmarSenha"
                                            name="confirmarSenha"
                                            type="password"
                                            required
                                            autoComplete="new-password"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={dadosDoFormulario.confirmarSenha}
                                            onChange={handleAoMudarOValorDoInput}
                                        />
                                    </div>
                                </div>
                            </>
                        )
                    }

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-sky-500 rounded-md hover:bg-sky-600"
                            onClick={handleCriarAtualizarUsuario}
                        >
                            {usuario ? 'Atualizar' : 'Criar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}