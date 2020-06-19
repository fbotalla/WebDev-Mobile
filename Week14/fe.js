// import {firebase} from './firebase'

function initialize() {
    var input = document.getElementById('searchTextField');
    new google.maps.places.Autocomplete(input);
    console.log(input)
    input.addEventListener('change',logIt, false);
}

google.maps.event.addDomListener(window, 'load', initialize);



function logIt(){
    const result = firebase.firestore().collection('PostedFunActivities').where('user', '==', 'corra').get().then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            console.log('here',doc.data());
        })
    });
}

