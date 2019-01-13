//Funcao chamada ao tentar fazer login
function Login ()
{
	//Pega os valores de "usuario" e "senha" respectivamente
	var user = document.getElementById("usr").value;
	var pass = document.getElementById("psswd").value;
	//Valor a retorna para procedimento de envio
	var send = false;

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
		send = true;
	}

	if(user == "inacio" && pass == "cafe123")
		send = true;

	//console.log("usr=" + user + "\n" + "pass=" + pass);
	//Retorna o bool
	return send;
}
