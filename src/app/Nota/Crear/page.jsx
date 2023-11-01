"use client";
// librerias
import { useState, useEffect } from "react";
import { v4 } from "uuid";
import { useRouter, useParams } from "next/navigation";
import Script from "next/script";

// mis scripts
import { leerArchivo } from "@/libs/manejarTexto";
import InputArchivo from "@/componentes/inputArchivo";
import { subirNotaABD, extraerTextoPagina } from "@/libs/manejarNotas";
import { pauseReanudar } from "@/libs/reproductor";

// componentes
import Container from "@/componentes/container";
import Header from "@/componentes/header";
import Link from "next/link";
import Footer from "@/componentes/footer";

// iconos
import {
  AiOutlineBars,
  AiOutlineArrowLeft,
  AiOutlineCloud,
  AiOutlineCaretRight,
} from "react-icons/ai";
import { MdGTranslate } from "react-icons/md";

export default function Leer() {
  const [clikeado, seTclikeado] = useState(null);
  const [isPlay, setIsplay] = useState(false);
  const obtenerNotasLocales = () =>
    localStorage.getItem("notas")
      ? JSON.parse(localStorage.getItem("notas"))
      : false;
  const textArea = () => document.getElementById("contenido-archivo");
  const borrarTexto = () => (textArea().innerText = "");
  const router = useRouter();
  const params = useParams();
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
    isPlay && pauseReanudar(clikeado, setIsplay, isPlay, seTclikeado);
    //Si hay contenido en el textarea y si no clickeó el boton crear mas de una vez
    if (!creando && textArea().innerHTML) {
      document
        .querySelector(".parrafoEnfocadoRemarcado")
        ?.classList?.remove("parrafoEnfocadoRemarcado");
      //limpiar un poco el html
      const notaIndividual = textArea().innerHTML.replace(
        /<\/?font[^>]*>/gi,
        ""
      );

      creando = true;
      //Obtener notas locales
      let notas = obtenerNotasLocales();

      let nota = [];
      //si esta editando una nota
      if (params.id) {
        const index = notas.findIndex((item) => item.id === params.id);
        if (index !== -1) {
          notas[index].nota = notaIndividual;
          localStorage.setItem("notas", JSON.stringify(notas));
          subirNotaABD([params.id, notaIndividual]);
        }
      } else {
        nota = { id: v4(), nota: notaIndividual };
        localStorage.setItem(
          "notas",
          JSON.stringify(notas ? [nota, ...notas] : [nota])
        );
        subirNotaABD(nota);
      }
    }
    router.push("/");
  };

  useEffect(() => {
    if (params.id) {
      const notas = obtenerNotasLocales();
      let texto = notas.find((objeto) => objeto.id === params.id);
      if (notas) textArea().innerHTML = texto.nota;
    }
  }, []);

  return (
    <Container>
      <Header>
        <div className="contenedorLabels">
          <Link href="/" onClick={crearNota} className="label">
            <AiOutlineArrowLeft />
          </Link>
          <div className="contenedorLabels labelsMenu">
            <label
              onClick={(e) =>
                e.currentTarget.parentElement.classList.toggle("ver")
              }
              className="label labelVerMenu"
            >
              <AiOutlineBars />
            </label>
            <label onClick={cerrarModal} className="label">
              <AiOutlineCloud className="svg" />
            </label>

            <label className="label botonTraducir" onClick={cambiarIdioma}>
              <MdGTranslate className="svg" />
            </label>
            <InputArchivo leerArchivoDelInput={(e) => leerArchivo(e)} />
          </div>
        </div>
      </Header>

      <main>
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
            onClick={borrarTexto}
            type="button"
            value={"🗑️"}
            className={"clear-button"}
          />
          <button
            onClick={() =>
              pauseReanudar(clikeado, setIsplay, isPlay, seTclikeado)
            }
            type="button"
            className={"botonPlay"}
            id="play"
          >
            {
              isPlay?"┃┃":<AiOutlineCaretRight />
            }
          </button>
        </div>
        {/* <Script src='/traductor.js' /> */}
        <Script src="/pdfLib/pdf.js" />
      </main>
      <Footer />
    </Container>
  );
}
