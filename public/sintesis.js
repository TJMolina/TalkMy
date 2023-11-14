self.addEventListener('message', function(event) {
    var textoRecibido = event.data;
    
    // Sintetizar voz a partir del texto
    var synth = window.speechSynthesis;
    var utterance = new SpeechSynthesisUtterance(textoRecibido);
    synth.speak(utterance);
  });
  