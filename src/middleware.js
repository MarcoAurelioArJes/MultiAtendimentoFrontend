import { NextResponse } from 'next/server';
import { CADASTRO_ROTA, CHAT_ROTA, CONTROLE_ROTA, ENTRAR_ROTA } from './constants/rotasConstants';

const rotasPrivadas = [CHAT_ROTA, CONTROLE_ROTA];
const rotasExternas = [CADASTRO_ROTA, ENTRAR_ROTA]

export function middleware(request) {
  const token = request.cookies.get('tokenDeAcesso');
  
  if (rotasExternas.includes(request.nextUrl.pathname) && token) {
    return NextResponse.redirect(new URL('/chat', request.url));
  }

  if (rotasPrivadas.includes(request.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL('/entrar', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: rotasPrivadas
};