"use client";
//librerias
import Link from "next/link";
import Image from "next/image";

//componentes
import Header from "@/componentes/header";
import CardNota from "@/componentes/cardNota";
import Footer from "@/componentes/footer";
import ApagarLuz from "@/componentes/modoOscuroButton";

//iconos
import {
  AiOutlineUserAdd,
  AiOutlineInfoCircle,
  AiOutlinePlus,
  AiOutlineUserDelete,
} from "react-icons/ai";

//funciones
import { useMain } from "./context/mainContext";
import { logOut } from "@/libs/login-register";
import { useEffect } from "react";
import { obtenerNotasLocales, recibirNotasExistentes } from "@/services/manejarNotas";

export default function Home() {
  const { estaLogueado, notas, setNotas, setNotaId } = useMain();

  //se ejecutara al renderizar el index
  useEffect(() => {
    setNotaId("");
    //Mostrar todas las notas existentes en  la cuenta del usuario al iniciar la pagina
    const notasAux = obtenerNotasLocales();
    //verificare si esta logueado o no. si esta logueado, recibir notas de la bd
    estaLogueado ? recibirNotasExistentes(setNotas, notasAux) : setNotas(notasAux);
  }, []);

  //----------------------------------------------------------------------------------
  return (
    <>
      <Header>
        {
          <div className="contenedorLabels">
            <label className="label">
              {estaLogueado ? (
                <AiOutlineUserDelete onClick={logOut} />
              ) : (
                <Link href="/Formulario">
                  <AiOutlineUserAdd />
                </Link>
              )}
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
            notas.map((nota) => <CardNota key={nota.id} nota={nota} />)
          ) : (
            <div className="noHayNotas">
              No hay notas.
              <Image
                src={"/kuromi.png"}
                width={70}
                height={60}
                alt="No hay notas.."
              />
            </div>
          )}
        </div>
        <Link className="boton boton--add" href="/Nota">
          <AiOutlinePlus style={{ marginRight: "5px" }} /> Agregar Nueva Nota
        </Link>
      </main>
      <Footer />
    </>
  );
}
