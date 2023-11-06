//   -----------------------------------------------------------------

export const obtenerNotasLocales = () => localStorage.getItem('notas') ? JSON.parse(localStorage.getItem('notas')) : [];

//   -----------------------------------------------------------------

export const textArea = () => document.getElementById("contenido-archivo");

//   -----------------------------------------------------------------

export const subirNotaABD = async (nota) => {
    const datos = new FormData();
    datos.append('nombre', localStorage.getItem('nombreTalkMyAppUsuario'));
    datos.append('contrase', localStorage.getItem('contraseTalkMyAppUsuario'));
    datos.append('id', nota[0]);
    datos.append('texto', nota[1]);
    fetch('https://bdtalkmy.000webhostapp.com/AcionNotas/subirNota.php', { method: "POST", body: datos })
        .catch(e => console.log(e));
}

//   -----------------------------------------------------------------

export const recibirNotasExistentes = async (setNotas, notas) => {
    let notasRecibidas = notas;
    const datos = new FormData();
    datos.append('nombre', localStorage.getItem('nombreTalkMyAppUsuario'));
    datos.append('contrase', localStorage.getItem('contraseTalkMyAppUsuario'));
    try {
        const respuesta = await fetch('https://bdtalkmy.000webhostapp.com/AcionNotas/recibirNotas.php', { method: "POST", body: datos });
        const respuestaTraducida = await respuesta.json();
        if (notasRecibidas.length > 0) {
            respuestaTraducida.forEach(nota => {
                if (!notasRecibidas.some(arrX => arrX[0] === nota[0])) notasRecibidas.push(nota);
            });
        } else if (Array.isArray(respuestaTraducida[0])) notasRecibidas.push(...respuestaTraducida);
        setNotas(notasRecibidas);
    }
    catch (e) {
        console.log(e);
    }
};

//   -----------------------------------------------------------------

export const eliminarNotaDeBD = async (idBorrar, estaLogueado) => {
    const notasLocales = obtenerNotasLocales();
    if (notasLocales) {
        localStorage.setItem('notas', JSON.stringify([...notasLocales.filter(item => item.id !== idBorrar)]));
    }
    if(!estaLogueado) return;
    const datos = new FormData();
    datos.append('nombre', localStorage.getItem('nombreTalkMyAppUsuario'));
    datos.append('contrase', localStorage.getItem('contraseTalkMyAppUsuario'));
    datos.append('id', idBorrar);
    fetch('https://bdtalkmy.000webhostapp.com/AcionNotas/eliminarNota.php', { method: "POST", body: datos })
        .catch(e => console.log(e));
}


//   -----------------------------------------------------------------

export const extraerTextoPagina = async (url) => {
    const transformarTextoHtml = (txt) => {
        return txt
            .match(/<p\b[^<]*(?:(?!<\/p>)<[^<]*)*<\/p>|<li\b[^<]*(?:(?!<\/li>)<[^<]*)*<\/li>|<h1\b[^<]*(?:(?!<\/h1>)<[^<]*)*<\/h1>/g)
            .map(parrafo => {
                parrafo = parrafo.replace(/(<([^>]+)>)/ig, '').match(/[^.]+[.]{0,1}/g);
                return Array.isArray(parrafo) && parrafo.length > 1 ? parrafo.map(e => `<p>${e}</p>`).join('') : `<p>${parrafo}</p>`;
            })
            .join('<br><br>');
    }
    try {
        const respuestaFetch = await fetch('/api/webPage/'+url);
        const respuesta = await respuestaFetch.json();
        if(!respuesta){
            throw new Error('no funciono la primera opcion');
        }
        else{
            textArea().innerHTML = transformarTextoHtml(respuesta);
        }
    }
    catch{
        try {
            console.log('se requirisio usar php.');
            const urlBuscar = new FormData();
            urlBuscar.append('url', url);
            const respuestaFetchPHP = await fetch('https://bdtalkmy.000webhostapp.com/AcionNotas/extraerTextoPagina.php', { method: "POST", body: urlBuscar });
            const respuestaPHP = await respuestaFetch.json();
            textArea().innerHTML = transformarTextoHtml(respuestaFetchPHP);
        } catch (error) {
            textArea().innerHTML = "<mark>Hubo algun error</mark>"
            console.log(e);
        }
    }
}