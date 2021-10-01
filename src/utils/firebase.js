import firebase from 'firebase/app'
import 'firebase/firestore'

  var firebaseConfig = {
    apiKey: "AIzaSyDtzzBzgD10VXzCuIUidw2yHWCd-4MLYU4",
    authDomain: "projetos-sites-bba6c.firebaseapp.com",
    databaseURL: "https://projetos-sites-bba6c.firebaseio.com",
    projectId: "projetos-sites-bba6c",
    storageBucket: "projetos-sites-bba6c.appspot.com",
    messagingSenderId: "436167126323",
    appId: "1:436167126323:web:bbef05162416a35fca6246",
    measurementId: "G-MMF7CSCYX7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  //  firebase.analytics();

export default firebase