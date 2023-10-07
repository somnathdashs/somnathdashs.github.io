{/* <iframe
    src="https://www.youtube-nocookie.com/embed/YDnZBzqUr-o?si=M80XaGuEgCAlHSbG"
    title="YouTube video player" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen></iframe>

 */}

const mykey = window.location.search;
const urlP = new URLSearchParams(mykey);
const ID = urlP.get("id");




function add3Dots(string, limit) {
    var dots = "... Check Out the Link ";
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


document.getElementById("SUrl").innerText = window.location;



const shareButton = document.querySelector('.share-button1');
const shareDialog = document.querySelector('.share-dialog');
const closeButton = document.querySelector('.close-button');
shareButton.addEventListener('click', event => {
    shareDialog.classList.add('is-open');
});
closeButton.addEventListener('click', event => {
    shareDialog.classList.remove('is-open');
    const div = document.getElementById('altt');
    div.innerHTML = ""
});




readTextFile("https://raw.githubusercontent.com/somnathdashs/somnathdashs.github.io/main/Datas/Series.json", async function (text) {
    try {
        const U = window.location;
        const Urll = "%0A%0A" + U + "%0A%0A";
        var data = JSON.parse(text);
        var arr = Object.values(data);
        var row = "";
        var col = "";
        var Count_col = 0;
        var Total_Videos = 0


        for (let i = 0; i < arr.length; i++) {
            var TArr = arr[i].Each_Video_Embed_Link;
            if (arr[i].ID == ID && typeof TArr === 'object') {
                document.title = arr[i].Name
                document.getElementById("Img_").src = arr[i].Cover_image
                document.getElementById("Title_").innerText = arr[i].Name
                document.getElementById("Des_").innerText = arr[i].Des
                document.getElementById("background_ID").setAttribute("style", `background-image: url('${arr[i].Cover_image}')`)
                document.getElementById("Img_").onclick = () => { window.open(arr[i].playlist_link, "_target") }

                var sharesB = `<a target="_blank" class="button" href="https://www.facebook.com/sharer/sharer.php?u=${Urll}">
    <svg>
        <use href="#facebook"></use>
    </svg>
    <span>Facebook</span>
</a>

<a class="button" target="_blank" href="https://twitter.com/intent/tweet?text=${add3Dots(arr[i].Des, 100)}&url=${Urll}&hashtags=${arr[i].Name.replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_")}">
    <svg>
        <use href="#twitter"></use>
    </svg>
    <span>Twitter</span>
</a>

<a class="button" target="_blank" href="https://wa.me/?text=${add3Dots(arr[i].Des, 100)}${Urll}" data-action="share/whatsapp/share">
    <svg>
        <use href="#whatsapp"></use>
    </svg>
    <span>Whatsapp</span>
</a>

<a class="button" target="_blank" href="mailto:?subject=${arr[i].Name} &body=${add3Dots(arr[i].Des, 100)}${Urll}">
    <svg>
        <use href="#email"></use>
    </svg>
    <span>Email</span>
</a>`
                document.getElementById("sorter").innerHTML = sharesB;
                document.getElementById("playlist").onclick = ()=>{window.open(arr[i].playlist_link)}
                document.getElementById("sourchcode").onclick = ()=>{window.open(arr[i].sourch_code)}
                var metadata = `
                <link href='${arr[i].Cover_image}' rel='image_src'/>
                <meta content='${U}' property='og:url'/>
                <meta content='${document.title}' property='og:title'/>
                <meta content='${add3Dots(arr[i].Des, 100)}' property='og:description'/>
                <meta content='${arr[i].Cover_image}' property='og:image'/>`
                document.head.innerHTML = metadata + document.head.innerHTML;
            

                for (let prop in TArr) {
                    if (TArr.hasOwnProperty(prop)) {
                        var VArr = TArr[prop];
                        var Videos = `<div class="col my-4">
                        <iframe class="mx-auto"
                        src="${VArr}"
                        title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                         allowfullscreen></iframe>
                        </div>`
                        col += Videos
                        Count_col += 1
                        Total_Videos += 1
                        
                        
                        if (Count_col == 3 || Count_col < 3 && arr.length - Total_Videos +1 == 0) {
                            var O_Row = `<div class="container text-center my-4">
                                <div class="row align-items-start mx-auto">
                                    ${col}          
                                </div>
                            </div>`
                            col = ``
                            Count_col = 0
                            row += O_Row
                        }

                    }
                }
                document.getElementById("MAIN_VIDEOS").innerHTML = row;
            }
        }
    } catch (error) {
        console.error("Error parsing JSON:", error);
    }
});
