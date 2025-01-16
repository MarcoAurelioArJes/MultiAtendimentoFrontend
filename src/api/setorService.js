import apiService from "./apiService";

const baseEndpoint = "setor"
export default {
    async criar(objetoUsuario) {
        let respostaHttp = await apiService.requisicao({endpoint: `${baseEndpoint}/criar`, verboHttp: "POST", body: objetoUsuario})

        if (!respostaHttp.ok) 
            throw new Error(JSON.stringify(resultado))

        let resultado = await apiService.resposta(respostaHttp);

        return resultado;
    },
    async obterSetores() {
        let respostaHttp = await apiService.requisicao({endpoint: `${baseEndpoint}/obterSetores`, verboHttp: "GET"})
        
        let respostaBody = await apiService.resposta(respostaHttp);
        
        if (!respostaHttp.ok) 
            throw new Error(respostaBody);

        return respostaBody;
    },
    async obterSetoresPorCnpj(cnpj) {
        let respostaHttp = await apiService.requisicao({endpoint: `${baseEndpoint}/obterSetoresPorCnpj/${cnpj}`, verboHttp: "GET"})
        
        let respostaBody = await apiService.resposta(respostaHttp);
        
        if (!respostaHttp.ok) 
            throw new Error(respostaBody);

        return respostaBody;
    },
    async obterPorId(id) {
        let respostaHttp = await apiService.requisicao({endpoint: `${baseEndpoint}/obterUsuarios/${id}`, verboHttp: "GET"});
        
        if (!respostaHttp.ok) mensagensDeErro.mensagensDeErro(dadosRetornados.value);

        let resultado = await apiService.resposta(respostaHttp);      
        
        return resultado;
    },
    async atualizar(id, objetoUsuario) {
        let respostaHttp = await apiService.requisicao({endpoint: `${baseEndpoint}/atualizar/${id}`, verboHttp: "PUT", body: objetoUsuario})
        
        if (!respostaHttp.ok) 
            throw new Error(JSON.stringify(resultado));
        
        let resultado = await apiService.resposta(respostaHttp);

        return resultado;
    },
    async deletar(id) {
        let respostaHttp = await apiService.requisicao({endpoint: `${baseEndpoint}/remover/${id}`, verboHttp: "DELETE"})

        let resultado = await apiService.resposta(respostaHttp);

        if (!respostaHttp.ok) 
            throw new Error(JSON.stringify(resultado));
    }
}