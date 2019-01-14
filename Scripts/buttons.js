//Endereco do servidor
const address = "wss://pagina-server.glitch.me";
//Cria o objeto websocket
const server = new WebSocket(address);

var dropped = [];

//Permite que o botao seja largado, se ele estiver sobre da area
window.allowDrop = function(action)
{
	action.preventDefault();
	//Pega o atributo e verifica
	if(action.target.getAttribute("draggable") == "true")
		action.dataTransfer.dropEffect = "none"; //Nao pode largar
	else
		action.dataTransfer.dropEffect = "all"; //Pode largar
};

//Funcao chamada pelo botao
window.button = function(action)
{
	action.dataTransfer.setData("id", action.target.id);
	//GetInfo();
};

//Nota: A demo do RE2 Remake foi liberada, depois vejo isso
//Se o botao for largado em um lugar permitido
window.drop = function(action)
{
	action.preventDefault();
	var calendar = document.getElementById("calendar");

	//Pega o "numero" do botao
	var id = action.dataTransfer.getData("id");
	var dragged = document.getElementById(id);

	//Fixa o "filho" na "dropzone"
	action.target.appendChild(dragged);
	dragged.className += " dropped";

	//Printa o id do botao fixado
	console.log("dropped: " + id);
	dropped.push(id);

	console.log(dropped);

	if(id == "py1")
		SendInfo("rmchair", "py1");
	if(id == "py2")
		SendInfo("rmchair", "py2");
	if(id == "py3")
		SendInfo("rmchair", "py3");
	if(id == "py4")
		SendInfo("rmchair", "py4");

	//Gambiarra para manter a tela do calendario alinhada
	//calendar.style.marginTop = "-55px";
	calendar.style.visibility = "visible";
};

var py1 = 0;
var py2 = 0;
var py3 = 0;
var py4 = 0;

function SendInfo (type, id)
{
	var msg = {type: type, id: id};
	server.send(JSON.stringify(msg));
}

//Atualiza os botoes em um intervalo de meio segundo
setInterval(function ()
{
	var msg = {type: "getchair"};
	server.send(JSON.stringify(msg));

	if(py1 == 1)
	{
		document.getElementById("py1").style.visibility = "visible";
		//document.getElementById("dz").children[0].style.visibility = "visible";
	}
	else
	{
		if(dropped != "py1")
			document.getElementById("py1").style.visibility = "hidden";
		//document.getElementById("dz").children[0].style.visibility = "hidden";
	}
	if(py2 == 1)
		document.getElementById("py2").style.visibility = "visible";
	else
		document.getElementById("py2").style.visibility = "hidden";
	if(py3 == 1)
		document.getElementById("py3").style.visibility = "visible";
	else
		document.getElementById("py3").style.visibility = "hidden";
	if(py4 == 1)
		document.getElementById("py4").style.visibility = "visible";
	else
		document.getElementById("py4").style.visibility = "hidden";

	var i;
	for(i = 0; i < 5; i++)
	{
		if(dropped[i] == "py1")
			document.getElementById("py1").style.visibility = "visible";
		if(dropped[i] == "py2")
			document.getElementById("py2").style.visibility = "visible";
		if(dropped[i] == "py3")
			document.getElementById("py3").style.visibility = "visible";
		if(dropped[i] == "py4")
			document.getElementById("py4").style.visibility = "visible";
	}

	console.log("Atualizado");
}, 500);

server.onopen = () =>
{
	console.log("Conectado ao servidor");
	//Habilita o botao de enviar quando houver conexao ao servidor
	document.getElementById("loading").style.visibility = "hidden";
	//console.log(msg);
	var msg = {type: "getchair"};

	server.send(JSON.stringify(msg));
}

server.onmessage = (e) =>
{
	//Armazena a mensagem do servidor
	var msgServer = JSON.parse(e.data);
	//var msgServer = e.data;
	py1 = msgServer.py1;
	py2 = msgServer.py2;
	py3 = msgServer.py3;
	py4 = msgServer.py4;

	console.log(msgServer);
}
