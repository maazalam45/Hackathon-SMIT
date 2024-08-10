import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// Your web app's Firebase configuration
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
const db = getFirestore(app);

let userTableBody = document.getElementById("userTableBody");
let loginLink = document.getElementById("loginLink");
let signupLink = document.getElementById("signupLink");
let logoutBtn = document.getElementById("logoutBtn");

const getData = async () => {
    try {
        const reference = collection(db, "users"); // Ensure this matches your collection name
        const res = await getDocs(reference);
        let rows = "";
        res.forEach((doc) => {
            const obj = doc.data();
            const { name, email, phone, address, imageUrl } = obj;
            rows += `
            <tr>
                <td class="py-2 px-4 border-b">${name}</td>
                <td class="py-2 px-4 border-b">${email}</td>
                <td class="py-2 px-4 border-b">${phone}</td>
                <td class="py-2 px-4 border-b">${address}</td>
                <td class="py-2 px-4 border-b">
                    <img src="${imageUrl}" alt="Profile Picture" class="w-16 h-16 object-cover rounded-full" onError="this.src='default-profile.png';" />
                </td>
            </tr>
            `;
        });
        userTableBody.innerHTML = rows;
    } catch (error) {
        console.error("Error fetching user data: ", error);
    }
};

const navDis = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            loginLink.style.display = "none";
            signupLink.style.display = "none";
            logoutBtn.classList.remove("hidden");
        } else {
            loginLink.style.display = "inline";
            signupLink.style.display = "inline";
            logoutBtn.classList.add("hidden");
        }
    });
};

window.logout = () => {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    }).catch((error) => {
        alert(error.message);
    });
};

navDis();
getData();
