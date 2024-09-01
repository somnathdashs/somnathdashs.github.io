const div = document.getElementById('mdcontainer');
var arr = [];

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

async function LOAD_DATA(arr) {
  var TOPT = document.getElementById("tit");
  const U = window.location;
  const Urll = "%0A%0A" + U+ "%0A%0A";
  try {

    var btns = `<div class="container text-center">
<div class="row">
    <div class="col">
        <a id="githubbtn" target=”_blank” href="${arr.GithubUrl}"
            class="my-3 ml-3"><i class="bx bxl-github"></i></a>
    </div>
    <div class="col">
        <a id="livebtn" target=”_blank” href="${arr.GithubUrl.toString().replace("github", "github1s")}"
            class="my-3 ml-3"><i class="bx bx-code-alt"></i></a>
    </div>
    <div class="col ">
        <a id="sharebtn" href="#"
            class="my-3 ml-3 share-button1"><i class="bx bx-share-alt"></i></a>
    </div>
</div>
</div>`;
    document.title = "Somnath Dash - " + arr.Title;
    const topT = `<h5 class="h1"><u>${arr.Title}</u></h5> 
    <p class="fs-5 mt-5">${arr.Des.replace(/&lt;br&gt;/g, '<br>')}</p>
    <p class="mt-5 text-center"><small class="text-body-secondary">Created on: ${arr.CreatedDate} and
                        Last Update on: ${arr.UpdateDate}</small></p>
                        <div id="gntbtn">

                        </div>`;

    TOPT.innerHTML = topT;
    var BTNS = document.getElementById("gntbtn");
    BTNS.innerHTML = btns;

    Readme(arr.ReadmeUrl);

    var sharesB = `<a target="_blank" class="button" href="https://www.facebook.com/sharer/sharer.php?u=${Urll}">
    <svg>
        <use href="#facebook"></use>
    </svg>
    <span>Facebook</span>
</a>

<a class="button" target="_blank" href="https://twitter.com/intent/tweet?text=${add3Dots(arr.Des, 100)}&url=${Urll}&hashtags=${arr.Title.replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_")}">
    <svg>
        <use href="#twitter"></use>
    </svg>
    <span>Twitter</span>
</a>

<a class="button" target="_blank" href="https://wa.me/?text=${add3Dots(arr.Des, 100)}${Urll}" data-action="share/whatsapp/share">
    <svg>
        <use href="#whatsapp"></use>
    </svg>
    <span>Whatsapp</span>
</a>

<a class="button" target="_blank" href="mailto:?subject=${arr.Title} &body=${add3Dots(arr.Des, 100)}${Urll}">
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
    <link href='${arr.ImageUrl}' rel='image_src'/>
    <meta content='${U}' property='og:url'/>
    <meta content='${document.title}' property='og:title'/>
    <meta content='You are always wellcome to visit me portfolio.' property='og:description'/>
    <meta content='${arr.ImageUrl}' property='og:image'/>`
    document.head.innerHTML = metadata + document.head.innerHTML;



  } catch (err) {
    console.log(err)
  }
}






readTextFile("https://raw.githubusercontent.com/somnathdashs/somnathdashs.github.io/main/Datas/Projects.json", async function (text) {
  var TOPT = document.getElementById("tit");
  var MUID = GetID();
  const U = window.location;
  const Urll = "%0A%0A" + U+ "%0A%0A";
  var data = await JSON.parse(text);
  arr = Object.values(data)
  for (var i = 0; i < arr.length; i++) {
    var C = arr[i][0]
    if (C.Uid == MUID){
      LOAD_DATA(C)
    }
  }
});







