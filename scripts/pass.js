import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAXyfOJAVxBMRUJhEL50XWj5G7Ut1tKLA0",
    authDomain: "primehome-dec5e.firebaseapp.com",
    databaseURL: "https://primehome-dec5e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "primehome-dec5e",
    storageBucket: "primehome-dec5e.appspot.com",
    messagingSenderId: "612247300560",
    appId: "1:612247300560:web:5e8df9ea133f49820d31d5",
    measurementId: "G-51140L60RJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to get query parameters from URL
function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const queryArray = queryString.split('&');
    queryArray.forEach(function(param) {
        const pair = param.split('=');
        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    });
    return params;
}

// Get the email parameter from the URL
const params = getQueryParams();
const email = params['email'];

// Display the email on the page
if (email) {
    document.getElementById('user-email').innerText = email;
} else {
    document.getElementById('user-email').innerText = 'No email provided';
}

// Add event listener to the "Sign in" button
document.getElementById('continue-button').addEventListener('click', function() {
    const password = document.getElementById('password').value;
    if (password) {
        // Save password to a variable
        let userPassword = password;

        // Log the email and password (for demonstration purposes)
        console.log('Email:', email);
        console.log('Password:', userPassword);

        // Sign in with Firebase
        signInWithEmailAndPassword(auth, email, userPassword)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('User signed in:', user);

            // Redirect or further process here
            alert('Login Successful');
            window.location.href = '../movies.html?email=' + encodeURIComponent(email);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error signing in:', errorCode, errorMessage);
            // Show alert for incorrect password
            if (errorCode === 'auth/wrong-password') {
                alert('Incorrect password. Please try again.');
            } else {
                alert('Error signing in: Incorrect password. Please try again.');
                // alert('Error signing in: ' + errorMessage);
            }
        });

    } else {
        alert('Please enter your password.');
    }
});

// Toggle password visibility
document.getElementById('show-password').addEventListener('change', function() {
    const passwordField = document.getElementById('password');
    if (this.checked) {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
});
