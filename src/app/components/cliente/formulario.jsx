import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListOptions from '../listOptions/listOptions';
import setorService from "@/api/setorService";

function Formulario({ onSubmit, formEstaAberto = false, cnpj }) {
  const [setores, setSetores] = useState([{id: 0, nome: "Selecionar"}]);
  const [setorSelecionado, setSetorSelecionado] = useState(setores[0]);
  const [nome, setNome] = useState("");
  
  useEffect(() => {
    setorService.obterSetoresPorCnpj(cnpj).then(data => setSetores(data.resultado))
  }, [])

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!setorSelecionado || nome.trim() === "") {
      toast.warning("Preencha todos os campos");
      return;
    }

    onSubmit({ setorSelecionado, nome, cnpj });

    setSetorSelecionado("");
    setNome("");
  };

  return (
    <div>
      {formEstaAberto && (
        <div className="fixed bottom-16 right-4 w-96">
          <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
            <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
              <p className="text-lg font-semibold">Chat Cliente</p>

            </div>

            <div className="p-4 border-t">
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="nome"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nome
                  </label>
                  <input
                    id="nome"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Digite seu nome"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <ListOptions
                    id="setorSelecionado"
                    labelName="Setores"
                    itensArg={setores}
                    propriedadeChave={"id"}
                    propriedadeAMostrar={"nome"}
                    selecionado={setorSelecionado}
                    setFunc={setSetorSelecionado} />
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    Iniciar chat
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Formulario;
