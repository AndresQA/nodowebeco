var firebaseConfig = {
  apiKey: "AIzaSyBMdlUcYquSq0NZrCBBL1MnsmvAJLb1XGQ",
  authDomain: "rangy-bebe6.firebaseapp.com",
  databaseURL: "https://rangy-bebe6.firebaseio.com",
  projectId: "rangy-bebe6",
  storageBucket: "rangy-bebe6.appspot.com",
  messagingSenderId: "273418868431",
  appId: "1:273418868431:web:61182830579c3b5f1709ba"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    location.href = "reservas.html";

  } else {
    // No user is signed in.
  }
});

function login() {
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;


  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...

    window.alert("Error: " + errorMessage);
  });
}
