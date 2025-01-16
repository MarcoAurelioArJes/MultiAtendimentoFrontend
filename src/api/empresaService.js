import apiService from "./apiService";

const baseEndpoint = "Empresa"
export default {
    async criar(objetoEmpresa) {
        let respostaHttp = await apiService.requisicao({endpoint: `${baseEndpoint}/Registrar`, verboHttp: "POST", body: objetoEmpresa})

        let resultado = await apiService.resposta(respostaHttp);

        if (!respostaHttp.ok) 
            throw new Error(JSON.stringify(resultado))
    }
}