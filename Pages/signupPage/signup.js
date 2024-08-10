import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyABXqdjKb0eIC6hns3XduVNOfRFkoVyv4E",
    authDomain: "shopping-mania-ecebd.firebaseapp.com",
    projectId: "shopping-mania-ecebd",
    storageBucket: "shopping-mania-ecebd.appspot.com",
    messagingSenderId: "412607740061",
    appId: "1:412607740061:web:f270f66dbfb310c7dc7c74",
    measurementId: "G-1BD47K3C5L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore()


window.signUp = () => {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');

    let obj = {
        name: name.value,
        email: email.value,
        password: password.value
    }

    createUserWithEmailAndPassword(auth, obj.email, obj.password)
        .then((res) => {
            obj.id = res.user.uid; // Update obj.id with the actual user ID
            const reference = doc(db, "users", obj.id);
            setDoc(reference, obj)
                .then(() => {
                    const userObj = JSON.stringify(obj);
                    localStorage.setItem("user", userObj);
                    window.location.replace("../../index.html");
                })
                .catch((err) => {
                    alert(err.message);
                });

            delete obj.password;
        })
        .catch((err) => {
            alert(err.message);
        })
}