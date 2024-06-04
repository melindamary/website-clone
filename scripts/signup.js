import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXyfOJAVxBMRUJhEL50XWj5G7Ut1tKLA0",
  authDomain: "primehome-dec5e.firebaseapp.com",
  databaseURL: "https://primehome-dec5e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "primehome-dec5e",
  storageBucket: "primehome-dec5e.appspot.com",
  messagingSenderId: "612247300560",
  appId: "1:612247300560:web:5e8df9ea133f49820d31d5",
  measurementId: "G-51140L60RJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Register user function
function registerUser(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem("username", username);
      alert("Register success");
      window.location.href = "login.html";
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

// Toggle fields function
function toggleFields() {
  const emailField = document.getElementById("email");
  const mobileField = document.getElementById("mobile-number");
  const country = document.getElementById("country-code");
  const tx1 = document.getElementById("text1");
  const ic3 = document.getElementById("ic3");
  const tx2 = document.getElementById("text2");
  const emailLabel = document.querySelector('label[for="mobile-number"]');
  const formbody2 = document.getElementById("form-body2");
  const contbtn = document.getElementById("continue-button");



  // Toggle visibility
  const isEmailVisible = emailField.style.display === "block";
  emailField.style.display = isEmailVisible ? "none" : "block";
  mobileField.style.display = isEmailVisible ? "block" : "none";
  country.style.display = mobileField.style.display;
  tx1.style.display = mobileField.style.display;
  tx2.style.display = emailField.style.display;
  ic3.style.display = emailField.style.display;
  formbody2.style.display =emailField.style.display;

  // Change label text
  emailLabel.textContent = isEmailVisible ? "Email" : "Mobile number";
  contbtn.textContent = isEmailVisible ? "Continue" : "Create your Amazon account";
}

// Add event listeners
document.getElementById("continue-button").addEventListener("click", registerUser);
document.getElementById("text1").addEventListener("click", toggleFields);
document.getElementById("text2").addEventListener("click", toggleFields);
