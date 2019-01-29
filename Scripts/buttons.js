//Endereco do servidor
const address = "wss://pagina-server.glitch.me";
//Cria o objeto websocket
const server = new WebSocket(address);

//Id do usuario
var usr_id = "";

//Executa quando a janela for carregada
window.onload = function ()
{
	//Armazena uma parte da barra de enderecos
	var url = location.search;
	var i;
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

//Permite que o botao seja largado, se ele estiver sobre uma dropzone
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
//Se o botao for largado
window.drop = function (action)
{
	action.preventDefault();

	//Pega informacoes do botao
	var id = action.dataTransfer.getData("id");
	var dragged = document.getElementById(id);

	//console.log("DropzoneID: " + d_id);

	//Fixa o "filho" na dropzone
	action.target.appendChild(dragged);
	dragged.className += " dropped";
	//Permite que o botao possa criar outros ao clicar no mesmo
	dragged.setAttribute("onclick", "Kraftwerk(id)");

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

	//Se o calendario estiver ocultado
	if(document.getElementById("calendar").style.visibility != "visible")
		ShowCalendarius();
};

//Dropzone para devolver os botoes tomados
window.bZoneDrop = function (action)
{
	action.preventDefault();

	var id = action.dataTransfer.getData("id");
	var dragged = document.getElementById(id);

	action.target.appendChild(dragged);
	dragged.className = "botao";
	//Tira a possibilidade de criar outros botoes
	dragged.setAttribute("onclick", "");

	//Remove o status de "claim" do botao, assim ele fica disponivel novamente
	var msg = {type: "declaim", id: usr_id, chair: id};
	server.send(JSON.stringify(msg));
}

//Dropzone para devolver os botoes tomados
window.dZoneDrop = function (action)
{
	action.preventDefault();

	var id = action.dataTransfer.getData("id");
	var dragged = document.getElementById(id);
	var dz_id = action.target.id;

	console.log("button: " + id + " " + "dropzone: " + dz_id);

	action.target.appendChild(dragged);
	dragged.className += " dropped";
}

//Dropzone para destruir objetos
window.voidDrop = function (action)
{
	action.preventDefault();

	var id = action.dataTransfer.getData("id");
	var obj = document.getElementById(id);

	obj.remove();
	console.log(id + " foi enviado para outra dimensão...");
}

//O que isso faz mesmo???
//NOTA: Ah, ok
function SendInfo (chair)
{
	var msg = {type: "claim", id: usr_id, chair: chair};
	//console.log(msg);
	server.send(JSON.stringify(msg));
}

//Ativa/desativa os botoes de acordo com seu dono
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

//Numero de botoes criados
var b_num = 0;

//Cria um botao
//NOTA:	She's a model and she's looking good
function Kraftwerk (id)
{
	//Cria o objeto; botao
	var button = document.createElement("div");
	//MUDA MUDA MUDA MUDA MUDA o texto do botao
	button.innerHTML = id;
	//Adiciona um classe ao botao
	//NOTA: Necessario para o style do mesmo
	button.classList.add("botao");

	//Adiciona atributos ao botao
	button.setAttribute("draggable", "true");
	button.setAttribute("ondragstart", "button(event)");
	button.setAttribute("onclick", "Destroy(id)");

	//MUDA MUDA MUDA MUDA MUDA o id do botao
	//NOTA: Cada botao precisa ter um id unico
	button.id = "sub_" + id + "_" + b_num;
	b_num++;

	//console.log("Clicked: " + id);
	//Fixa o botao em algo
	document.body.appendChild(button);
}

//Cria um botao com o tempo agendado
//NOTA: Nome ousado...
function CreateTime ()
{

}

//Destroi um objeto :,[
function Destroy (id)
{
	var obj = document.getElementById(id);
	obj.remove();
	console.log(id + " foi enviado para outra dimensão");
}

//Habilita tudo relacionado ao calendario
function ShowCalendarius ()
{
	var dropz2 = document.getElementsByClassName("dropzone2");
	var dropz3 = document.getElementsByClassName("dropzone3");

	//Habilita o calendario & a voidzone
	document.getElementById("calendar").style.visibility = "visible";
	document.getElementsByClassName("voidzone")[0].style.visibility = "visible";

	//Deixa todas as dropzones visiveis
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
