qr=new XMLHttpRequest();
qr.open('get','/H_F/Head.html');
qr.send();
qr.onload=function(){document.getElementById("HEAD__").innerHTML=qr.responseText}

qr1=new XMLHttpRequest();
qr1.open('get','/H_F/Footer.html');
qr1.send();
qr1.onload=function(){document.getElementById("FOOT__").innerHTML=qr1.responseText}