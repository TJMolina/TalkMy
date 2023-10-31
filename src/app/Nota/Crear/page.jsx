'use client'
import { useState, useEffect } from "react";
import { v4 } from "uuid";
import { leerArchivo } from "@/libs/manejarTexto";
import { pauseReanudar } from "@/libs/reproductor";
import InputArchivo from "@/componentes/inputArchivo";
import { subirNotaABD, extraerTextoPagina } from "@/libs/manejarNotas";
import { useRouter, useParams } from "next/navigation";
import Script from "next/script";
import Container from "@/componentes/container";

export default function Leer() {
  const [clikeado, seTclikeado] = useState(null);
  const [isPlay, setIsplay] = useState(false);
  const obtenerNotasLocales = () => localStorage.getItem("notas") ? JSON.parse(localStorage.getItem("notas")) : false;
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

  const cerrarModal = () => document.getElementById("IrVentanaFlotante").classList.toggle("ver");

  const cambiarIdioma = () => document.querySelector("#google_translate_element > div a")?.click();

  const crearNota = () => {
    isPlay && pauseReanudar(clikeado, setIsplay, isPlay, seTclikeado);
    //Si hay contenido en el textarea y si no clickeó el boton crear mas de una vez
    if (!creando && textArea().innerHTML) {
      document.querySelector('.parrafoEnfocadoRemarcado')?.classList?.remove('parrafoEnfocadoRemarcado');
      //limpiar un poco el html
      const notaIndividual = textArea().innerHTML.replace(/<\/?font[^>]*>/ig, '');

      creando = true;
      //Obtener notas locales
      let notas = obtenerNotasLocales();

      let nota = [];
      //si esta editando una nota
      if (params.id) {
        const index = notas.findIndex(item => item.id === params.id);
        console.log(index)
        if (index !== -1) {
          notas[index].nota = notaIndividual;
          localStorage.setItem("notas", JSON.stringify(notas));
          subirNotaABD([params.id, notaIndividual]);
        }
      }
      else {
        nota = { id: v4(), nota: notaIndividual };
        localStorage.setItem("notas", JSON.stringify(notas ? [nota, ...notas] : [nota]));
        subirNotaABD(nota);
      }
    }
    router.push("/");
  };

  useEffect(() => {
    if (params.id) {
      const notas = obtenerNotasLocales();
      let texto = notas.find(objeto => objeto.id === params.id);
      if (notas) textArea().innerHTML = texto.nota;
    }
  }, []);

  return (
    <Container>
      <header className="header">
        <h1>TalkMy!</h1>
        <div className="contenedorLabels">
          <label onClick={crearNota} className="label">
            ↖️
          </label>
          <div className="contenedorLabels labelsMenu">
            <label onClick={(e) => e.target.parentElement.classList.toggle('ver')} className="label labelVerMenu">
              :
            </label>
            <label onClick={cerrarModal} className="label">
              🌐
            </label>
            <label className="label botonTraducir" onClick={cambiarIdioma}
            >
              🈳
            </label>
            <InputArchivo leerArchivoDelInput={(e) => leerArchivo(e)} />
          </div>
        </div>
      </header>

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
            onClick={(e) => !isPlay && seTclikeado(e.target)}//clickea un parrafo especifico
            translate="yes">
          </div>
        </div>

        <div className={"botonesContainer"}>
          <input
            onClick={borrarTexto}
            type="button"
            value={"🗑️"}
            className={"clear-button"}
          />
          <input
            onClick={() => pauseReanudar(clikeado, setIsplay, isPlay, seTclikeado)}
            type="button"
            value={isPlay ? "┃┃" : "▶"}
            className={"botonPlay"}
            id="play"
          />
        </div>
        {/* <Script src='/traductor.js' /> */}
        <Script src={`/pdfLib/pdf.js`} />

      </main>
    </Container>
  );
}
