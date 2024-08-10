import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";

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
const db = getFirestore();
const storage = getStorage();

let name = document.getElementById("name");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let address = document.getElementById("address");
let image = document.getElementById("image-upload");

let upload = () => {
    return new Promise((resolve, reject) => {
        let files = image.files[0];
        console.log(files);
        const randomNum = Math.random().toString().slice(2);
        const storageRef = ref(storage, `images/${randomNum}`);
        const uploadTask = uploadBytesResumable(storageRef, files);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log(error.message);
                reject(error.message);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    resolve(downloadURL);
                });
            }
        );
    });
};

window.uploadProd = () => {
    let obj = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        address: address.value
    };
    console.log(obj);
    upload()
        .then(async res => {
            console.log(res);
            obj.imageUrl = res;
            console.log(obj);
            let reference = collection(db, "users");
            let result = await addDoc(reference, obj);
            window.location.assign("../../index.html");
        })
        .catch(err => {
            console.log(err);
        });
};