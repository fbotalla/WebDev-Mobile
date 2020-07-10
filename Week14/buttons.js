var pressedEvent = false

const eve = document.getElementById('btnEve');
eve.addEventListener('click', ()=>{
    event.preventDefault();
    if(pressedEvent === false){
        eve.className = 'checked'
        pressedEvent = true;
        console.log(pressedEvent)
    }else{
        pressedEvent = false;
        eve.className = ''
        console.log('else',pressedEvent)
    }
    
}, false)

var pressedAct = false

const act = document.getElementById('btnAct');
act.addEventListener('click', ()=>{
    event.preventDefault();
    if(pressedAct === false){
        act.className = 'checked'
        pressedAct = true;
        console.log(pressedAct)
    }else{
        pressedAct = false;
        act.className = ''
        console.log('else',pressedAct)
    }
    
}, false)