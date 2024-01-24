//   -----------------------------------------------------------------

export const obtenerNotasLocales = () =>
  localStorage.getItem("notas")
    ? JSON.parse(localStorage.getItem("notas"))
    : [];

//   -----------------------------------------------------------------

export const textArea = () => document.getElementById("contenido-archivo");

//   -----------------------------------------------------------------

export const subirNotaABD = async (nota) => {
  const datos = new FormData();
  datos.append("id", nota.id);
  datos.append("texto", nota.nota);
  datos.append("fecha", nota.fecha);
  fetch(
    process.env.NEXT_PUBLIC_BASIC_PATH_URL_LOCAL + "AcionNotas/subirNota.php",
    {
      method: "POST",
      credentials: "include",
      body: datos,
    }
  )
    .then((res) => res.text())
    .then((res) => console.log(res))
    .catch((e) => console.log(e));
};

//   -----------------------------------------------------------------

const verifyToken = async () => {
  return await fetch("/api/auth/", { credentials: "include" })
    .then((res) => res.json())
    .catch((e) => {
      console.log(e);
      return false;
    });
};

//   -----------------------------------------------------------------

const getNotasBD = async () => {
  return await fetch(
    process.env.NEXT_PUBLIC_BASIC_PATH_URL_LOCAL +
      "AcionNotas/recibirNotas.php",
    {
      credentials: "include"
    }
  )
    .then(res => res.text())
    .then(res => {
        console.log(res)
        return null
    })
    .catch((e) => {
      console.log(e);
      return null;
    });
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

      notasRecibidas = notasAux;
    } else {
      notasRecibidas = respuesta.map((nota) => ({
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
  notasRecibidas,
  setLogueado
) => {
  try {
    const logueado = await verifyToken();
    if (logueado?.isLogged == false) return;
    setLogueado(true);

    const respuesta = await getNotasBD();
    if(!Array.isArray(respuesta)) return

    const notasFinal = procesarNotasRecibidasBD(respuesta, notasRecibidas);

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
  fetch(
    process.env.NEXT_PUBLIC_BASIC_PATH_URL_LOCAL +
      "AcionNotas/eliminarNota.php",
    {
      method: "POST",
      credentials: "include",
      body: datos,
    }
  ).catch((e) => console.log(e));
};

//   -----------------------------------------------------------------

const transformarTextoHtml = (txt) => {
    return txt
      .match(/<(p|li|h1)\b[^<]*(?:(?!<\/\1>)<[^<]*)*<\/\1>/g)
      .map(parrafo => parrafo.replace(/<[^>]+>/g, ''))
      .filter(part => part !== '')
      .map(parrafo => parrafo.replace(/[^.]+[.]{0,3}/g, '<p>$&</p>'))
      .join('<br><br>');
  }
  

//   -----------------------------------------------------------------

export const completarNota = (nota, fecha) => {
  const datos = new FormData();
  datos.append("id", nota.id);
  datos.append("completada", nota.completada);
  datos.append("fecha", fecha);
  fetch(process.env.NEXT_PUBLIC_BASIC_PATH_URL_LOCAL+"AcionNotas/completar.php", {
    method: "POST",
    credentials: "include",
    body: datos,
  })
    .then((res) => res.text())
    .then((res) => console.log(res))
    .catch((e) => console.log(e));
};

//   -----------------------------------------------------------------

const extraerTextoPagina_op2 = async (url) => {
  try {
    console.log("Se requirio usar php...");
    const urlBuscar = new FormData();
    urlBuscar.append("url", url);
    const respuestaFetchPHP = await fetch(
      "https://bdtalkmy.000webhostapp.com/AcionNotas/extraerTextoPagina.php",
      { method: "POST", body: urlBuscar }
    );
    const respuestaPHP = await respuestaFetchPHP.text();
    textArea().innerHTML = transformarTextoHtml(respuestaPHP);
  } catch (e) {
    textArea().innerHTML = "<mark>Hubo algun error</mark>";
    console.log(e);
  }
};

export const extraerTextoPagina = async (url, setLoaderText) => {
  try {
    setLoaderText("Utilizando fetch...");
    const respuestaFetch = await fetch("/api/webPage/" + url);
    const respuesta = await respuestaFetch.json();

    if (!respuesta) {
      setLoaderText("No funciono la primera opcion...");
      throw new Error("No funciono la primera opcion");
    }
    textArea().innerHTML = transformarTextoHtml(respuesta);
  } catch {
    setLoaderText("Usando php....");
    await extraerTextoPagina_op2(url, setLoaderText);
  }
};
