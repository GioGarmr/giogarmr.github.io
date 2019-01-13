//Endereco do servidor
const address = "wss://interesting-moon.glitch.me";
//Cria o objeto websocket
const server = new WebSocket(address);

//Quando a conexao for estabelecida
server.onopen = () =>
{
	var msg = "Kimi... mō JoJo to kisu wa shita no kai? Madada yo nā. Hajimete no aite wa JoJo de wa nai!";

	//A mensagem em "msg" para o sevidor
	server.send(msg);
	//console.log(msg);
	//Adiciona o conteudo de "msg" a+a label
	document.getElementById("sent").innerHTML += msg;
}

//Caso ocorra um erro...
server.onerror = (error) =>
{
	console.log(`WebSocket error: ${error}`);
}

//Quando a mensagem do servidor for recebida
server.onmessage = (e) =>
{
	//Armazena a mensagem do servidor
	var msgServer = e.data;

	//console.log(msgServer);
	//Adiciona o conteudo de "msgServer" a+a label
	document.getElementById("reply").innerHTML += msgServer;
}
