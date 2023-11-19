//   -----------------------------------------------------------------


export const obtenerNotasLocales = () => localStorage.getItem('notas') ? JSON.parse(localStorage.getItem('notas')) : [];

//   -----------------------------------------------------------------

export const textArea = () => document.getElementById("contenido-archivo");

//   -----------------------------------------------------------------

export const subirNotaABD = async (nota) => {
    const datos = new FormData();
    datos.append('nombre', localStorage.getItem('nombreTalkMyAppUsuario'));
    datos.append('contrase', localStorage.getItem('contraseTalkMyAppUsuario'));
    datos.append('id', nota.id);
    datos.append('texto', nota.nota);
    datos.append('fecha', nota.fecha);
    fetch('https://bdtalkmy.000webhostapp.com/AcionNotas/subirNota.php', { method: "POST", body: datos })
    .then(res => res.text())
    .then(
        res => console.log(res)
    )
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

        if (Array.isArray(respuestaTraducida) && respuestaTraducida[0])
        {
            //si ya existen notas locales, le añado la de la bd
            if (notasRecibidas[0]) {
                respuestaTraducida.forEach(nota => {
                    let notasRecibidasAUX = notasRecibidas.map(arrX => arrX.id === nota[0]? {id: arrX.id, nota: nota[1], fecha: nota[2]} : arrX);
                    notasRecibidas = notasRecibidasAUX.slice();
                });
            }
            else{
                respuestaTraducida.forEach(nota => notasRecibidas.push({id: nota[0], nota: nota[1], fecha: nota[2]}));
            }
        }
        setNotas(notasRecibidas);
        localStorage.setItem("notas", JSON.stringify(notasRecibidas));
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
    if (!estaLogueado) return;
    const datos = new FormData();
    datos.append('nombre', localStorage.getItem('nombreTalkMyAppUsuario'));
    datos.append('contrase', localStorage.getItem('contraseTalkMyAppUsuario'));
    datos.append('id', idBorrar);
    fetch('https://bdtalkmy.000webhostapp.com/AcionNotas/eliminarNota.php', { method: "POST", body: datos })
        .catch(e => console.log(e));
}


//   -----------------------------------------------------------------

const transformarTextoHtml = (txt) => {
    return txt.replace(/(\w+)="[^"]*"/g, '').replace(/<p><\/p>/g, '')
        .match(/<p\b[^<]*(?:(?!<\/p>)<[^<]*)*<\/p>|<li\b[^<]*(?:(?!<\/li>)<[^<]*)*<\/li>|<h1\b[^<]*(?:(?!<\/h1>)<[^<]*)*<\/h1>/g)
        .map(parrafo => {
            parrafo = parrafo.replace(/<([^>])+>/g, '').match(/[^.]+[.]{0,1}/g);
            return Array.isArray(parrafo) && parrafo.length > 1 ? parrafo.map(e => `<p>${e}</p>`).join('') : `<p>${parrafo}</p>`;
        })
        .join('<br><br>');
}

//   -----------------------------------------------------------------

const extraerTextoPagina_op2 = async (url,setLoaderText)=>{
    try {
        setLoaderText('Usando php....');
        const urlBuscar = new FormData();
        urlBuscar.append('url', url);
        const respuestaFetchPHP = await fetch('https://bdtalkmy.000webhostapp.com/AcionNotas/extraerTextoPagina.php', { method: "POST", body: urlBuscar });
        const respuestaPHP = await respuestaFetchPHP.text();
        textArea().innerHTML = transformarTextoHtml(respuestaPHP);
    } catch (e) {
        textArea().innerHTML = "<mark>Hubo algun error</mark>"
        console.log(e);
    }

}

export const extraerTextoPagina = async (url,setLoaderText) => {
    try {
        setLoaderText('Utilizando fetch...');
        const respuestaFetch = await fetch('/api/webPage/' + url);
        const respuesta = await respuestaFetch.json();
    
        if (!respuesta) {
            setLoaderText('No funciono la primera opcion...');
            throw new Error('No funciono la primera opcion');
        }
        textArea().innerHTML = transformarTextoHtml(respuesta);
    }
    catch {
        extraerTextoPagina_op2(url,setLoaderText);
    }
}