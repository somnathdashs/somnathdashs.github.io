
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
  getDatabase, ref, set, child,
  get, query, limitToFirst, limitToLast,
  orderByChild, startAt, startAfter,
  endAt, endBefore, equalTo
} from "https://www.gstatic.com/firebasejs/9.19.0/firebase-database.js";
const db = getDatabase();
const dbref = ref(db);
const div = document.getElementById('all_cards');
var arr = [];

function add3Dots(string, limit) {
  var dots = "....";
  if (string.length > limit) {
    // you can also use substr instead of substring
    string = string.substring(0, limit) + dots;
  }

  return string;
}


function Get_ClickUrl(id) {
  var url = "/Details_Projects.html?id=" + id
  return url
}

const Button = document.getElementById('SS');



function GetSearch() {
  const mykey = window.location.search;
  const urlP = new URLSearchParams(mykey);
  const ID = urlP.get("Search");
  return ID
}


async function Search() {
  var text=GetSearch()
  document.getElementById("SS").value=text
  var Ccards = "";
  let resp = await get(child(dbref, "Projects"))
  var arr = Object.values(resp.val())
  var data = []
  for (var i = 0; i < arr.length; i++) {
    var Cp = arr[i]
    if (Cp.Search.toLowerCase().includes(text.toLowerCase())) {
      data.push(Cp)
    }
  }
  for (var i = 0; i < data.length; i++) {
    var Cpro = data[i];
    var info = `Created on: ${Cpro.CreatedDate} and Last Update on: ${Cpro.UpdateDate}`
    var card = ` <div class="card mt-4 CenterBlock Scard">
  <div class="row g-0" onclick="window.open('${Get_ClickUrl(Cpro.Uid)}', '_self');">
    <div class="col-md-3 card_image p-2">
      <img src="${Cpro.ImageUrl}"
        class="img-fluid rounded-start w-100" alt="Fail to Load">
    </div>
    <div class="col-md-8" id="card_text_part">
      <div class="card-body">
        <h5 class="h3 card-title">${Cpro.Title}</h5>
        <p class="card-text my-3" style="color: rgb(75, 73, 73);">${add3Dots(Cpro.Des, 500)}</p>
        <div id="card_botm-div d-flex">
          <p class="card-text"><small class="text-body-secondary">${info}</small></p>
        </div>
      </div>
    </div>
  </div>
</div>`;
    Ccards += card;
  }
  div.innerHTML = Ccards;

}





async function LOAD_DATA() {
  try {
    var Ccards = "";
    let resp = await get(child(dbref, "Projects"))
    arr = Object.values(resp.val())
    for (var i = 0; i < arr.length; i++) {
      var Cpro = arr[i];
      var info = `Created on: ${Cpro.CreatedDate} and Last Update on: ${Cpro.UpdateDate}`
      var card = ` <div class="card mt-4 CenterBlock Scard">
      <div class="row g-0" onclick="window.open('${Get_ClickUrl(Cpro.Uid)}', '_self');">
        <div class="col-md-3 card_image p-2">
          <img src="${Cpro.ImageUrl}"
            class="img-fluid rounded-start w-100" alt="Fail to Load">
        </div>
        <div class="col-md-8" id="card_text_part">
          <div class="card-body">
            <h5 class="h3 card-title">${Cpro.Title}</h5>
            <p class="card-text my-3" style="color: rgb(75, 73, 73);">${add3Dots(Cpro.Des, 500)}</p>
            <div id="card_botm-div d-flex">
              <p class="card-text"><small class="text-body-secondary">${info}</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>`;
      Ccards += card;
    }
    div.innerHTML = Ccards;

  } catch (err) {
    console.log(err)
  }
}


function Choose_data(){
  var url=GetSearch()
  if (url !=null || url!=undefined){
    Search()
  }else{
    LOAD_DATA()
  }
}

Choose_data()