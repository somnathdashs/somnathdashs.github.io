const div = document.getElementById('Tcards');
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

function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  }
  rawFile.send(null);
}

async function LOAD_DATA1() {
  readTextFile("https://raw.githubusercontent.com/somnathdashs/somnathdashs.github.io/main/Datas/Profile.json", function (text) {
    var data = JSON.parse(text);
    var arr = data.Short_About[0];
    document.getElementById("AT").innerText = arr;
    document.getElementById("AT").innerHTML = document.getElementById("AT").innerHTML.replace(/&lt;br&gt;/g, '<br>');

  });
}


LOAD_DATA1();

readTextFile("https://raw.githubusercontent.com/somnathdashs/somnathdashs.github.io/main/Datas/TP.json", async function (text) {
  var i = 1;
  var cards = [];
  var total_pro = 0;
  var currentl_pro = 0;
  var Ccards = "";
  var Card_group = "";
  var data = await JSON.parse(text);
  arr = Object.values(data)
  for (var i = 0; i < arr.length; i++) {
    var Cpro = arr[i][0]
    var card = `<div class="col">
      <div class="card my_card" style="width: 18rem;" onclick="window.open('${Get_ClickUrl(Cpro.Uid)}', '_self');">
      <div style="max-height:30%; min-height:30%;"><img src="${Cpro.ImageUrl}" class="card-img-top my_card_img p-2"
      alt="Fail to Load"></div>
      
      <div class="card-body">
        <h5 class="h5 card-title p-2"><b>${Cpro.Title}</b></h5>
        <p class="card-text text-left" style="color: rgb(75, 73, 73);"> ${add3Dots(Cpro.Des, 110)}</p>
      </div>
      </div>
      </div>`;
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
});
