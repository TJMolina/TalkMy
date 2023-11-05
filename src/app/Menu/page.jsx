"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import {
  recibirNotasExistentes,
  eliminarNotaDeBD,
  obtenerNotasLocales,
} from "@/services/manejarNotas";

import Nota from "@/componentes/cardNota";
import Container from "@/componentes/container";
import Header from "@/componentes/header";
import Footer from "@/componentes/footer";
import ApagarLuz from "@/componentes/modoOscuroButton";

import {
  AiOutlineUserAdd,
  AiOutlineInfoCircle,
  AiOutlinePlus,
} from "react-icons/ai";

export default function Home() {
  const [logueado, setLogueado] = useState(false);
  const [notas, setNotas] = useState([]);

  const cerrarSecion = () => {
    localStorage.clear();
    window.location.reload();
  };

  const borrarEstaNota = (idBorrar) => {
    document.getElementById(idBorrar)?.classList.add('borrar');
    setTimeout(() => {
      setNotas(notas.filter((nota) => nota.id !== idBorrar));
      }, 198);
    eliminarNotaDeBD(idBorrar);
  };

  useEffect(() => {
    //Mostrar todas las notas existentes en  la cuenta del usuario al iniciar la pagina
    setNotas(obtenerNotasLocales());
    setLogueado(localStorage.getItem("contraseTalkMyAppUsuario"));
    if (logueado) recibirNotasExistentes(setNotas);
  }, []);

  return (
    <Container>
      <Header>
        {
          <div className="contenedorLabels">
            <label className="label">
              <Link href={logueado ? "#" : "/Formulario"}>
                {logueado ? (
                  <Image
                    src="/logout.png"
                    width={25}
                    height={30}
                    alt="logOut"
                    onClick={cerrarSecion}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <AiOutlineUserAdd />
                )}
              </Link>
            </label>
            <label className="label">
              <AiOutlineInfoCircle />
            </label>
            <ApagarLuz />
          </div>
        }
      </Header>
      <main>
        <div className="notas">
          {notas.length > 0 ? (
            notas.map((n) => (
              <Nota
                key={n.id}
                id={n.id}
                nota={n.nota}
                borrarEstaNota={borrarEstaNota}
              />
            ))
          ) : (
            <div>No hay notas.</div>
          )}
        </div>
        <Link className="boton boton--add" href={"/Nota"}>
          <AiOutlinePlus style={{ marginRight: "5px" }} /> Agregar Nueva Nota
        </Link>
      </main>
      <Footer />
    </Container>
  );
}
