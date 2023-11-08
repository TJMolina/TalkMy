"use client";
import { createContext, useContext, useEffect, useState } from "react";

import {
  recibirNotasExistentes, //de la bd
  eliminarNotaDeBD,
  obtenerNotasLocales, //del local storage
} from "@/services/manejarNotas";

const MainContext = createContext();

export const useMain = () => {
  const context = useContext(MainContext);
  if (!context)
    throw new Error("maincontext must be used within a TasksProvider");
  return context;
};

export const MainProvider = ({ children }) => {
  const [estaLogueado, setLogueado] = useState(false);
  const [notas, setNotas] = useState([]);
  const [notaEditandoId, setNotaId] = useState("");
  const [modoOscuro, setModoOscuro] = useState(false);

  const luzOnOff = ()=>{
    document.querySelector("body").classList.toggle("oscuro");
    setModoOscuro(!modoOscuro);
  }

  const borrarEstaNota = (idBorrar) => {
    document.getElementById(idBorrar)?.classList.add("borrar");
    setTimeout(() => {
      setNotas(notas.filter((nota) => nota.id !== idBorrar));
      eliminarNotaDeBD(idBorrar, estaLogueado);
    }, 198);
  };

  useEffect(() => {
    //Mostrar todas las notas existentes en  la cuenta del usuario al iniciar la pagina
    setNotas(obtenerNotasLocales());
    setLogueado(localStorage.getItem("contraseTalkMyAppUsuario"));
    if (estaLogueado) recibirNotasExistentes(setNotas, notas);
  }, []);

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
        modoOscuro
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
