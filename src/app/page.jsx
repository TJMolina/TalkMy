'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import Nota from "@/componentes/cardNota";
import { recibirNotasExistentes, eliminarNotaDeBD, obtenerNotasLocales } from '@/libs/manejarNotas';
import Image from 'next/image';
import Container from "@/componentes/container";
import Header from "@/componentes/header";
import Footer from "@/componentes/footer";
import {AiOutlineUserAdd} from 'react-icons/ai'
export default function Home() {
  const [logueado, setLogueado] = useState(false);
  const [notas, setNotas] = useState(obtenerNotasLocales());

  const cerrarSecion = () => {
    localStorage.clear();
    window.location.reload();
  }

  const borrarEstaNota = (idBorrar) => {
    setNotas(notas.filter(nota => nota.id !== idBorrar));
    eliminarNotaDeBD(idBorrar);
  };

  useEffect(() => {
    //Mostrar todas las notas existentes en  la cuenta del usuario al iniciar la pagina
    recibirNotasExistentes(setNotas);
    setLogueado(localStorage.getItem('contraseTalkMyAppUsuario'));
  }, []);

  return (
    <Container>
      <Header>
        {
          logueado ?
            <Image src='/logout.png' width={35} height={40} alt='logOut' onClick={cerrarSecion} style={{ cursor: 'pointer' }} />
            :
            <Link href="/Formulario" ><AiOutlineUserAdd style={{fontSize: '2.5rem'}} /></Link>
        }
      </Header>
      <main>
        <div className="notas">
          {notas.length > 0 ?
            notas.map(n => <Nota key={n.id} id={n.id} nota={n.nota} borrarEstaNota={borrarEstaNota} />)
            :
            <div>
              No hay notas.
            </div>
          }
        </div>
        <Link href='/Nota/Crear' className='nuevaNotaBoton'>✚</Link>
      </main>
      <Footer />
    </Container>
  );
}
