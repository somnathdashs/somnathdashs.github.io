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
    var dots = "...";
    if (string.length > limit) {
        // you can also use substr instead of substring
        string = string.substring(0, limit) + dots;
    }

    return string;
}
function GetSearch() {
    const mykey = window.location.search;
    const urlP = new URLSearchParams(mykey);
    const ID = urlP.get("Search");
    return ID
}



function Choose_data() {
    var url = GetSearch()
    if (url != null || url != undefined) {
        readTextFile("/Datas/Store.json", async function (text) {
            document.getElementById("SSS").value=url
            var data = await JSON.parse(text);
            arr = Object.values(data)
            arr = arr[0]
            arr.reverse()
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                const ele_array = arr[index]["ARRAY"]
                var Row_data = ""
                for (let ele_index = 0; ele_index < ele_array.length; ele_index++) {
                    const product_element = ele_array[ele_index];
                    if (product_element["SEARCH"].includes(url)) {

                        Row_data += `<li>
                    <div class="card mr-3 py-3" style="width: 18rem;">
                        <img class="img-thumbnail rounded mx-auto d-block" src="${product_element["ICOIMAGE"]}" alt="Network Error"> 
                        <div class="card-body">
                            <h5 class="card-title h5">${product_element["NAME"]}</h5>
                            <p class="card-text">${add3Dots(product_element["DIS"], 35)}</p>
                        </div>

                        <div class="card-body m-auto flex" style="justify-content: space-between;align-items: center;padding: 20px;">
                            <div>
                                <div class="flex">
                                    <h3 class="h3 mr-1">₹ <h3 class="h3">${product_element["PRICE"]}</h3></h3>
                                </div>
                                <div class="flex">
                                    <a style="color: cadetblue;">${add3Dots(product_element["TAGS"], 10)} </a>
                                </div>
                            </div>
                            <a href="${product_element["PATH"]}" style=" margin-left: 100px;" class="btn btn-outline-primary"><i class='bx bx-down-arrow-alt mt-1' style="font-size: 1.7rem;"></i></a>

                        </div>
                </li>`
                    }



                }
                Row = `<div class="card mx-2 my-4">
                <h5 class="h4 px-4 pt-2"><u>${element["CATAGORY"]}</u></h5>
                <ul class="flex pb-3 mx-3" style="overflow: auto;">
                ${Row_data}
                </ul>
                <br>
            </div>`
                if (index == 0) {
                    document.getElementById("MAIN_CARDSS").innerHTML = ""
                }
                document.getElementById("MAIN_CARDSS").innerHTML += Row;

            }
        });
    } else {
        readTextFile("/Datas/Store.json", async function (text) {
            var data = await JSON.parse(text);
            arr = Object.values(data)
            arr = arr[0]
            arr.reverse()
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                const ele_array = arr[index]["ARRAY"]
                var Row_data = ""
                for (let ele_index = 0; ele_index < ele_array.length; ele_index++) {
                    const product_element = ele_array[ele_index];
                    Row_data += `<li>
                    <div class="card mr-3 py-3" style="width: 18rem;">
                        <img class="img-thumbnail rounded mx-auto d-block" src="${product_element["ICOIMAGE"]}" alt="Network Error"> 
                        <div class="card-body">
                            <h5 class="card-title h5">${product_element["NAME"]}</h5>
                            <p class="card-text">${add3Dots(product_element["DIS"], 35)}</p>
                        </div>

                        <div class="card-body m-auto flex" style="justify-content: space-between;align-items: center;padding: 20px;">
                            <div>
                                <div class="flex">
                                    <h3 class="h3 mr-1">₹ <h3 class="h3">${product_element["PRICE"]}</h3></h3>
                                </div>
                                <div class="flex">
                                    <a style="color: cadetblue;">${add3Dots(product_element["TAGS"], 10)} </a>
                                </div>
                            </div>
                            <a href="${product_element["PATH"]}" style=" margin-left: 100px;" class="btn btn-outline-primary"><i class='bx bx-down-arrow-alt mt-1' style="font-size: 1.7rem;"></i></a>

                        </div>
                </li>`


                }
                Row = `<div class="card mx-2 my-4">
                <h5 class="h4 px-4 pt-2"><u>${element["CATAGORY"]}</u></h5>
                <ul class="flex pb-3 mx-3" style="overflow: auto;">
                ${Row_data}
                </ul>
                <br>
            </div>`
                if (index == 0) {
                    document.getElementById("MAIN_CARDSS").innerHTML = ""
                }
                document.getElementById("MAIN_CARDSS").innerHTML += Row;

            }
        });
    }
}

Choose_data()