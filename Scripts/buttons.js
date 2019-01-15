//Endereco do servidor
const address = "wss://pagina-server.glitch.me";
//Cria o objeto websocket
const server = new WebSocket(address);

var usr_id = "";
//var dropped = [];
var py1 = "";
var py2 = "";
var py3 = "";
var py4 = "";

//Executa quando a janela for carregada
window.onload = function ()
{
	var i;
	//Armazena uma parte da barra de enderecos
	var url = location.search;

	//Pega o id do user na barra de endereco
	for(i = 0; ; i++)
	{
		if(url[i] == "=")
		{
			i += 1;
			for(i; ; i++)
			{
				if(url[i] == null)
					break;
				usr_id += url[i];
			}
			break;
		}
	}

	console.log("id=" + usr_id);
};

//Executa antes da janela ser fechada ou atualizada
window.onbeforeunload = function ()
{
	var msg = {type: "clear", id: usr_id};
	server.send(JSON.stringify(msg));
	py1 = "";
	py2 = "";
	py3 = "";
	py4 = "";
};

//Permite que o botao seja largado, se ele estiver sobre a area
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
	//dropped.push(id);

	//console.log(dropped);

	if(id == "py1")
		SendInfo("py1");
	if(id == "py2")
		SendInfo("py2");
	if(id == "py3")
		SendInfo("py3");
	if(id == "py4")
		SendInfo("py4");

	//Gambiarra para manter a tela do calendario alinhada
	//calendar.style.marginTop = "-55px";
	calendar.style.visibility = "visible";
};

function SendInfo (chair)
{
	var msg = {type: "claim", id: usr_id, chair: chair};
	console.log(msg);
	server.send(JSON.stringify(msg));
}

//Atualiza os botoes em um intervalo de 0,2 segundos
setInterval(function ()
{
	var msg = {type: "getchair"};
	server.send(JSON.stringify(msg));

	if(py1 == "" || py1 == usr_id)
		document.getElementById("py1").style.visibility = "visible";
	else
		document.getElementById("py1").style.visibility = "hidden";
	if(py2 == "" || py2 == usr_id)
		document.getElementById("py2").style.visibility = "visible";
	else
		document.getElementById("py2").style.visibility = "hidden";
	if(py3 == "" || py3 == usr_id)
		document.getElementById("py3").style.visibility = "visible";
	else
		document.getElementById("py3").style.visibility = "hidden";
	if(py4 == "" || py4 == usr_id)
		document.getElementById("py4").style.visibility = "visible";
	else
		document.getElementById("py4").style.visibility = "hidden";

	/*var i;
	//Verifica os botoes que foram largados pelo individuo
	for(i = 0; i <= dropped.length; i++)
	{
		if(dropped[i] == "py1")
			document.getElementById("py1").style.visibility = "visible";
		if(dropped[i] == "py2")
			document.getElementById("py2").style.visibility = "visible";
		if(dropped[i] == "py3")
			document.getElementById("py3").style.visibility = "visible";
		if(dropped[i] == "py4")
			document.getElementById("py4").style.visibility = "visible";
	}*/

	//Somente para teste
	//console.log("Atualizado");
	
	//Limpa o console?
	console.clear();
}, 200);

server.onopen = () =>
{
	console.log("Conectado ao servidor");
	//Habilita o botao de enviar quando houver conexao ao servidor
	document.getElementById("loading").style.visibility = "hidden";
	//console.log(msg);
	//Chair? WTF
	var msg = {type: "getchair"};

	server.send(JSON.stringify(msg));
}

server.onmessage = (e) =>
{
	//Armazena a mensagem do servidor
	var msgServer = JSON.parse(e.data);

	//Somente para teste
	console.log(msgServer);

	py1 = msgServer.py1;
	py2 = msgServer.py2;
	py3 = msgServer.py3;
	py4 = msgServer.py4;
}
