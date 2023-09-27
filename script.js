
const firebaseConfig = {
  apiKey: "AIzaSyBq2kLJFORCSAUntYXdYT84Ve5rR3Zi9S0",
  authDomain: "datos-de-formulario-16307.firebaseapp.com",
  projectId: "datos-de-formulario-16307",
  storageBucket: "datos-de-formulario-16307.appspot.com",
  messagingSenderId: "1080831269126",
  appId: "1:1080831269126:web:a1f296f4b45d33f097a687",
  measurementId: "G-FKLZ7CMWPY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault();

    // Validar campo nombre
    let entradaNombre = document.getElementById('name');
    let errorNombre = document.getElementById('nameError');

    if (entradaNombre.value.trim() === '') {
        errorNombre.textContent = 'Por favor, introduce tu nombre';
        errorNombre.classList.add('error-message');
    } else {
        errorNombre.textContent = '';
        errorNombre.classList.remove('error-message');
    }

    // Validar correo electrónico
    let emailEntrada = document.getElementById('email');
    let emailError = document.getElementById('emailError');
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailEntrada.value)) {
        emailError.textContent = 'Por favor, introduce un email válido';
        emailError.classList.add('error-message');
    } else {
        emailError.textContent = '';
        emailError.classList.remove('error-message');
    }

    // Validar contraseña
    let contraseñaEntrada = document.getElementById('password');
    let contraseñaError = document.getElementById('passwordError');

    if (contraseñaEntrada.value.length < 8) {
        contraseñaError.textContent = 'La contraseña debe tener al menos 8 caracteres';
        contraseñaError.classList.add('error-message');
    } else {
        contraseñaError.textContent = '';
        contraseñaError.classList.remove('error-message');
    }

    // Si todos los campos son válidos, enviar formulario
    if (!errorNombre.textContent && !emailError.textContent && !contraseñaError.textContent) {
        // BACK END QUE RECIBA LA INFO

        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            passwrod: contraseñaEntrada.value
        })
        .then((docRef) => {
            alert('¡El formulario se ha enviado con éxito!', docRef.id);
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert(error);
        });

    }
});
