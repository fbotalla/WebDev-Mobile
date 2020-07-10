import geohash from 'https://cdn.jsdelivr.net/npm/latlon-geohash@2.0.0';
import key from './keys.mjs'
import fire from './firebase.mjs'

const firebase = fire()

//EVENTS LISTENERS
var btn = document.getElementById('submitThis');
btn.addEventListener('click', logIt, false);
google.maps.event.addDomListener(window, 'load', initialize);
var list = document.getElementById('list');
var listEvent = document.getElementById('listEvent');
list.addEventListener('click', displaySinglePost, false);
listEvent.addEventListener('click', displaySingleEventPost, false);
var frm = document.getElementById("form");





//STATE
var arrActivities = [];
var photosActivities = []
var arrEvents = [];
var result = ''

//FUNCTIONS
function initialize() {
    
    var input = document.getElementById('searchTextField');
    result = new google.maps.places.Autocomplete(input) 
}

function logIt(){
    event.preventDefault();
    var eve = document.getElementById('btnEve');
    var act = document.getElementById('btnAct');
    
    console.log( eve.className)
    arrActivities = new Array
    photosActivities = new Array
    arrEvents = new Array
 
    list.innerHTML = ''
    listEvent.innerHTML = ''
    const selectedItem = document.getElementById("selections");
    const dist = selectedItem.options[selectedItem.selectedIndex].value
   
    const lat = result.getPlace().geometry.location.lat();
    const long = result.getPlace().geometry.location.lng();
    const range = getGeohashRange(lat,long,dist);

    const date = document.getElementById("date").value;
    const selectedTime = firebase.firestore.Timestamp.fromDate(new Date(date));
 
    frm.reset();
    if(act.className === 'checked'){
    new Promise((resolve, reject) => {
        firebase.firestore().collection('PostedFunActivities').where("geolocation", ">=", range.lower).where("geolocation", "<=", range.upper).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) =>{ 
            //    console.log(doc.data().title)
                arrActivities.push(doc.data());                                         
            })
            resolve(arrActivities);
        });
    }).then((result) => {
        new Promise((resolve, reject) => {
            resolve(getPhotos(range))
        }).then((images)=>{
            displayData(result,images)
        })
       
    })
}
        if(eve.className === 'checked'){
            new Promise((resolve,reject)=>{
            firebase.firestore().collection('PostedFunEvents').where("geolocation", ">=", range.lower).where("geolocation", "<=", range.upper).get().then((querySnapshot) =>{
                querySnapshot.forEach((doc) =>{ 
                   // console.log(doc.data().eventDate,selectedTime)
                        if(selectedTime <= doc.data().eventDate){
                            arrEvents.push(doc.data());     
                        }                                    
                        })
                        resolve(arrEvents);
                    });
                }).then((result)=>{
                    displayEventData();
                })
        }else{
            listEvent.innerHTML = 'If you want to view Events click on the Events button and search again'
        }
}

const getPhotos = (range) =>{
    return new Promise((resolve, reject) => {
    firebase.firestore().collection('PostedFunActivities').where("geolocation", ">=", range.lower).where("geolocation", "<=", range.upper).get().then(async (querySnapshot) =>{
        const images = await Promise.all(querySnapshot.docs.map(async(doc) =>{ 
            console.log(doc.data().title)
            const ref = firebase.storage().ref('images/'+ doc.data().image)
            const result = await ref.getDownloadURL();
           // console.log(result)
            return result                                      
        }));    
         //console.log('image?', images)
         for(var i = 0; i < images.length; i++){
            photosActivities.push({result: images[i]})
         }
         resolve(photosActivities)
           
        })
    });
}


const getGeohashRange = (latitude,longitude,distance)=>{
    // console.log(distance);
     if(distance == 'Everywhere'){distance = 20000}
     const lat = 0.0144927536231884; // degrees latitude per mile
     const lon = 0.0181818181818182; // degrees longitude per mile
   
     const lowerLat = latitude - lat * distance;
     const lowerLon = longitude - lon * distance;
   
     const upperLat = latitude + lat * distance;
     const upperLon = longitude + lon * distance;
   
     const lower = geohash.encode(lowerLat, lowerLon);
     const upper = geohash.encode(upperLat, upperLon);
   
     return {
       lower,
       upper
     };
 }

 const displayData = (data,images) =>{
    console.log('photos', photosActivities)
  //  console.log('act' , arrActivities)
  //console.log(photosActivities)
    arrActivities.map((item, key) =>{
       // console.log(key);
        const li = document.createElement('div');
        li.id = key
        li.className = 'divContainer';
        li.innerHTML = `
        <span id ="${key}" class='title'><h3 id ="${key}">${item.title}</h3></span>
        <image src = "${photosActivities[key].result}" id ="${key}" class='image'>
        `
        list.appendChild(li)
    })
 }

 const displayEventData = (data,images) =>{
    arrEvents.map((item, key) =>{
        console.log('here')
       // console.log(key);
        const li = document.createElement('div');
        li.id = key
        li.className = 'divContainer';
        li.innerHTML = `
        <span id ="${key}" class='title'><h3 id ="${key}">${item.title}</h3></span>
        <span id = "${key}"><h4 id="${key}">${item.eventDate.toDate().toDateString()}  </h4></span>
        <span id = "${key}"><h4 id="${key}">${item.eventTime.toDate().toUTCString().slice(17,22)}</h4></span>
        `
        listEvent.appendChild(li)
    })
 }

 

 function displaySinglePost(event){
    if(event.toElement.id >= 0){
    var modal = document.getElementById("myModal");
    var data = document.getElementById("modal-content");
    modal.style.display = "block";

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            data.innerHTML = ''
        }
        }

        data.innerHTML = `
        <div id="${event.toElement.id} class="divContainer">
            <span class="close" id="closeSpan">&times;</span>
            <span id ="${event.toElement.id}" class='user'><h4 id ="${event.toElement.id}">${arrActivities[event.toElement.id].user}</h4></span>
            <image src = "${photosActivities[event.toElement.id].result}" id ="${event.toElement.id}" class='image'>
            <span id ="${event.toElement.id}" class='title'><h4 id ="${event.toElement.id}">${arrActivities[event.toElement.id].description}</h4></span>
            <span id ="${event.toElement.id}" class='date'><h4 id ="${event.toElement.id}">${arrActivities[event.toElement.id].datePosted}</h4></span>
        </div>
                `

            var span = document.getElementById("closeSpan");
            span.onclick = function() {
                modal.style.display = "none";
                data.innerHTML = ''
                }
            }
}

function displaySingleEventPost(event){
    if(event.toElement.id >= 0){
        var modal = document.getElementById("myModal");
        var data = document.getElementById("modal-content");
        modal.style.display = "block";
    
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                data.innerHTML = ''
            }
            }
    
            data.innerHTML = `
            <div id="${event.toElement.id} class="divContainer">
                <span class="close" id="closeSpan">&times;</span>
                <span id ="${event.toElement.id}" class='user'><h4 id ="${event.toElement.id}">${arrEvents[event.toElement.id].user}</h4></span>
                <span id ="${event.toElement.id}" class='title'><h4 id ="${event.toElement.id}">${arrEvents[event.toElement.id].description}</h4></span>
                <span id ="${event.toElement.id}" class='date'><h4 id ="${event.toElement.id}">${arrEvents[event.toElement.id].datePosted}</h4></span>
            </div>
                    `
    
                var span = document.getElementById("closeSpan");
                span.onclick = function() {
                    modal.style.display = "none";
                    data.innerHTML = ''
                    }
                }
}
