
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
const div = document.getElementById('Tcards');
var arr = [];

function add3Dots(string, limit)
{
  var dots = "....";
  if(string.length > limit)
  {
    // you can also use substr instead of substring
    string = string.substring(0,limit) + dots;
  }
 
    return string;
}

function Get_ClickUrl(id){
  var url="/Details_Projects.html?id="+id
  return url
}

async function LOAD_DATA() {
  try {
    var i = 1;
    var cards = [];
    var total_pro = 0;
    var currentl_pro = 0;
    var Ccards = "";
    var Card_group = "";
    let resp = await get(child(dbref, "TP"))
    arr = Object.values(resp.val())
    for (var i = 0; i < arr.length; i++) {
      var Cpro = arr[i];
      var card = `<div class="col">
      <div class="card my_card" style="width: 18rem;" onclick="window.open('${Get_ClickUrl(Cpro.Uid)}', '_self');">
      <div style="max-height:30%; min-height:30%;"><img src="${Cpro.ImageUrl}" class="card-img-top my_card_img p-2"
      alt="Fail to Load"></div>
      
      <div class="card-body">
        <h5 class="h5 card-title p-2"><b>${Cpro.Title}</b></h5>
        <p class="card-text text-left" style="color: rgb(75, 73, 73);"> ${add3Dots(Cpro.Des,110)}</p>
      </div>
      </div>
      </div>`;
      // var card = '<div class="col"><div class="card my_card" style="width: 18rem;"><img src="' + Cpro.image + '" class="card-img-top"alt="Fail to Load"><div class="card-body"><h5 class="card-title">' + Cpro.Title + '</h5><p class="card-text">' + Cpro.dis + '</p> <a href="#" class="btn btn-primary">Go somewhere</a></div></div></div> '
      cards.push(card);
      total_pro = cards.length;
    }

    for (let i = 0; i < cards.length; i++) {
      Ccards += cards[i];
      currentl_pro++;
      total_pro--;
      if (currentl_pro == 3) {
        var grp = `
        <div class="groups" id="gcard_1">
        <div class="container text-center">
        <div class="row">
        ${Ccards}
        </div>
        </div>
        </div>`;
        Card_group += grp;
        currentl_pro = 0;
        Ccards = '';
      } else if (0 < currentl_pro < 3 && total_pro == 0) {
        var grp = `
        <div class="groups" id="gcard_1">
        <div class="container text-center">
        <div class="row">
        ${Ccards}
        </div>
        </div>
        </div>`;
        Card_group += grp;
        currentl_pro = 0;
        Ccards = '';
      }
    }
    div.innerHTML = Card_group;
  } catch (err) {
    console.log(err)
  }
}


async function LOAD_DATA1() {
  let resp = await get(child(dbref, "Profile/Short_About"));
  var arr = resp.val();
  document.getElementById("AT").innerText=arr;
}


LOAD_DATA();
LOAD_DATA1();


