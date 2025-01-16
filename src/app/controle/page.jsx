"use client";
import React, { useState } from 'react';
import Navbar from '../components/navbar/navbar';
import ListaDeUsuarios from '../components/controle/listaDeUsuarios';
import ListaDeSetores from '../components/controle/listaDeSetores';

export default function Controle() {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <div className='flex justify-center'>
                    <div>
                        <ListaDeUsuarios></ListaDeUsuarios>
                        <ListaDeSetores></ListaDeSetores>
                    </div>
                </div>
            </main>

        </>

    );
}



