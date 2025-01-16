import { environment } from '@/environment/environment';
import Cookies from 'js-cookie';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

export default {
    obterConexao() {
        const hubConnectionBuilder = new HubConnectionBuilder()
               .withUrl(`${environment.api.url}/chatHub`, { accessTokenFactory: () => Cookies.get("tokenDeAcesso") })
               .configureLogging(LogLevel.Information);
        return hubConnectionBuilder.build();
    },
    async iniciarConexao(conexao) {
        try {
            await conexao.start();
            console.log("SignalR Connected.")
        }
        catch (erro) {
            console.log("erro:", erro);
        }
    }
}