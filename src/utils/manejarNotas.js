import { getAuth, onAuthStateChanged } from "firebase/auth";
//   -----------------------------------------------------------------
export const obtenerNotasLocales = () =>
  localStorage.getItem("notas")
    ? JSON.parse(localStorage.getItem("notas"))
    : [];

//   -----------------------------------------------------------------

export const getUID = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return user.uid;
};
//   -----------------------------------------------------------------

export const verifyToken = async () => {
  return await fetch("/api/auth/", { credentials: "include" })
    .then((res) => res.json())
    .catch((e) => {
      console.log(e);
      return false;
    });
};

//   -----------------------------------------------------------------

export const textArea = () => document.getElementById("contenido-archivo");

export const subirNotaABD = async (nota) => {
  try {
    const authentifiqued = await verifyToken()
    if (authentifiqued.isLogged) {
      const user = getUID();
      if (user) {
        const datos = new FormData();
        datos.append("id", nota.id);
        datos.append("texto", nota.nota);
        datos.append("fecha", nota.fecha);
        datos.append("auth-token", user.uid);
        fetch(
          process.env.NEXT_PUBLIC_BASIC_PATH_URL_LOCAL +
            "AcionNotas/subirNota.php",
          {
            method: "POST",
            body: datos,
          }
        )
          .then((res) => res.text())
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      }
    }
  } catch (e) {
    console.log(e);
  }
};

//   -----------------------------------------------------------------

const getNotasBD = async () => {
  const authentifiqued = await verifyToken()
  if (authentifiqued.isLogged) {
    const user = getUID();
    if (user) {
      const datos = new FormData();
      datos.append("auth-token", user);
      return await fetch(
        process.env.NEXT_PUBLIC_BASIC_PATH_URL_LOCAL +
          "AcionNotas/recibirNotas.php",
        {
          method: "POST",
          body: datos,
        }
      )
        .then((res) => res.text())
        .then((res) => {
          return JSON.parse(res);
        })
        .catch((e) => {
          console.log(e);
          return null;
        });
    }
  }
};

const procesarNotasRecibidasBD = (respuesta, notasRecibidas) => {
  if (Array.isArray(respuesta) && respuesta[0]) {
    //si ya existen notas locales, le añado la de la bd
    if (notasRecibidas[0]) {
      let notasAux = notasRecibidas.slice();
      respuesta.forEach((notaBD) => {
        const notaExistente = notasRecibidas.findIndex(
          (notaLocal) => notaLocal.id === notaBD[0]
        );
        //si en el localstorage ya existe una nota, actualizarla
        if (notaExistente > -1) {
          notasAux[notaExistente].nota = notaBD[1];
          notasAux[notaExistente].fecha = notaBD[2];
          notasAux[notaExistente].completada = notaBD[3];
        } else {
          notasAux.push({
            id: notaBD[0],
            nota: notaBD[1],
            fecha: notaBD[2],
            completada: nota[3],
          });
        }
      });

      return notasAux;
    } else {
      return respuesta.map((nota) => ({
        id: nota[0],
        nota: nota[1],
        fecha: nota[2],
        completada: nota[3],
      }));
    }
  }
};

export const recibirNotasExistentes = async (
  setNotas,
  notas
) => {
  try {
    const logueado = await verifyToken();
    if (logueado?.isLogged == false) return;

    const respuesta = await getNotasBD();
    if (!Array.isArray(respuesta)) return;
    const notasFinal = procesarNotasRecibidasBD(respuesta, notas);

    setNotas(notasFinal);
    localStorage.setItem("notas", JSON.stringify(notasFinal));
  } catch (e) {
    console.log(e);
  }
};

//   -----------------------------------------------------------------

export const eliminarNota = (idBorrar, estaLogueado, setNotas) => {
  const notasLocales = obtenerNotasLocales();
  if (notasLocales) {
    const borrado = [...notasLocales.filter((item) => item.id !== idBorrar)];
    localStorage.setItem("notas", JSON.stringify(borrado));
    setNotas(borrado);
  }
  if (!estaLogueado) return;
  const datos = new FormData();
  datos.append("id", idBorrar);
  datos.append("auth-token", localStorage.getItem(getUID()));
  fetch(
    process.env.NEXT_PUBLIC_BASIC_PATH_URL_LOCAL +
      "AcionNotas/eliminarNota.php",
    {
      method: "POST",
      body: datos,
    }
  ).catch((e) => console.log(e));
};

//   -----------------------------------------------------------------

const transformarTextoHtml = (txt) => {
  return txt
    .match(/<(p|li|h1)\b[^<]*(?:(?!<\/\1>)<[^<]*)*<\/\1>/g)
    .map((parrafo) => parrafo.replace(/<[^>]+>/g, ""))
    .filter((part) => part !== "")
    .map((parrafo) => parrafo.replace(/[^.]+[.]{0,3}/g, "<p>$&</p>"))
    .join("<br><br>");
};

//   -----------------------------------------------------------------

export const completarNota = async (nota, fecha) => {
  const isVerified = await verifyToken()
  if(isVerified.isLogged){
    const datos = new FormData();
    datos.append("id", nota.id);
    datos.append("completada", nota.completada);
    datos.append("fecha", fecha);
    datos.append("auth-token", getUID());
    fetch(
      process.env.NEXT_PUBLIC_BASIC_PATH_URL_LOCAL + "AcionNotas/completar.php",
      {
        method: "POST",
        body: datos
      }
    )
      .then((res) => res.text())
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }
};

//   -----------------------------------------------------------------

export const extraerTextoPagina = async (url, setLoaderText) => {
  try {
    setLoaderText("Utilizando fetch...");
    const respuestaFetch = await fetch("/api/webPage/" + url);
    const respuesta = await respuestaFetch.json();
    textArea().innerHTML = transformarTextoHtml(respuesta);
  } catch (e) {
    console.log(e);
  }
};
