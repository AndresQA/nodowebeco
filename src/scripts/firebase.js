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
        document.body.style.display = null


    } else {
        // No user is signed in.
        location.href = "index.html";
    }
});

//aqui se encuentra la parte de leer y escribir en la base de datos en tiempo real
class Database {
    constructor() {
        this.database = firebase.database();
    }

    readDatabase(ruta, load) {
        var refDataBase = this.database.ref(ruta);

        refDataBase.on('value', (snapshots) => {
            var objeto = snapshots.val();
            load(objeto);
        });
    }

    readBranchDatabase(ruta, load) {
        var refDataBase = this.database.ref(ruta);

        refDataBase.on('value', (snapshots) => {
            var arrayResult = [];

            snapshots.forEach((snapshot) => {
                var objetoResult = snapshot.val();
                objetoResult.UID = snapshot.key;
                arrayResult.push(objetoResult);
            })

            load(arrayResult);
        });
    }

    writeDatabase(url, objeto) {
        this.database.ref(url).set(objeto);
    }

}
//la declaro para usar db en cualquier lado
var db = new Database();


var Branch = {
    solicitud: "solicitudes"
}