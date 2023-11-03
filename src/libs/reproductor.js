//play nota de texto
export async function play(texto, parrafoClikeado, setIsplay, seTclikeado) {
    const leerTexto = async (txt) => {
        return new Promise(resolve => {
            const utterance = new SpeechSynthesisUtterance(txt.innerText);
            utterance.onstart = () => {
                document.querySelector('.parrafoEnfocadoRemarcado')?.classList.remove('parrafoEnfocadoRemarcado');
                txt.classList.add('parrafoEnfocadoRemarcado');
                seTclikeado(txt);
                txt.scrollIntoView({ behavior: 'smooth', block: 'center' });
            };
            utterance.onend = () => {
                if (speechSynthesis.speaking === false) {
                    seTclikeado(false);
                    setIsplay(false);
                }
                txt.classList.remove('parrafoEnfocadoRemarcado');
                resolve();
            };
            speechSynthesis.speak(utterance);
        });
    };

    let parrafos;
    if (parrafoClikeado?.tagName == 'FONT') parrafoClikeado = parrafoClikeado.parentNode.parentNode;

    //si no clickeo nada, si clickeo todo el contenedor o si clickeo el contenedor denuevo por las dudas
    if (!parrafoClikeado || parrafoClikeado.querySelector('p') || parrafoClikeado == texto) {
        //si escribimos a mano, el primer parrafo nunca tiene etiqueta, asi que lo agrego
        if (!texto.innerHTML.match(/^<[^>]+>/)) {
            texto.innerHTML = texto.innerHTML.replace(/^[^<]+/, '<div>$&</div>');
            texto = document.getElementById('contenido-archivo');
        }
        //devuelvo un array de todos los elementos dentro del contenedor
        parrafos = Array.from(texto.querySelectorAll('#contenido-archivo > *'));
    }
    else {
        //devuelvo un array de todos los elementos que le siguen al que clikee
        let elementosSiguientes = [];
        parrafos = parrafoClikeado;
        while (parrafos) {
            elementosSiguientes.push(parrafos);
            parrafos = parrafos.nextElementSibling;
        }
        parrafos = elementosSiguientes;
    }
    //si el array tiene mas de un texto
    parrafos.length > 1 ?
        await Promise.all(parrafos.filter(p => p.innerText && leerTexto(p))) : leerTexto(parrafos[0]);

}

// -------------------------------------------------------------------

export function pauseReanudar(clickeado, setIsplay, isPlay, seTclikeado) {
    if (speechSynthesis.paused && !isPlay) speechSynthesis.resume();
    else if (speechSynthesis.speaking && isPlay) speechSynthesis.cancel();
    else {
        const textarea = document.getElementById('contenido-archivo');
        if (textarea.innerText.trim().length < 1) return;
        play(textarea, clickeado, setIsplay, seTclikeado);
    }
    setIsplay(!isPlay);
}
