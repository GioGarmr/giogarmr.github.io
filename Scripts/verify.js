//Endereco do servidor
const address = "wss://pagina-server.glitch.me";
//Cria o objeto websocket
const server = new WebSocket(address);

//Quando a conexao for estabelecida
server.onopen = () =>
{
	var msg = {type: "usr"};

	//Tipo "usr" - ou seja - para verificacao de usuario
	server.send(JSON.stringify(msg));
}

//Quando a mensagem do servidor for recebida
server.onmessage = (msg) =>
{
	//Armazena a mensagem do servidor
	var msgServer = JSON.parse(msg.data);
	console.log(msgServer);

	var id = msgServer.id;
	//console.log(is);

	if(msgServer.exist == "false")
		window.location.replace("https://giogarmr.github.io/index.html");
	else
	{
		//Deixa o servidor saber que o user esta online
		var s_msg = {type: "register", id: id};
		server.send(JSON.stringify(s_msg));
		//window.location.replace("file:///D:/Programming/HTML/Inacio/main.html?id=" + id);
		window.location.replace("https://giogarmr.github.io/main.html?id=" + id);
	}
}

//Executa quando a tela for carregada
/*window.onload = function ()
{
	//Armazena - a parte que interessa - da barra de endereco
	var info = location.search;

	var usr = "";
	var pass = "";

	var i;
	//Pega o login e a senha, depois os armazena em variaveis
	for(i = 0; ; i++)
	{
		//Login
		if(info[i] == "=" && usr == "")
		{
			i += 1;
			for(i; ; i++)
			{
				if(info[i] == "&" || info[i] == null)
					break;
				usr += info[i];
			}
		}
		//Senha
		if(info[i] == "=")
		{
			i += 1;
			for(i; ; i++)
			{
				//Quebra o loop se não houver caractere
				if(info[i] == null)
					break;
				pass += info[i];
			}
			break;
		}
	}

	/*document.getElementById("usr").innerHTML = "login=" + usr;
	document.getElementById("pss").innerHTML = "password=" + pass;

	//Redireciona para a pagina principal
	//window.location.replace("https://giogarmr.github.io/main.html");
}*/
