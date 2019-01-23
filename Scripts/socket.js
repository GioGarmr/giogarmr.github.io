//Endereco do servidor
const address = "wss://pagina-server.glitch.me";
//Cria o objeto websocket
const server = new WebSocket(address);

//Quando a conexao for estabelecida
server.onopen = () =>
{
	//var msg = "Kimi... mō JoJo to kisu wa shita no kai? Madada yo nā. Hajimete no aite wa JoJo de wa nai!";
	var msg = {type: "usr", user: "inacio", password: "cafe123"}

	//Envia uma mensagem ao servidor
	//server.send(msg);
	server.send(JSON.stringify(msg));
	console.log(msg);
	//Adiciona o conteudo de "msg" a+a label
	//document.getElementById("sent").innerHTML += msg;
}

//Caso ocorra um erro...
server.onerror = (error) =>
{
	console.log(`WebSocket error: ${error}`);
}

//Quando a mensagem do servidor for recebida
server.onmessage = (msg) =>
{
	//Armazena a mensagem do servidor
	var msgServer = msg.data;

	console.log(msgServer);
	//Adiciona o conteudo de "msgServer" a+a label
	//document.getElementById("reply").innerHTML += msgServer;
}
