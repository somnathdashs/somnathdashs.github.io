function htmlFunc() {
    var name =document.getElementById('nametxt').value;
    var email =document.getElementById('email').value.toLowerCase();
    var number =document.getElementById('telno').value;
    var message =document.getElementById('msgbox').value;
    const div = document.getElementById('my_alert');
    if (name && email && number && message){
        var all= "Name : "+name +"\n"+"Email Address :"+email+"\n"+"Mobile number : "+number+"\n"+"About Project : "+message;
        var all1= "Name : "+name +"%0A%0A"+"Email Address : "+email+"%0A%0A"+"Mobile number : "+number+"%0A%0A"+"About Project : "+message;
        window.location.href = "mailto:pinudash104@gmail.com?subject=Let do some projects together. &body="+all1;
    }else[  
        div.innerHTML = '<div class="alert alert-danger text-center" style="display: block; margin-left: auto; margin-right: auto; transition:  1s ease; pad" role="alert"> <button type="button" onclick="close_aler()" class="btn-close alert_close" aria-label="Close"></button> You must have to fill all the boxes before you sumbit.</div>'
    ]

}

function close_aler(){
    const div = document.getElementById('my_alert');
    div.innerHTML = ""
}