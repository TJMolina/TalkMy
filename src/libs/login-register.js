export const iniciar = async (e)=>{
    e.preventDefault();
    const datosFormulario = new FormData(e.target);
    const respuestaREcivida = await fetch('https://bdtalkmy.000webhostapp.com/iniciar.php',{
        method: 'POST',
        body: datosFormulario
    });
    const respuestaTraducida = await respuestaREcivida.json();
    if(respuestaTraducida[0]){
        localStorage.setItem('nombreTalkMyAppUsuario', respuestaTraducida[0].nombre);
        localStorage.setItem('contraseTalkMyAppUsuario', respuestaTraducida[0].contrase);
        window.location.href="./";
    }
    else alert('Usuario o contraseña incorrectos.');
    
}
export const registrarse = async (e)=>{
    e.preventDefault();
    const datosFormulario = new FormData(e.target);
    const respuestaREcivida = await fetch('https://bdtalkmy.000webhostapp.com/registrarse.php',{
        method: 'POST',
        body: datosFormulario
    });
    const respuestaTraducida = await respuestaREcivida.text();
    if(respuestaTraducida == ' ok') window.location.href="./";
    else alert('Usuario ya existente.');
}