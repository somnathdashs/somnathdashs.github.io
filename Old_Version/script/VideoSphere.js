var arr = [];

function add3Dots(string, limit) {
    var dots = "....";
    if (string.length > limit) {
        // you can also use substr instead of substring
        string = string.substring(0, limit) + dots;
    }

    return string;
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





readTextFile("/Datas/Series.json", async function (text) {
    var data = await JSON.parse(text);
    var arr = Object.values(data)
    var row = ""
    var col = ""
    var Total_Videos=0
    var Count_col = 0

    for (let i = 0; i < arr.length; i++) {
        var TArr = arr[i]
        var Playlist = `<div class="col my-4">
        <div class="card mx-auto" style="width: 18rem;">
          <img src="${TArr.Cover_image}"
            class="card-img-top" alt="Network error">
          <div class="card-body">
            <h5 class="card-title h5">${TArr.Name}</h5>
            <p class="card-text fs-6 mt-3 text-left">${add3Dots(TArr.Des,120)}</p>
            <button type="button" onclick="window.open('/Series.html?id=${TArr.ID}','_self')" class="btn btn-outline-danger my-3">Watch Now</button>
          </div>
        </div>
      </div>`
        col += Playlist
        Count_col += 1
        Total_Videos+=1


        if (Count_col == 3 || Count_col < 3 && arr.length-Total_Videos==0) {
            var O_Row = `<div class="container text-center my-4">
            <div class="row align-items-start mx-auto">
            ${col}          
            </div>
            </div>`
            col = ``
            Count_col = 0
            row+=O_Row
        }
    }
    document.getElementsByTagName("main")[0].innerHTML=row
})
