 // Initialize Firebase
var config = {
    apiKey: "AIzaSyCC4Un5aLl3vH87J_5RhrEg_1D9jElTrH0",
    authDomain: "bancodetiempodeluxe.firebaseapp.com",
    databaseURL: "https://bancodetiempodeluxe-default-rtdb.firebaseio.com",
    projectId: "bancodetiempodeluxe",
    storageBucket: "bancodetiempodeluxe.appspot.com",
    messagingSenderId: "930893019793",
    appId: "1:930893019793:web:6715b013d52074523e1d30",
    measurementId: "G-9ZHT0X5ZQF"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

function escribeTinota() {
    correoD = document.getElementById('email').value;
    correo = correoD.toString();

    contraD = document.getElementById('password').value;
    contra = contraD.toString();

    firebase.database().ref('admin/').set({
        email: correo,
        password: contra
    });
    console.log("Listo pai");
}

function cerrarSesion(){
    firebase.auth().signOut().then(() => {
        window.location.href='login.html';
        sessionStorage.setItem('logged', 'false');
        sessionStorage.setItem('usuario', '');
      }).catch((error) => {
        console.log(error);
      });
    
}


function iniciarSesion(){
    correoD = document.getElementById('email').value;
    correo = correoD.toString();

    contraD = document.getElementById('password').value;
    contra = contraD.toString();

    //Autenticar en firebase
    firebase.auth().signInWithEmailAndPassword(correo, contra)
    .then((userCredential) => {
        //alert("Pasale pai");
        console.log('Si estas registrado');
    
    })
    .catch((error) => {
        alert("No estas registrado pai");
        console.log(error);
    });

    firebase.auth().onAuthStateChanged( (user) => {
        if(user){
            //Checar si es admin
            var usuario = user.uid;

            var baseDeUsuarios = firebase.database().ref('Users/'+usuario+'/role');
            baseDeUsuarios.on( 'value', (snapshot) => {
                const miRol = snapshot.val();
                
                if(miRol == 'admin'){
                    sessionStorage.setItem('logged', 'true');
                    sessionStorage.setItem('usuario', usuario);
                    window.location.href='index.html';
                    
                }else if(miRol == 'user'){
                    console.log("No eres admin");
                }
            });
        }
        else{
            sessionStorage.setItem('logged', 'false');
            sessionStorage.setItem('usuario', '');
        }
    });
}