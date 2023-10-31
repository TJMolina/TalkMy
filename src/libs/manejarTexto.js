export async function leerArchivo(e) {
  const archivo = e.target.files[0];
  e.target.value = '';
  if (!archivo) return;
  const extension = archivo.name.split('.').pop().toLowerCase();
  const texto = extension === 'pdf' ? await mostrarPDF(archivo) : await archivo.text();
  document.getElementById('contenido-archivo').innerHTML = obtenerParrafos(texto);
}

// ----------------------------------


//leer todos los datos del pdf
export async function mostrarPDF(archivo) {
  const pdf = await pdfjsLib.getDocument(URL.createObjectURL(archivo)).promise;
  let contenido = '';
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const content = await (await pdf.getPage(pageNum)).getTextContent();
    contenido += content.items.map(item => item.str).join('');
  }
  return contenido;
}

// ----------------------------------

//transformar cada parrafo para que sus oraciones esten dentro de etiquetas <p>, para crear notas
export const obtenerParrafos = (txt) => {
  try{
    return txt
      .replace(/ +/g, '')
      .replace(/(<([^>]+)>)/ig, '')
      .split(/(?<=\.)(?=[A-Z])|(?<=\.)\s{2,}|(?<=\.)\n/)
      .map((parrafo) =>
        parrafo
          .match(/[^.]+[.]{0,1}/g)
          .map((oracion) => `<p>${oracion} </p>`)
          .join('')
      )
      .join('<br><br>');

  }catch{
    return 'Hubo un problema.'
  }
}


