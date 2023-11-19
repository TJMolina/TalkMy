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
import { Loader } from "rsuite";

//------------------------------------------------------------

export default function Leer() {
  const [clikeado, seTclikeado] = useState(null);
  const [isPlay, setIsplay] = useState(false);
  //obtener estas variables y funciones del contexto con useMain
  const {
    notas, setNotas,
    notaEditandoId, setNotaId,
    estaLogueado,
    seguirLeyendo,
    loaderText, setLoaderText,
    moment
  } = useMain();

  //una lista auxiliar ordenada de todas las notas que existen
  const [notasSiguientes, setNotasSiguientes] = useState();
  //para evitar que cree la misma nota mas de una vez
  let creando = false;

  //------------------------------------------------------------

  //para extraer texto de una pagina
  const extraerTexto = async(e) => {
    //detener evento del formulario
    e.preventDefault();
    //evio la url a esta funcion que modificara el textarea
    await extraerTextoPagina(e.target.urlPagina.value, setLoaderText);
    //cierro la ventana flotante
    cerrarModal();
    setLoaderText(false);
  };

  //------------------------------------------------------------
  //altero la lista auxiliar de las notas para lanzar el evento useEffecto correspondiente mas abajo en el codigo. Borro el primer elemento.
  const leerSiguiente = () => {
    //array auxiliar que devolvera el mismo array pero sin el primer elemento. Esto porque notasSiguientes es una constante.
    let aux = notasSiguientes.slice();
    aux.shift();
    setNotasSiguientes(aux);
  };

  //------------------------------------------------------------

  const cerrarModal = () =>
    document.getElementById("IrVentanaFlotante").classList.toggle("ver");

  //------------------------------------------------------------

  const cambiarIdioma = () =>
    document.querySelector("#google_translate_element > div a")?.click();

  //------------------------------------------------------------

  //limpiar etiquetas y acomodar todo para un correcto funcionamiento
  const limpiarTexto = (txt) => {
    return txt
      .split(/\n{3,}/)
      .map((parrafo) =>
        parrafo
          .match(/[^.]+[.]{0,1}/g)
          .map((oracion) => `<p>${oracion} </p>`)
          .join("")
      )
      .join("<br><br>");
  };

  //------------------------------------------------------------

  const crearNota = () => {
    //si el boton esta en play, pausarlo y detener la lectura.
    if (isPlay) pauseReanudar(clikeado, setIsplay, isPlay, seTclikeado);

    //si no está ya en el proceso de crear y el textarea tiene contenido
    if (!creando && textArea().innerText.trim()) {
      //desenmarco un parrafo en caso de que siga marcado.
      document
        .querySelector(".parrafoEnfocadoRemarcado")
        ?.classList?.remove("parrafoEnfocadoRemarcado");

      //borro todas las etiquetas font creadas por el traductor de google.
      // const notaIndividual = textArea().innerHTML.replace(
      //   /<\/?font[^>]*>/gi,
      //   ""
      // );
      const notaIndividual = textArea().innerText.replace(/\n{3,}/gi, "\n\n\n");

      //inicio el proceso de crear
      creando = true;

      //una variable auxiliar que almacena todas las notas, esta la voy a modificar y por ello no utilizo las que ya tengo.
      let notas = obtenerNotasLocales();
      const fechaActual = moment();
      //si esta editando una nota, el proceso es otro
      if (notaEditandoId) {
        //obtengo el indice de esta nota, para editarla
        const index = notas.findIndex((item) => item.id === notaEditandoId);

        //si encontro a la nota
        if (index !== -1) {
          //edito la nota dentro del array de notas
          notas[index].nota = notaIndividual;
          //si esta logueado, subo esta nota a la bd
          if (estaLogueado)
            subirNotaABD({ id: notaEditandoId, nota: notaIndividual, fecha: fechaActual.format('YYYY-MM-DD HH:mm:ss') });
        }
      }
      //si no esta editando una nota
      else {
        //creo una nota con un id aleatorio y con el atributo nota que contiene todo el texto
        const nota = { id: v4(), nota: notaIndividual, fecha: fechaActual.format('YYYY-MM-DD HH:mm:ss') };
        //si ya existen notas en el array de notas, incluir esta al inicio del array, sino agregarla individualmente
        notas = notas ? [nota, ...notas] : [nota];
        //si esta logueado, subo esta nota a la bd
        if (estaLogueado) subirNotaABD(nota);
      }

      //subo el array de notas al localstorage
      localStorage.setItem("notas", JSON.stringify(notas));

      //actualizo el array principal de notas, este es del contexto principal
      setNotas(notas);
    }
  };

  //------------------------------------------------------------
  //se ejecuta despues de pausereanudar o se usa directamente cuando la lectura automatica de todas las notas esta encendida
  const play = async () => {
    //le paso los elementos hmtl para leer su texto con la sintesis de voz
    const leerTexto = async (txt) => {
      return new Promise((resolve) => {
        const utterance = new SpeechSynthesisUtterance(txt.innerText);
        //cuando inicia a hablar
        utterance.onstart = () => {
          //desenmarco parrafos ya marcados
          textArea()
            .querySelector(".parrafoEnfocadoRemarcado")
            ?.classList.remove("parrafoEnfocadoRemarcado");
          //resalto el elemento
          txt.classList.add("parrafoEnfocadoRemarcado");

          //remarco el elemento actual como clikeado en caso de que de pausa y reanudar
          seTclikeado(txt);

          //mantengo enfocado el elemento leido
          txt.scrollIntoView({ behavior: "smooth", block: "center" });
        };

        //al finalizar de leer este elemento
        utterance.onend = () => {
          txt.classList.remove("parrafoEnfocadoRemarcado");
          //cuando ya leyo todos los elementos
          if (speechSynthesis.speaking == false) {
            //desclikeo el ultimo elemento
            seTclikeado(false);
            //paso a la siguiente nota
            leerSiguiente();
          }
          //terminar la promesa de este elemento
          resolve();
        };

        //hablar
        speechSynthesis.speak(utterance);
      });
    };

    //almacenara todos los parrafos
    let parrafos;

    //todo el textarea visible
    let texto = textArea();

    //si clickeo la etiqueta font que genera el traductor de google, lo enfoco en el parrafo principal
    if (clikeado?.tagName == "FONT") {
      seTclikeado(clikeado.parentNode.parentNode);
    }
    //si no clickeo nada, si clickeo todo el contenedor
    if (!clikeado || clikeado == texto) {
      //si escribimos a mano, el primer parrafo nunca tiene etiqueta, asi que lo agrego
      if (!texto.innerHTML.match(/^<[^>]+>/)) {
        texto.innerHTML = texto.innerHTML.replace(/^[^<]+/, "<div>$&</div>");
        texto = textArea();
      }
      //devuelvo un array de todos los elementos dentro del contenedor
      parrafos = Array.from(texto.querySelectorAll("#contenido-archivo > *"));

      //caso contrario, clickeó un parrafo
    } else {
      //devuelvo un array de todos los elementos que le siguen al que clikee
      let elementosSiguientes = [];
      parrafos = clikeado;
      while (parrafos) {
        elementosSiguientes.push(parrafos);
        parrafos = parrafos.nextElementSibling;
      }
      parrafos = elementosSiguientes;
    }

    //si el array tiene mas de un texto, transformar todos en una promesa
    parrafos.length > 1
      ? await Promise.all(parrafos.filter((p) => p.innerText && leerTexto(p)))
      : //caso contrario, leer ese directamente
        leerTexto(parrafos[0]);
  };

  //------------------------------------------------------------

  //ejecutado por el boton de play
  const pauseReanudar = () => {
    //si la sintesis no esta hablando y el boton no esta en play, resumen
    if (speechSynthesis.paused && !isPlay) speechSynthesis.resume();
    //si la sintesis esta hablando y el boton esta en play, pausa
    else if (speechSynthesis.speaking && isPlay) speechSynthesis.cancel();
    //si no esta hablando y el boton esta en play, leer
    else {
      //si el textarea esta vacio, no hacer nada
      if (textArea().innerText.trim().length < 1) return;
      //caso contrario, leer
      play();
    }
    //cambiar el estado del boton, play o pause
    setIsplay(!isPlay);
  };

  //------------------------------------------------------------

  //hacer esto cuando se detecte que quieren leer la siguiente nota
  useEffect(() => {
    //si la configuracion dice que lea la siguiente nota, si esta en play el boton y si hay notas mas adelante.
    if (seguirLeyendo && isPlay && notasSiguientes.length > 0) {
      //especificar que nota se esta leyendo actualmente en caso de que la edite
      setNotaId(notasSiguientes[0].id);
      //cambiar el texto del textarea por el de la nota actual
      textArea().innerHTML = limpiarTexto(notasSiguientes[0].nota);
      //darle a leer, es asi para evitar ciertos bugs como el no reconocer el texto del textarea
      setTimeout(() => {
        play();
      }, 20);
    }
    //caso contrario, volver a valores predeterminados
    else {
      seTclikeado(false);
      setIsplay(false);
    }
  }, [notasSiguientes]);

  //hacer esto al rendereizar la pagina
  useEffect(() => {
    //si detecta que esta editando una nota
    if (notaEditandoId) {
      //hago un array auxiliar de las notas para modificarlo
      let aux = notas.slice().reverse();
      //obtengo el indice de la nota siendo editada dentro del array auxiliar que contiene todas las notas ordenadas
      const indice = aux.findIndex((n) => n.id === notaEditandoId);

      //borro todas las notas detras de la nota que voy a editar, para obtener todas las siguientes
      aux.splice(0, indice);

      // cambio el texto del textarea por el de la nota siendo editada
      textArea().innerHTML = limpiarTexto(aux[0].nota);

      //actualizo el array que almacenara todas las notas que le sigan a la que estoy editando
      setNotasSiguientes(aux);

      //si no esta editando una nota, limpio el textarea del texto conservado de notas anteriores
    } else {
      textArea().innerHTML = "";
    }
  }, []);

  //------------------------------------------------------------

  return (
    <>
      <Header>
        <div className="contenedorLabels">
          <Link href={"/"} onClick={crearNota} className="label">
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

      <main>
        <div id="IrVentanaFlotante" className="modal">
          <div className="ventana">
            <a onClick={cerrarModal}>X</a>
            <form onSubmit={extraerTexto} autoComplete="false">
              <h4>Url de pagina web</h4>
              <input
                type="url"
                required
                name="urlPagina"
                placeholder="ej: https://www.lightnovelcave.com/"
              />
              <button>Extraer texto</button>
              {loaderText && <Loader content={loaderText} />}
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
            onClick={(e) => {
              if (!isPlay) {
                seTclikeado(e.target);
              }
            }} //clickea un parrafo especifico
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
            onClick={pauseReanudar}
            type="button"
            className={"botonPlay boton-circular"}
            id="play"
          >
            {isPlay ? <AiOutlinePause /> : <AiOutlineCaretRight />}
          </button>
        </div>
        <Script src="/pdfLib/pdf.js" />
      </main>
      <Footer />
    </>
  );
}
