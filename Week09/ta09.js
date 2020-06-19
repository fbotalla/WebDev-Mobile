window.addEventListener('keydown', playSound);

function playSound(event) {
    console.log(event)

    const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
    const boxAudio = document.querySelector(`div[data-key="${event.keyCode}"]`);

    boxAudio.classList.add('playing')

        var pos = 0;
        var id = setInterval(frame, 10);
        function frame() {
            boxAudio.style.top = pos + 'px'; 
            boxAudio.style.left = pos + 'px'; 
        }

    
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();

    setTimeout(function(){
        boxAudio.classList.remove('playing')
    },55)
  }
