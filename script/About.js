import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-analytics.js";
const firebaseConfig = {
    apiKey: "AIzaSyBR4fbDmBVs5pUdK24fkfR8CPSWc8chd1g",
    authDomain: "my-portfolio-51150.firebaseapp.com",
    databaseURL: "https://my-portfolio-51150-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "my-portfolio-51150",
    storageBucket: "my-portfolio-51150.appspot.com",
    messagingSenderId: "983424656299",
    appId: "1:983424656299:web:25cf6ab30ea14378e568ee",
    measurementId: "G-S81C715WT4"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-database.js";
const db = getDatabase();
const dbref = ref(db);



async function LOAD_DATA() {
    let resp = await get(child(dbref, "Profile/Long_About"));
    var arr = resp.val();
    document.getElementById("FPara").innerText = arr.charAt(0);
    document.getElementById("Para").innerText = document.getElementById("Para").innerText + arr.slice(1);;

    var paragraph = document.getElementById("Para");

    // Replace '<br>' with '<br>' using the innerHTML property
    paragraph.innerHTML = paragraph.innerHTML.replace(/&lt;br&gt;/g, '<br>');

}

LOAD_DATA()

