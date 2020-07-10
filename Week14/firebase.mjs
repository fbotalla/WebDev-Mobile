export default function fire(){
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

  return firebase;
}