//Endereco do servidor
const address = "wss://pagina-server.glitch.me";
//Cria o objeto websocket
const server = new WebSocket(address);

//Funcao chamada ao tentar fazer login
function Login ()
{
	//Pega os valores de "usuario" e "senha" respectivamente
	var user = document.getElementById("usr").value;
	var pass = document.getElementById("psswd").value;
	//Bool para validacao do usuario
	var valid = false;

	//Se ambos os campos estiverem vazios
	if(user == "socket" && pass == "")
		window.location.replace("https://giogarmr.github.io/socket.html");
	else if(user == "" && pass == "")
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

	var msg = {type: "saveusr", user: user, password: pass};
	console.log(msg);
	server.send(JSON.stringify(msg));

	return valid;
}

//Quando a conexao for estabelecida, tambem "desperta" o servidor
//caso o mesmo esteja "dormindo"
server.onopen = () =>
{
	console.log("Conectado ao servidor");
	//Habilita o botao de enviar quando houver conexao ao servidor
	document.getElementById("send").disabled = false;
	//console.log(msg);
}
