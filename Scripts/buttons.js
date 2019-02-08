//Endereco do servidor
const address = "wss://pagina-server.glitch.me";
//Cria o objeto websocket
const server = new WebSocket(address);

//Id do usuario
var usr_id = "";
//Numero de botoes criados
var b_num = 0;
//Armazena qualquer horario fixo
var fixed_hr = [];

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
		//Caso nao haja um id; Impede um loop infinito
		else if(url[i] == null)
		{
			window.location.replace("file:///D:/Programming/HTML/Inacio/main.html?id=none");
			//window.location.replace("https://giogarmr.github.io/main.html?id=none");
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
	//Ids que podem ser largados nesta dropzone
	var index_permittere = ["py1", "py2", "py3", "py4"];

	//Verifica se o id esta incluso no indice de ids permitidos
	for(var i = 0; i < index_permittere.length; i++)
	{
		if(id == index_permittere[i])
		{
			//Fixa o "filho" na dropzone
			action.target.appendChild(dragged);
			dragged.className += " dropped";
			//Permite que o botao possa criar outros ao clicar no mesmo
			dragged.setAttribute("onclick", "Kraftwerk(id)");
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

	//console.log("RETURNED:" + id);

	//Destroi seus clones
	for(var i = 0; i < b_num; i++)
	{
		var obj = document.getElementById("sub_" + id + "_" + i);
		//Se o objeto for encontrado
		if(obj)
			obj.remove();
	}

	//Remove o status de "claim" do botao, assim ele fica disponivel novamente
	var msg = {type: "declaim", id: usr_id, chair: id};
	server.send(JSON.stringify(msg));
};

//Dropzone para os dias e horario
window.dZoneDrop = function (action)
{
	action.preventDefault();

	var id = action.dataTransfer.getData("id");
	var dragged = document.getElementById(id);
	//Pega o id da dropzone
	var dz_id = action.target.id;

	console.log("button: " + id + " " + "dropzone: " + dz_id);

	if(id[0] == "s")
	{
		//Se o objeto nao tiver um "child", o botao sera fixado
		if(!document.getElementById(dz_id).firstChild)
		{
			action.target.appendChild(dragged);
			dragged.className += " dropped";
		}
	}
};

//Dropzone para destruir objetos
window.voidDrop = function (action)
{
	action.preventDefault();

	var id = action.dataTransfer.getData("id");
	var obj = document.getElementById(id);

	if(id[0] != "p")
	{
		obj.remove();
		//Cream
		console.log(id + " foi enviado para outra dimensão...");
	}
};

//Dropzone para agendar salas
window.classDrop = function (action)
{
	action.preventDefault();

	var id = action.dataTransfer.getData("id");
	var dragged = document.getElementById(id);
	//Pega o id da dropzone
	//var dz_id = action.target.id;

	if(id[0] == "(")
	{
		action.target.appendChild(dragged);
		dragged.className += " dropped";
	}
};

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
	button.setAttribute("onclick", "TheWorld(id, parentNode.id)");

	//MUDA MUDA MUDA MUDA MUDA o id do botao
	//NOTA: Cada botao precisa ter um id unico
	button.id = "sub_" + id + "_" + b_num;
	b_num++;

	//console.log("Clicked: " + id);
	//Fixa o botao em algo
	var dropzone = document.getElementById("bdz");
	dropzone.appendChild(button);
}

//Cria um botao com o tempo agendado
function TheWorld (id, dz_id)
{
	//Cria o objeto - botao
	var button = document.createElement("div");
	//MUDA MUDA MUDA MUDA MUDA o texto do botao

	//console.log("THIS BUTTON IS:" + id);

	var buttonid = "";
	var collect = false;
	for(var i = 0; i < id.length; i++)
	{
		if(id[i] == "p")
			collect = true;
		if(collect && id[i] != null && id[i] != "_")
			buttonid += id[i];
		if(id[i] == "_")
			collect = false;
	}

	//console.log("NAME:" + buttonid);

	//Cadeiras: Py1, Py2, Py3 e Py4
	if(id.substring(0,7) == "sub_py1")
		button.innerHTML += "Py";
	else if(id.substring(0,7) == "sub_py2")
		button.innerHTML += "Py2";
	else if(id.substring(0,7) == "sub_py3")
		button.innerHTML += "Py3";
	else if(id.substring(0,7) == "sub_py4")
		button.innerHTML += "Py4";

	//Adiciona o id ao botao
	//button.innerHTML += buttonid;

	//Adiciona um classe ao botao
	//NOTA: Necessario para o style do mesmo
	button.classList.add("botao");

	//Adiciona atributos ao botao
	button.setAttribute("draggable", "true");
	button.setAttribute("ondragstart", "button(event)");
	//button.setAttribute("onclick", "TheWorld(id, parentNode.id)");

	//MUDA MUDA MUDA MUDA MUDA o id do botao
	//NOTA: Cada botao precisa ter um id unico
	button.id = "(" + dz_id + "$" + id;
	b_num++;

	//console.log("WORLD:" + id)

	//console.log("id: " + id + " " + "dzId: " + dz_id);
	//Fixa o botao em algo
	var dropzone = document.getElementById("bdz");
	dropzone.appendChild(button);
}

//Destroi um objeto :,(
/*function Destroy (id)
{
	document.getElementById(id).remove();
}*/

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

	ShowClassrooms();
}

//Habilita a janela de salas de aula
function ShowClassrooms ()
{
	var dropz = document.getElementsByClassName("classdropzone");

	document.getElementById("classrooms").style.visibility = "visible";

	for(var i = 0; i < dropz.length; i++)
		dropz[i].style.visibility = "visible";
}

//Atualiza informacoes em um intervalo de 0,25 segundos
setInterval(function ()
{
	//Array de dropzones
	var dropzones = [];
	//Dropzone para verificacao
	var cur_zone;

	//Atualiza as cadeiras
	var msg = {type: "getchair"};
	server.send(JSON.stringify(msg));

	//Joga as dropzones no array; It just works
	dropzones.push(document.getElementById("dz1_7"));
	dropzones.push(document.getElementById("dz1_10"));
	dropzones.push(document.getElementById("dz2_7"));
	dropzones.push(document.getElementById("dz2_10"));
	dropzones.push(document.getElementById("dz3_7"));
	dropzones.push(document.getElementById("dz3_10"));
	dropzones.push(document.getElementById("dz4_7"));
	dropzones.push(document.getElementById("dz4_10"));
	dropzones.push(document.getElementById("dz5_7"));
	dropzones.push(document.getElementById("dz5_10"));

	//console.log(dropzones);

	//Verifica as dropzones no array
	//NOTA: Nao sei se isso pode impactar a performance, mas funciona, ou seja, nao mexa
	/*for(var i = 0; i < dropzones.length; i++)
	{
		//Se a dropzone tiver um "filho"
		if(dropzones[i].firstChild)
		{
			var child = dropzones[i].firstChild;
			console.log("childId: " + child.id + " " + "dropzoneId: " + dropzones[i].id);
		}
	}*/

	//Armazena as dropzones das salas de aula
	var labsdropzs = document.getElementsByClassName("classdropzone");

	//Verifica as dropzones das salas de aula
	for(var i = 0; i < labsdropzs.length; i++)
	{
		//Se tal dropzone tiver um "child"
		if(labsdropzs[i].firstChild)
		{
			var child = labsdropzs[i].firstChild;
			//console.log("CHILD:" + child.id + " " + "DROPZONE:" + labsdropzs[i].id);

			//Pega todas as informacoes necessarias do botao
			var collect = false;
			var b_id = "";
			for(var g = 0; g < child.id.length; g++)
			{
				if(child.id[g] == "*")
					break;
				if(child.id[g] == "$")
				{
					collect = true;
					g++;
				}
				if(collect == true && child.id[g] != null)
					b_id += child.id[g];
			}

			var master = document.getElementById(b_id);
			//Id do botao
			var childId = child.id;
			//Id da zone do botao
			var childZoneId = child.parentNode.id;
			//Id da zone do master
			var masterZoneId = master.parentNode.id;

			//Printa as informacoes do botao e do seu "mestre"
			console.log("CLASS_BUTTON_ID:" + childId + " " + "DROPZONE:" + childZoneId);
			console.log("CLASS_BUTTON_MASTER:" + b_id + " " + "DROPZONE:" + masterZoneId);

			//AQUI EM DIANTE SERA A MODIFICACAO DAS INFORMACOES DO BOTAO

			//NOTA: O substring usa uma certa parte da string
			//Segunda
			if(masterZoneId.substring(0,3) == "dz1")
				child.innerHTML = "Seg";
			//Terca
			else if(masterZoneId.substring(0,3) == "dz2")
				child.innerHTML = "Ter";
			//Quarta
			else if(masterZoneId.substring(0,3) == "dz3")
				child.innerHTML = "Qua";
			//Quinta
			else if(masterZoneId.substring(0,3) == "dz4")
				child.innerHTML = "Qui";
			//Sexta
			else if(masterZoneId.substring(0,3) == "dz5")
				child.innerHTML = "Sex";

			//Horario A e B
			if(masterZoneId.substring(4,5) == "7")
				child.innerHTML += "(A)";
			else
				child.innerHTML += "(B)";

			//Cadeiras: Py1, Py2, Py3 e Py4
			if(b_id.substring(0,7) == "sub_py1")
				child.innerHTML += "Py";
			else if(b_id.substring(0,7) == "sub_py2")
				child.innerHTML += "Py2";
			else if(b_id.substring(0,7) == "sub_py3")
				child.innerHTML += "Py3";
			else if(b_id.substring(0,7) == "sub_py4")
				child.innerHTML += "Py4";

			//Atualiza as informacoes do Botao
			//Mesmo esquema, ex: (dz1_7$sub_py1_0
			child.id = "(" + masterZoneId + "$" + b_id + "*" + childZoneId;
		}
	}

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
