import firebase from 'firebase';
import '@firebase/firestore';

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
  }

export default firebase;



// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.15.2/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.15.2/firebase-analytics.js"></script>
// <script src="https://www.gstatic.com/firebasejs/7.15.2/firebase-firestore.js"></script>


// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyAbODuYbpo1EI9eAcEvfQGv1UNrYJ1qaHE",
//     authDomain: "fe-funeverywhere.firebaseapp.com",
//     databaseURL: "https://fe-funeverywhere.firebaseio.com",
//     projectId: "fe-funeverywhere",
//     storageBucket: "fe-funeverywhere.appspot.com",
//     messagingSenderId: "721226839450",
//     appId: "1:721226839450:web:9d74b3e1c2d30e9aa07623",
//     measurementId: "G-8GT2KS7MPK"


    
//   };
//   // Initialize Firebase 
//   if(!firebase.apps.length){
//     firebase.initializeApp(firebaseConfig);
//   }

//   firebase.analytics();
//   firebase.firestore();