var peopleBtn = document.getElementById('people');
peopleBtn.addEventListener('click', findPeople,false)
var ul = document.getElementById('results')


var prev = document.getElementById('previous')

function findPeople(url){
   if(typeof url != 'string'){
    var url = 'https://swapi.dev/api/people/'
   }
    console.log(url)
    fetch(url).then(response => response.json())
    .then((data) => {

        ul.addEventListener('click', function(event){
            console.log(event.target.innerHTML)
            data.results.forEach(result =>{
                if(result.name === event.target.innerHTML){
                    displayInfo(result);
                }
            })
        },false)
        
        if(data.next){
        const next = document.getElementById('next')
        next.onclick = () =>{
            ul.innerHTML = ''
            //url = data.next;
            findPeople(data.next);
            return
        }
    }

    if(data.previous){
        const prev = document.getElementById('previous')
        prev.onclick = () =>{
            ul.innerHTML = ''
            //url = data.next;
            findPeople(data.previous);
            return
        }
    }
            data.results.forEach(result => {
                var li = document.createElement('li');
                li.appendChild(document.createTextNode(result.name));
                ul.appendChild(li);
            })}
            );

    }

   function displayInfo(obj){
       console.log(obj)
       alert(obj.name + ' is born ' + obj.birth_year + '. Color of eyes: ' + obj.eye_color)
    }