"use client";
//librerias
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

//componentes
import Header from "@/componentes/header";
import CardNota from "@/componentes/TaskItem";
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
//import { logOut } from "@/libs/login-register";
import { useEffect } from "react";
import { singOut } from "@/libs/firebase-utils";

export default function Home() {
  const { estaLogueado, notas, setNotaId } = useMain();
  const router = useRouter();

  //se ejecutara al renderizar el index
  useEffect(() => {
    setNotaId("");
  }, []);

  //----------------------------------------------------------------------------------
  return (
    <>
      <Header>
        {
          <div className="contenedorLabels">
            <label className="label">
              {estaLogueado ? (
                <AiOutlineUserDelete onClick={singOut} />
              ) : (
                <Link href="/Formulario">
                  <AiOutlineUserAdd />
                </Link>
              )}
            </label>
            <label className="label">
              <Link href="https://github.com/TJMolina/TalkMy">
                <AiOutlineInfoCircle />
              </Link>
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
        <Link className="boton boton--add" href="/TaskForm">
          <AiOutlinePlus style={{ marginRight: "5px" }} /> Agregar Nueva Nota
        </Link>
      </main>
      <Footer />
    </>
  );
}
