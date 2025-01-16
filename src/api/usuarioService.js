import apiService from "./apiService";

const baseEndpoint = "usuario"
export default {
    async entrar(objetoUsuario) {
        let respostaHttp = await apiService.requisicao({endpoint: `${baseEndpoint}/entrar`, verboHttp: "POST", body: objetoUsuario})
        let resultado = await apiService.resposta(respostaHttp);

        if (!respostaHttp.ok)
            throw new Error(JSON.stringify(resultado))

        return resultado;
    },
    async criar(objetoUsuario) {
        let respostaHttp = await apiService.requisicao({endpoint: `${baseEndpoint}/criar`, verboHttp: "POST", body: objetoUsuario})

        if (!respostaHttp.ok) 
            throw new Error(JSON.stringify(resultado))

        let resultado = await apiService.resposta(respostaHttp);

        return resultado
    },
    async obterUsuarios() {
        let respostaHttp = await apiService.requisicao({endpoint: `${baseEndpoint}/obterUsuarios`, verboHttp: "GET"})
        
        let respostaBody = await apiService.resposta(respostaHttp);
        
        if (!respostaHttp.ok) 
            throw new Error(JSON.stringify(resultado))

        return respostaBody;
    },
    async obterPorId(id) {
        let respostaHttp = await apiService.requisicao({endpoint: `${baseEndpoint}/obterUsuarios/${id}`, verboHttp: "GET"});
        
        if (!respostaHttp.ok) 
            throw new Error(JSON.stringify(resultado))

        let resultado = await apiService.resposta(respostaHttp);      
        
        return resultado;
    },
    async atualizar(id, objetoUsuario) {
        let respostaHttp = await apiService.requisicao({endpoint: `${baseEndpoint}/atualizar/${id}`, verboHttp: "PUT", body: objetoUsuario})
        
        if (!respostaHttp.ok) 
            throw new Error(JSON.stringify(resultado))

        let resultado = await apiService.resposta(respostaHttp);
        
        return resultado;
    },
    async deletar(id) {
        console.log('deletar', id)
        let respostaHttp = await apiService.requisicao({endpoint: `${baseEndpoint}/remover/${id}`, verboHttp: "DELETE"})

        if (!respostaHttp.ok)
            throw new Error(respostaHttp.body.resultado);
    },
    async obterCargos() {
        let respostaHttp = await apiService.requisicao({endpoint: `${baseEndpoint}/obterCargos`, verboHttp: "GET"})

        if (!respostaHttp.ok)
            throw new Error(respostaHttp.body.resultado);
        
        let resultado = await apiService.resposta(respostaHttp);
        
        return resultado;
    },
    async atualizarSenha(atualizarSenha, token) {
        let respostaHttp = await apiService.requisicao({endpoint: `${baseEndpoint}/atualizarSenha`, verboHttp: "PUT", body: atualizarSenha, token: token})

        if (!respostaHttp.ok)
            throw new Error(respostaHttp.body.resultado);
        
        let resultado = await apiService.resposta(respostaHttp);
        
        return resultado;
    },
    async enviarEmailParaRecuperarSenha(recuperarSenha) {
        let respostaHttp = await apiService.requisicao({endpoint: `${baseEndpoint}/enviarEmailParaRecuperarSenha`, verboHttp: "POST", body: recuperarSenha})

        if (!respostaHttp.ok)
            throw new Error(respostaHttp.body.resultado);
        
        let resultado = await apiService.resposta(respostaHttp);
        
        return resultado;
    },
}