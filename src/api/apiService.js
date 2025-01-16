import Cookies from 'js-cookie';
import { environment } from '@/environment/environment';

export default {
        async requisicao({endpoint = "", verboHttp, body = {}, token}) {
            let tokenDeAcesso = Cookies.get('tokenDeAcesso')

            let corpoRequisicao = {
                method: verboHttp,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenDeAcesso}`,
                    "UserToken": token
                }
            }

            if (Object.keys(body).length > 0) corpoRequisicao.body = JSON.stringify(body);
            
            let respostaHttp = await fetch(`${environment.api.url}/${endpoint}`, corpoRequisicao);
            return respostaHttp;
        },
        resposta: async function (requisicao) {
            return requisicao.headers.get("content-type") !== null ? await requisicao.json() : null;
        }
}