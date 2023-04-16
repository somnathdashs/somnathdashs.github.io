
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
import {
  getDatabase, ref, child,
  get} from "https://www.gstatic.com/firebasejs/9.19.0/firebase-database.js";
const db = getDatabase();
const div = document.getElementById('mdcontainer');
const dbref = ref(db);
var arr = [];



function add3Dots(string, limit) {
  var dots = "... Check Out the Link ";
  if (string.length > limit) {
    // you can also use substr instead of substring
    string = string.substring(0, limit) + dots;
  }

  return string;
}


function GetID() {
  const mykey = window.location.search;
  const urlP = new URLSearchParams(mykey);
  const ID = urlP.get("id");
  return ID
}




function Readme(url) {
  var ifr = `<iframe src="/readme.html?url=${url}" style="border:0.5px solid black;" class="my-5" >
  </iframe>`
  document.getElementById("if").innerHTML = document.getElementById("if").innerHTML + ifr

}
async function LOAD_DATA() {
  var TOPT = document.getElementById("tit");
  var UID = GetID();
  const U = window.location;
  const Urll = "%0A%0A" + U+ "%0A%0A";
  try {
    let resp = await get(child(dbref, "Projects/" + UID))
    arr = Object.values(resp.val())
    var btns = `<div class="container text-center">
<div class="row">
    <div class="col">
        <a id="githubbtn" target=”_blank” href="${arr[4]}"
            class="my-3 ml-3"><i class="bx bxl-github"></i></a>
    </div>
    <div class="col">
        <a id="livebtn" target=”_blank” href="${arr[4].toString().replace("github", "github1s")}"
            class="my-3 ml-3"><i class="bx bx-code-alt"></i></a>
    </div>
    <div class="col ">
        <a id="sharebtn" href="#"
            class="my-3 ml-3 share-button1"><i class="bx bx-share-alt"></i></a>
    </div>
</div>
</div>`;
    document.title = "Somnath Dash - " + arr[11];
    const topT = `<h5 class="h1"><u>${arr[11]}</u></h5> 
    <p class="fs-5 mt-5">${arr[3]}</p>
    <p class="mt-5 text-center"><small class="text-body-secondary">Created on: ${arr[2]} and
                        Last Update on: ${arr[13]}</small></p>
                        <div id="gntbtn">

                        </div>`;

    TOPT.innerHTML = topT;
    var BTNS = document.getElementById("gntbtn");
    BTNS.innerHTML = btns;

    Readme(arr[8]);

    var sharesB = `<a target="_blank" class="button" href="https://www.facebook.com/sharer/sharer.php?u=${Urll}">
    <svg>
        <use href="#facebook"></use>
    </svg>
    <span>Facebook</span>
</a>

<a class="button" target="_blank" href="https://twitter.com/intent/tweet?text=${add3Dots(arr[3], 100)}&url=${Urll}&hashtags=${arr[11].replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_")}">
    <svg>
        <use href="#twitter"></use>
    </svg>
    <span>Twitter</span>
</a>

<a class="button" target="_blank" href="https://wa.me/?text=${add3Dots(arr[3], 100)}${Urll}" data-action="share/whatsapp/share">
    <svg>
        <use href="#whatsapp"></use>
    </svg>
    <span>Whatsapp</span>
</a>

<a class="button" target="_blank" href="mailto:?subject=${arr[11]} &body=${add3Dots(arr[3], 100)}${Urll}">
    <svg>
        <use href="#email"></use>
    </svg>
    <span>Email</span>
</a>`
    document.getElementById("SUrl").innerText = window.location;
    document.getElementById("sorter").innerHTML = sharesB;

    const shareButton = document.querySelector('.share-button1');
    const shareDialog = document.querySelector('.share-dialog');
    const closeButton = document.querySelector('.close-button');
    shareButton.addEventListener('click', event => {
      shareDialog.classList.add('is-open');
      //if (navigator.share) {
      // navigator.share({
      //     title: document.title,
      //     url: window.location.search
      //   }).then(() => {
      //     console.log('Thanks for sharing!');
      //   })
      //     .catch(console.error);
      // } else {
      //   shareDialog.classList.add('is-open');
      //   // shareDialog.classList.remove('is-open');

      // }
    });

    closeButton.addEventListener('click', event => {
      shareDialog.classList.remove('is-open');
      const div = document.getElementById('altt');
      div.innerHTML = ""
    });

    var metadata = `
    <link href='${arr[6]}' rel='image_src'/>
    <meta content='${U}' property='og:url'/>
    <meta content='${document.title}' property='og:title'/>
    <meta content='You are always wellcome to visit me portfolio.' property='og:description'/>
    <meta content='${arr[6]}' property='og:image'/>`
    document.head.innerHTML = metadata + document.head.innerHTML;



  } catch (err) {
    console.log(err)
  }
}







LOAD_DATA();








// var cssFile = document.createElement( "link" );
// cssFile.rel = "stylesheet";
// cssFile.type = "text/css";
// cssFIle.href = "https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css";
// document.getElementsByTagName( "header" )[0].appendChild( cssFile );

