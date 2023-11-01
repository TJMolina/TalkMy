"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  recibirNotasExistentes,
  eliminarNotaDeBD,
  obtenerNotasLocales,
} from "@/libs/manejarNotas";
import Nota from "@/componentes/cardNota";
import Container from "@/componentes/container";
import Header from "@/componentes/header";
import Footer from "@/componentes/footer";
import {
  AiOutlineUserAdd,
  AiTwotoneBulb,
  AiOutlineInfoCircle,
  AiOutlinePlus,
} from "react-icons/ai";
export default function Home() {
  const [logueado, setLogueado] = useState(false);
  const [notas, setNotas] = useState(obtenerNotasLocales());
  const cerrarSecion = () => {
    localStorage.clear();
    window.location.reload();
  };

  const borrarEstaNota = (idBorrar) => {
    setNotas(notas.filter((nota) => nota.id !== idBorrar));
    eliminarNotaDeBD(idBorrar);
  };

  useEffect(() => {
    //Mostrar todas las notas existentes en  la cuenta del usuario al iniciar la pagina
    recibirNotasExistentes(setNotas);
    setLogueado(localStorage.getItem("contraseTalkMyAppUsuario"));
  }, []);

  return (
    <Container>
      <Header>
        {
          <div>
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
            <AiTwotoneBulb />
            <AiOutlineInfoCircle />
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
        <button class="boton boton--add">
          <Link href={"/Nota/Crear"}>
            <AiOutlinePlus style={{marginRight:'5px'}}/> Agregar Nueva Nota
          </Link>
        </button>
      </main>
      <Footer />
    </Container>
  );
}
