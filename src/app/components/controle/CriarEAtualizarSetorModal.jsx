import { useState } from 'react';
import setorService from "@/api/setorService";
import { ATUALIZAR, CRIAR } from '@/constants/operacaoConstants';

export default function CriarEAtualizarSetorModal({ setor, onClose, dialogMode, manipularListaDeSetores }) {
    const dadosFormularioPadrao = { nome: '' }
    const [dadosDoFormulario, setDadosDoFormulario] = useState(dialogMode === ATUALIZAR ? { ...setor } : dadosFormularioPadrao)

    const handleAoMudarOValorDoInput = (e) => {
        const { name, value } = e.target
        setDadosDoFormulario((dadosDoFormulario) => ({...dadosDoFormulario, [name]: value,}))
      }

    const handleCriarAtualizarSetor = (e) => {
        e.preventDefault();

        const setor = { ...dadosDoFormulario }

        if (dialogMode == ATUALIZAR)
            setorService.atualizar(setor.id, setor)
                          .then(setorAtualizado => {
                            manipularListaDeSetores(setorAtualizado.resultado)})
        else {
            setorService.criar(setor)
                          .then(setorCriado => {
                            manipularListaDeSetores(setorCriado.resultado)})
        }

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {setor ? 'Atualizar Setor' : 'Criar Setor'}
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

                <form action="#" method="POST" className="space-y-6" onSubmit={handleCriarAtualizarSetor}>
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
                                placeholder="Informe um setor"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={dadosDoFormulario.nome}
                                onChange={handleAoMudarOValorDoInput}
                            />
                        </div>
                    </div>

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
                            onClick={handleCriarAtualizarSetor}
                        >
                            {setor ? 'Atualizar' : 'Criar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}