"use client";
//librerias de react
import { createContext, useContext, useEffect, useState } from "react";
import moment from "moment";

//mis funciones
import {
  eliminarNota,
  recibirNotasExistentes,
} from "@/services/manejarNotas";
import { obtenerNotasLocales } from "@/services/manejarNotas";

//----------------------------------------------------------------------------------

//crear contexto
const MainContext = createContext();

//----------------------------------------------------------------------------------

//funcion para usar el contexto y sus funciones y variables
export const useMain = () => {
  const context = useContext(MainContext);
  if (!context)
    throw new Error("maincontext must be used within a TasksProvider");
  return context;
};

//----------------------------------------------------------------------------------

//funcion principal del contexto
export const MainProvider = ({ children }) => {
  //para verificar si esta logueado o no
  const [estaLogueado, setLogueado] = useState(false);
  //almacenara todas las notas ya sea locales o de la bd
  const [notas, setNotas] = useState([]);
  //almacenara el id si una nota se está editando
  const [notaEditandoId, setNotaId] = useState("");
  //interrupto del modo oscuro
  const [modoOscuro, setModoOscuro] = useState(false);
  //deberia existir un menu de opciones que me permita modificar esta configuracion. es para determinar si leer todas las notas o solo la seleccionada.
  const [seguirLeyendo, setSeguirLeyendo] = useState(true);
  //Textos que apareceran en los loader
  const [loaderText, setLoaderText] = useState("");

  //----------------------------------------------------------------------------------
  //funcion de interruptor de modo oscuro
  const luzOnOff = () => {
    document.querySelector("body").classList.toggle("oscuro");
    setModoOscuro(!modoOscuro);
  };

  //----------------------------------------------------------------------------------
  //funcion que en el index te permite eliminar una nota
  const borrarEstaNota = (idBorrar) => {
    //darle una animacion y estilo al borrar
    document.getElementById(idBorrar)?.classList.add("borrar");

    //despues de darle tienpo a verse a la animacion de borrar, borrar definitivamente la nota
    setTimeout(() => {
      //borrar la nota de la lista en este contexto
      //setNotas(notas.filter((nota) => nota.id !== idBorrar));

      //borrar la nota del almacenamiento, esta funcion la borra tando de la bd como del localstorage
      eliminarNota(idBorrar, estaLogueado, setNotas);
    }, 200);
  };

  //----------------------------------------------------------------------------------
  //se ejecutara al renderizar el index
  useEffect(() => {
    setNotas(obtenerNotasLocales())
    recibirNotasExistentes(setNotas, obtenerNotasLocales, setLogueado);
  }, []);

  //----------------------------------------------------------------------------------

  return (
    <MainContext.Provider
      value={{
        notas,
        setNotas,
        estaLogueado,
        borrarEstaNota,
        notaEditandoId,
        setNotaId,
        luzOnOff,
        modoOscuro,
        seguirLeyendo,
        loaderText,
        setLoaderText,
        moment,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
