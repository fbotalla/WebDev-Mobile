import geohash from 'https://cdn.jsdelivr.net/npm/latlon-geohash@2.0.0';

var firebaseConfig = {
    apiKey: "AIzaSyAbODuYbpo1EI9eAcEvfQGv1UNrYJ1qaHE",
    authDomain: "fe-funeverywhere.firebaseapp.com",
    databaseURL: "https://fe-funeverywhere.firebaseio.com",
    projectId: "fe-funeverywhere",
    storageBucket: "fe-funeverywhere.appspot.com",
    messagingSenderId: "721226839450",
    appId: "1:721226839450:web:9d74b3e1c2d30e9aa07623",
    measurementId: "G-8GT2KS7MPK"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
    firebase.firestore();
    firebase.storage();
  }

  //EVENTS LISTENERS
var btn = document.getElementById('submitThis');
btn.addEventListener('click', logIt, false);
google.maps.event.addDomListener(window, 'load', initialize);
var list = document.getElementById('list');
list.addEventListener('click', displaySinglePost, false);


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
    arrActivities = new Array
    photosActivities = new Array

    list.innerHTML = ''
    const selectedItem = document.getElementById("selections");
    const dist = selectedItem.options[selectedItem.selectedIndex].value
   
    const lat = result.getPlace().geometry.location.lat();
    const long = result.getPlace().geometry.location.lng();
    const range = getGeohashRange(lat,long,dist);

    const date = document.getElementById("date").value;
    const selectedTime = firebase.firestore.Timestamp.fromDate(new Date(date));
 
    return new Promise((resolve, reject) => {
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
       
    }); 
}
const getPhotos = (range) =>{
    return new Promise((resolve, reject) => {
    firebase.firestore().collection('PostedFunActivities').where("geolocation", ">=", range.lower).where("geolocation", "<=", range.upper).get().then(async (querySnapshot) =>{
        const images = await Promise.all(querySnapshot.docs.map(async(doc) =>{ 
            console.log(doc.data().title)
            const ref = firebase.storage().ref('images/'+ doc.data().image)
            const result = await ref.getDownloadURL();
            console.log(result)
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
        li.innerHTML = `
        <div id="${key}">
        <span id ="${key}" class='title'><h3 id ="${key}">${item.title}</h3></span>
        <image src = "${photosActivities[key].result}" id ="${key}" class='image'>
        </div>
        `
        list.appendChild(li)
    })

 }

 function displaySinglePost(event){
  
     console.log(event.toElement.id);
     alert(arrActivities[event.toElement.id].description)
 }

