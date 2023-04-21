function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}






async function LOAD_DATA() {
    readTextFile("https://raw.githubusercontent.com/somnathdashs/somnathdashs.github.io/main/Datas/Profile.json", function(text){
        var data = JSON.parse(text);
        var arr=data.Long_About[0];
        document.getElementById("FPara").innerText = arr.charAt(0);
        document.getElementById("Para").innerText = document.getElementById("Para").innerText + arr.slice(1);;
    
        var paragraph = document.getElementById("Para");
        paragraph.innerHTML = paragraph.innerHTML.replace(/&lt;br&gt;/g, '<br>');
    });
}

LOAD_DATA()

