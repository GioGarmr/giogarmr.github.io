//Endereco do servidor
const address = "wss://pagina-server.glitch.me";
//Cria o objeto websocket
const server = new WebSocket(address);

var usr_id = "";

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
};

//Permite que o botao seja largado, se ele estiver sobre a area
window.allowDrop = function (action)
{
	action.preventDefault();
	//Pega o atributo e verifica
	if(action.target.getAttribute("draggable") == "true")
		action.dataTransfer.dropEffect = "none"; //Nao pode largar
	else
		action.dataTransfer.dropEffect = "all"; //Pode largar
};

//Funcao chamada pelo botao
window.button = function (action)
{
	action.dataTransfer.setData("id", action.target.id);
};

//Nota: A demo do RE2 Remake foi liberada, depois vejo isso
//Se o botao for largado em um lugar permitido
window.drop = function (action)
{
	action.preventDefault();

	//Pega o "numero" do botao
	var id = action.dataTransfer.getData("id");
	var dragged = document.getElementById(id);

	//Pega o id da dropzone
	var d_id = action.target.id;

	//console.log("DropzoneID: " + d_id);

	if(id == "py1" || id == "py2" || id == "py3" || id == "py4")
	{
		//Os ids acima so podem ser largados na zona "dz"
		if(d_id == "dz" || d_id == "bdz")
		{
			//Fixa o "filho" na dropzone
			action.target.appendChild(dragged);
			dragged.className += " dropped";
		}
	}

	//Printa o id do botao fixado
	console.log("dropped: " + id);

	if(id == "py1")
		SendInfo("py1");
	if(id == "py2")
		SendInfo("py2");
	if(id == "py3")
		SendInfo("py3");
	if(id == "py4")
		SendInfo("py4");

	if(document.getElementById("calendar").style.visibility != "visible")
		ShowCalendarius();
};

window.bZoneDrop = function (action)
{
	action.preventDefault();
	var id = action.dataTransfer.getData("id");
	var dragged = document.getElementById(id);

	action.target.appendChild(dragged);
	dragged.className = "botao";

	var msg = {type: "declaim", id: usr_id, chair: id};
	server.send(JSON.stringify(msg));
}

function SendInfo (chair)
{
	var msg = {type: "claim", id: usr_id, chair: chair};
	//console.log(msg);
	server.send(JSON.stringify(msg));
}

//Ativa ou desativa os botoes de acordo com seu dono
function Toggle (py1, py2, py3, py4)
{
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
}

function Click (id)
{
	console.log("Clicked: " + id);
}

function ShowCalendarius ()
{
	var calendar = document.getElementById("calendar");
	var dropz = document.getElementById("dz");
	var dropz2 = document.getElementsByClassName("dropzone2");
	var dropz3 = document.getElementsByClassName("dropzone3");

	calendar.style.visibility = "visible";
	for(var i = 0; i < dropz2.length; i++)
		dropz2[i].style.visibility = "visible";
	for(var i = 0; i < dropz3.length; i++)
		dropz3[i].style.visibility = "visible";
}

//Atualiza os botoes em um intervalo de 0,25 segundos
setInterval(function ()
{
	var msg = {type: "getchair"};
	server.send(JSON.stringify(msg));

	//Somente para teste
	//console.log("Atualizado");

	//Limpa o console?
	//console.clear();
}, 250);

server.onopen = () =>
{
	console.log("Conectado");
	document.getElementById("loading").style.visibility = "hidden";
	//console.log(msg);
	//Chair? WTF
	var msg = {type: "getchair"};

	server.send(JSON.stringify(msg));
}

//Caso a conexao seja encerrada
server.onclose = () =>
{
	console.log("Desconectado");
}

server.onmessage = (msg) =>
{
	//Armazena a mensagem do servidor
	var msgServer = JSON.parse(msg.data);

	//Somente para teste
	//console.log(msgServer);

	var py1 = msgServer.py1;
	var py2 = msgServer.py2;
	var py3 = msgServer.py3;
	var py4 = msgServer.py4;

	Toggle(py1, py2, py3, py4);
}
