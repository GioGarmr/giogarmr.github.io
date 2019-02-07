//Basically the struggle...
var message = "Professor, da logo um 6 para nós";
var msgObj;

window.onload = function ()
{
	msgObj = document.getElementById("msg");
	//console.log(message[0]);
}

var i = 0;

setInterval(function ()
{
	if(message[i] != null)
	{
		msgObj.innerHTML += message[i];
		i++;
	}
}, 90);
