"use client";

// librerias
import { useState, useEffect } from "react";
import { v4 } from "uuid";
import Script from "next/script";

// mis scripts
import { leerArchivo } from "@/libs/manejarTexto";
import {
  obtenerNotasLocales,
  subirNotaABD,
  extraerTextoPagina,
  textArea,
} from "@/services/manejarNotas";
import { pauseReanudar } from "@/libs/reproductor";

// componentes
import Header from "@/componentes/header";
import Footer from "@/componentes/footer";
import InputArchivo from "@/componentes/inputArchivo";

// iconos
import {
  AiOutlineBars,
  AiOutlineCloud,
  AiOutlineCaretRight,
  AiOutlinePause,
  AiOutlineSave,
} from "react-icons/ai";
import { MdGTranslate } from "react-icons/md";
import ApagarLuz from "@/componentes/modoOscuroButton";

//contexto
import { useMain } from "../context/mainContext";
import Link from "next/link";

export default function Leer() {
  const [clikeado, seTclikeado] = useState(null);
  const [isPlay, setIsplay] = useState(false);
  //obtener estas variables y funciones del contexto con useMain
  const { notas, setNotas, notaEditandoId, estaLogueado } = useMain();
  let creando = false;

  const extraerTexto = (e) => {
    e.preventDefault();
    extraerTextoPagina(e.target.urlPagina.value);
    cerrarModal();
  };

  const cerrarModal = () =>
    document.getElementById("IrVentanaFlotante").classList.toggle("ver");

  const cambiarIdioma = () =>
    document.querySelector("#google_translate_element > div a")?.click();

  const crearNota = () => {
    if (isPlay) pauseReanudar(clikeado, setIsplay, isPlay, seTclikeado);

    if (!creando && textArea().innerHTML) {
      document.querySelector(".parrafoEnfocadoRemarcado")?.classList?.remove("parrafoEnfocadoRemarcado");

      const notaIndividual = textArea().innerHTML.replace(/<\/?font[^>]*>/gi,"");

      creando = true;
      let notas = obtenerNotasLocales();

      if (notaEditandoId) {
        const index = notas.findIndex((item) => item.id === notaEditandoId);
        if (index !== -1) {
          notas[index].nota = notaIndividual;
          if(estaLogueado)subirNotaABD([notaEditandoId, notaIndividual]);
        }
      } else {
        const nota = { id: v4(), nota: notaIndividual };
        notas = notas ? [nota, ...notas] : [nota];
        if(estaLogueado)subirNotaABD(nota);
      }

      localStorage.setItem("notas", JSON.stringify(notas));
      setNotas(notas);
    }
  };

  useEffect(() => {
    if (notaEditandoId) {
      let texto = notas.find((objeto) => objeto.id === notaEditandoId);
      textArea().innerHTML = texto.nota;
    }
  }, []);

  return (
    <>
      <Header>
        <div className="contenedorLabels">
          <Link href={'/'} onClick={crearNota} className="label">
            <AiOutlineSave />
          </Link>

          <div className="labelsMenu">
            <label onClick={cerrarModal} className="label">
              <AiOutlineCloud className="svg" />
            </label>

            <label className="label botonTraducir" onClick={cambiarIdioma}>
              <MdGTranslate className="svg" />
            </label>

            <InputArchivo leerArchivoDelInput={(e) => leerArchivo(e)} />
          </div>
          <label
            onClick={(e) =>
              document.querySelector(".labelsMenu").classList.toggle("ver")
            }
            className="label labelVerMenu"
          >
            <AiOutlineBars />
          </label>
          <ApagarLuz />
        </div>
      </Header>

      <main translate="no">
        <div id="IrVentanaFlotante" className="modal">
          <div className="ventana">
            <a onClick={cerrarModal}>X</a>
            <form onSubmit={extraerTexto} autoComplete="false">
              <h2>Url de pagina web</h2>
              <input
                type="url"
                required
                name="urlPagina"
                placeholder="ej: https://www.lightnovelcave.com/"
              />
              <button>Extraer texto</button>
            </form>
          </div>
        </div>

        <div className={"textAreaContainer"}>
          <div
            contentEditable={true}
            spellCheck={false}
            id="contenido-archivo"
            style={{ fontSize: `${1.5}rem` }}
            className={"contenidoArchivo"}
            onClick={(e) => !isPlay && seTclikeado(e.target)} //clickea un parrafo especifico
            translate="yes"
          ></div>
        </div>

        <div className={"botonesContainer"}>
          <input
            onClick={() => (textArea().innerText = "")}
            type="button"
            value={"🗑️"}
            className={"boton-circular clear-button"}
          />
          <button
            onClick={() =>
              pauseReanudar(clikeado, setIsplay, isPlay, seTclikeado)
            }
            type="button"
            className={"botonPlay boton-circular"}
            id="play"
          >
            {isPlay ? <AiOutlinePause />: <AiOutlineCaretRight />}
          </button>
        </div>
        <Script src="/pdfLib/pdf.js" />
      </main>
      <Footer />
    </>
  );
}
