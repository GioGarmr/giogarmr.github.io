//Endereco do servidor
const address = "wss://pagina-server.glitch.me";
//Cria o objeto websocket
const server = new WebSocket(address);

//Desativa o botao assim que a janela for carregada
window.onload = function ()
{
	document.getElementById("send").disabled = true;
}

//Funcao chamada ao tentar fazer login
function Login ()
{
	//Pega os valores de "usuario" e "senha" respectivamente
	var user = document.getElementById("usr").value;
	var pass = document.getElementById("psswd").value;
	//Bool para validacao do usuario
	var valid = false;

	/*if(user == "socket" && pass == "")
		window.location.replace("https://giogarmr.github.io/socket.html");*/
	//Se ambos os campos estiverem vazios
	if(user == "" && pass == "")
		document.getElementById("warning").innerHTML = "Preencha todos os campos";
	//Se somente o usuario estiver vazio
	else if(user == "" && pass != "")
		document.getElementById("warning").innerHTML = "Usuário vazio";
	//Se somente a senha estiver vazia
	else if(user != "" && pass == "")
		document.getElementById("warning").innerHTML = "Senha vazia";
	//Se a senha e o usuario forem "admin"
	else if(user == "admin" && pass == "admin")
		document.getElementById("warning").innerHTML = "Oh, no";
	//Se ambos tiverem algum conteudo
	else if(user != "" && pass != "")
	{
		document.getElementById("warning").innerHTML = "";
		valid = true;
	}

	//Envia os dados e muda para a checagem
	if(valid == true)
	{
		var msg = {type: "saveusr", user: user, password: pass};
		console.log(msg);
		server.send(JSON.stringify(msg));
		//window.location.replace("file:///D:/Programming/HTML/Inacio/check.html");
		window.location.replace("https://giogarmr.github.io/check.html");
	}
}

//Quando a conexao for estabelecida. Tambem reinicia o servidor
//caso o mesmo esteja "dormindo"
server.onopen = () =>
{
	console.log("Conectado ao servidor");
	//Habilita o botao de enviar quando houver conexao com o servidor
	document.getElementById("send").disabled = false;
	var msg = {type: "getU"};
	server.send(JSON.stringify(msg));
	//console.log(msg);
}

//Quando uma mensagem do servidor for recebida
server.onmessage = (msg) =>
{
	//Armazena a mensagem do servidor
	var msgServer = JSON.parse(msg.data);
	console.log(msgServer);
}
