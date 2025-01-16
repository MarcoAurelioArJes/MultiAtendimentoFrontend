import { useState, useEffect } from 'react';
import usuarioService from '@/api/usuarioService.js';
import { generateColorFromInitial, getIniciaisPrimeiroEUltimoNome } from '@/utils/fotoPerfilUtils';
import CriarEAtualizarUsuarioModal from './CriarEAtualizarUsuarioModal';
import { ATUALIZAR, CRIAR, REMOVER } from '@/constants/operacaoConstants';
import RemoverDialog from './removerDialog';

export default function ListaDeUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const [dialogMode, setDialogMode] = useState(CRIAR);
    const [mostrarDialog, setMostrarDialog] = useState(false);

    useEffect(() => {
        listarUsuarios();
    }, []);

    const listarUsuarios = () => {
        usuarioService.obterUsuarios().then(data => setUsuarios(data.resultado));
    };

    const handleAoClicarEmAdicionarUsuario = () => {
        setUsuarioSelecionado(null);
        setDialogMode(CRIAR);
        setMostrarDialog(true);
    };

    const handleAoClicarEmEditarUsuario = (usuario) => {
        setUsuarioSelecionado(usuario);
        setDialogMode(ATUALIZAR);
        setMostrarDialog(true);
    };

    const handleAoClicarEmRemoverUsuario = (usuario) => {
        setUsuarioSelecionado(usuario);
        setDialogMode(REMOVER);
        setMostrarDialog(true);
    };

    const handleModalClose = () => {
        setMostrarDialog(false);
        listarUsuarios();
    };

    const manipularListaDeUsuarios = (usuario) => {
        if (dialogMode === ATUALIZAR) {
            let indexUsuarioAtualizado = usuarios.findIndex(usuarioEncontrado => usuarioEncontrado.id == usuario.id)
            usuarios[indexUsuarioAtualizado] = usuario
            setUsuarios(usuarios)
        } else if (dialogMode === CRIAR) {
            setUsuarios([...usuarios, usuario])
        } else if (dialogMode === REMOVER) {
            setUsuarios(usuarios.map(usuarioEncontrado => usuarioEncontrado.id !== usuario.id))
        }
    }

    return (
        <div className="w-[69.25rem] px-5 py-12 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-4 mt-4">
                <h2 class="text-2xl font-bold text-gray-800">
                        Usuários
                </h2>
                <button
                    onClick={handleAoClicarEmAdicionarUsuario}
                    className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                </button>
            </div>

            <ul role="list" className="divide-y divide-gray-100 max-h-64 overflow-y-auto">
                {usuarios.map((usuario) => (
                    <li key={usuario.email} className="flex justify-between gap-x-6 py-5 px-2">
                        <div className="flex min-w-0 gap-x-4">
                            <div
                                className="size-12 rounded-full bg-gray-50 flex items-center justify-center text-white font-bold"
                                style={{ backgroundColor: generateColorFromInitial(usuario.nome) }}
                            >
                                {getIniciaisPrimeiroEUltimoNome(usuario.nome)}
                            </div>
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm/6 font-semibold text-gray-900">{usuario.nome}</p>
                                <p className="mt-1 truncate text-xs/5 text-gray-500">{usuario.email}</p>
                            </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:items-center gap-x-2">
                            <button
                                className="p-2 text-blue-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                                onClick={() => handleAoClicarEmEditarUsuario(usuario)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                    />
                                </svg>
                            </button>

                            <button
                                className="p-2 text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md"
                                onClick={() => handleAoClicarEmRemoverUsuario(usuario)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                </svg>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {(mostrarDialog && dialogMode !== REMOVER) && (
                <CriarEAtualizarUsuarioModal
                    usuario={usuarioSelecionado}
                    onClose={handleModalClose}
                    dialogMode={dialogMode}
                    manipularListaDeUsuarios={manipularListaDeUsuarios} />
            )}
            {(mostrarDialog && dialogMode === REMOVER) && (
                <RemoverDialog
                    campoChave={"id"}
                    entidade={usuarioSelecionado}
                    open={mostrarDialog}
                    onClose={handleModalClose}
                    endpointRequisicaoParaRemover={usuarioService.deletar} />
            )}
        </div>
    );
}