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



function Choose_data() {
  var url = GetSearch()
  if (url != null || url != undefined) {
    readTextFile("https://raw.githubusercontent.com/somnathdashs/somnathdashs.github.io/main/Datas/Projects.json", async function (text) {
      document.getElementById("SS").value = url
      var data = await JSON.parse(text);
      arr = Object.values(data)
      arr.reverse();
      var Ccards = "";
      var Searchlist = []
      for (var i = 0; i < arr.length; i++) {
        var Cpro = arr[i][0]
        if (Cpro.Search.toLowerCase().includes(url.toLowerCase())) {
          Searchlist.push(Cpro)
        }
      }
      for (var i = 0; i < Searchlist.length; i++) {
        var Cpro = Searchlist[i];
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
    
    });
  } else {
    readTextFile("https://raw.githubusercontent.com/somnathdashs/somnathdashs.github.io/main/Datas/Projects.json", async function (text) {
      var data = await JSON.parse(text);
      var Ccards = "";
      arr = Object.values(data)
      arr.reverse();
      for (var i = 0; i < arr.length; i++) {
        var Cpro = arr[i][0]
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
        div.innerHTML = Ccards;
      }
    });
  }
}

Choose_data()