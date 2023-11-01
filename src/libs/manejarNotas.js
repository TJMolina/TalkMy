'use client';
export const obtenerNotasLocales = () => localStorage.getItem('notas') ? JSON.parse(localStorage.getItem('notas')) : [];

//   -----------------------------------------------------------------

export const subirNotaABD = async (nota) => {

    const datos = new FormData();
    datos.append('nombre', localStorage.getItem('nombreTalkMyAppUsuario'));
    datos.append('contrase', localStorage.getItem('contraseTalkMyAppUsuario'));
    datos.append('id', nota[0]);
    datos.append('texto', nota[1]);

    fetch('https://bdtalkmy.000webhostapp.com/AcionNotas/subirNota.php', {
        method: "POST",
        body: datos
    })
        .catch(e => {
            console.log(e);
        });
}

//   -----------------------------------------------------------------

export const recibirNotasExistentes = async (setNotas) => {
    let arrayAux = obtenerNotasLocales();
    const datos = new FormData();
    datos.append('nombre', localStorage.getItem('nombreTalkMyAppUsuario'));
    datos.append('contrase', localStorage.getItem('contraseTalkMyAppUsuario'));
    try {
        const respuesta = await fetch('https://bdtalkmy.000webhostapp.com/AcionNotas/recibirNotas.php', {
            method: "POST",
            body: datos
        });
        const respuestaTraducida = await respuesta.json();
        if (arrayAux.length > 0) {
            respuestaTraducida.forEach(nota => {
                if (!arrayAux.some(arrX => arrX[0] === nota[0])) arrayAux.push(nota);
            });
        } else if (Array.isArray(respuestaTraducida[0])) {
            arrayAux.push(...respuestaTraducida);
        }
        setNotas(arrayAux);
    }
    catch (e) {
        console.log(e);
    }
};

//   -----------------------------------------------------------------

export const eliminarNotaDeBD = async (nota) => {
    let notasLocales = obtenerNotasLocales();
    if (notasLocales) {
        localStorage.setItem('notas', JSON.stringify([...notasLocales.filter(item => item.id !== nota)]));
    }
    const datos = new FormData();
    datos.append('nombre', localStorage.getItem('nombreTalkMyAppUsuario'));
    datos.append('contrase', localStorage.getItem('contraseTalkMyAppUsuario'));
    datos.append('id', nota);
    fetch('https://bdtalkmy.000webhostapp.com/AcionNotas/eliminarNota.php', {
        method: "POST",
        body: datos
    })
    .catch((e) => {
        console.log(e);
    });
}

//   -----------------------------------------------------------------

export const extraerTextoPagina = async (url) => {
    const urlBuscar = new FormData();
    urlBuscar.append('url', url);
    fetch(`../api/webPage/${url}`)
    .then(e => e.json())
    .then(({data}) => {
        let texto = data
            .match(/<p\b[^<]*(?:(?!<\/p>)<[^<]*)*<\/p>|<li\b[^<]*(?:(?!<\/li>)<[^<]*)*<\/li>|<h1\b[^<]*(?:(?!<\/h1>)<[^<]*)*<\/h1>/g)
            .map(parrafo => {
                parrafo = parrafo.replace(/(<([^>]+)>)/ig, '').match(/[^.]+[.]{0,1}/g);
                console.log(parrafo);
                return Array.isArray(parrafo) && parrafo.length > 1 ? parrafo.map(e => `<p>${e})</p>`).join('') : `<p>${e}</p>`
            }
            ).join('<br><br>');
        document.getElementById("contenido-archivo").innerHTML = texto;
    })
    .catch(e => {
        console.log(e)
        document.getElementById("contenido-archivo").innerText = "Hubo algun error. Podria ser por un bloqueador en la pagina o mala conexion.";
    });
}