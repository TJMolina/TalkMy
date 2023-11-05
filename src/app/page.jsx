"use client";
//librerias
import Link from "next/link";

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
} from "react-icons/ai";

//funciones
import { useMain } from "./context/mainContext";
import { logOut } from "@/libs/login-register";

export default function Home() {
  const { estaLogueado, notas } = useMain();
  return (
    <>
      <Header>
        {
          <div className="contenedorLabels">
            <label className="label">
              {estaLogueado ? (
                <Image
                  src="/logout.png"
                  width={25}
                  height={30}
                  alt="logOut"
                  onClick={logOut}
                  style={{ cursor: "pointer" }}
                />
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
            notas.map((n) => (
              <CardNota
                key={n.id}
                id={n.id}
                nota={n.nota}
              />
            ))
          ) : (
            <div>No hay notas.</div>
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
