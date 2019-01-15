const WebSocket = require("ws")
const server = new WebSocket.Server({ port: 8080 })

//Array de usuarios e senhas
var cur_usr = "", cur_pass = "";
var usr_id = "";
//Cadeiras do main.html
var py1 = "", py2 = "", py3 = "", py4 = "";
var closed = "";

//Quando o servidor estiver ativo
server.on("connection", (ws) =>
{
	//ws.send("Conectado ao servidor");
	ws.on("message", (message) =>
	{
		//ws.send("Mensagem recebida");
		//console.log(`Received message => ${message}`)
		var msg = JSON.parse(message);
		//Pega o tipo da mensagem
		var msgtype = msg.type;

		//Se o tipo da mensagem for "usr" - ou seja - verificacao de usuario
		if(msgtype == "usr")
		{
			//Armazena o que a funcao "Users" retornar
			var exist = Users();
			//ws.send("usr=" + name + " " + "is=" + exist);
			var msg = {exist: exist, id: usr_id};
			ws.send(JSON.stringify(msg));
		}
		//Salva informacoes do usuario
		else if(msgtype == "saveusr")
		{
			cur_usr = msg.user;
			cur_pass = msg.password;
		}
		//Pega a informacao de uso das cadeiras
		else if(msgtype == "getchair")
		{
			var msg = {py1: py1, py2: py2, py3: py3, py4: py4};
			//ws.send("hello");
			ws.send(JSON.stringify(msg));
		}
		//Tranca o uso da cadeira
		else if(msgtype == "claim")
		{
			var id = msgtype.id;
			var chair = msgtype.chair;
			Chairs(id, chair);
			var msg = {py1: py1, py2: py2, py3: py3, py4: py4};
			ws.send(JSON.stringify(msg));
		}
		//"Limpa" uma cadeira do id atual
		else if(msgtype == "clear")
		{
			var id = msg.id;
			Clear(id);
		}
	})
})

//Verifica os usuarios
function Users ()
{
	//Array de usuarios
	var users = ["inacio", "DIO", "admin"];
	//Array de senhas
	var pass = ["cafe123", "dioDa", "admin"];
	//Ids dos usuarios
	var id = ["jkkbRKzwXC", "", ""];
	//Retorna true se o user existe
	var exist = "false";

	var i;
	//Compara os usuarios e senhas
	for(i = 0; i <= users.length; i++)
	{
		//Caso o usuario exista, muda para "true"
		if(cur_usr == users[i] && cur_pass == pass[i])
		{
			exist = "true";
			usr_id = id[i];
		}
	}

	return exist;
}

//Relaciona as cadeiras com os users
function Chairs (id, chair)
{
	if(chair == "py1" && chair == "")
		py1 = id;
	else if(chair == "py2" && chair == "")
		py2 = id;
	else if(chair == "py3" && chair == "")
		py3 = id;
	else if(chair == "py4" && chair == "")
		py4 = id;
}

//Remove um id relacionada a uma cadeira
function Clear (id)
{
	if(py1 == id)
		py1 = "";
	else if(py2 == id)
		py2 = "";
	else if(py3 == id)
		py3 = "";
	else if(py4 == id)
		py4 = "";
}
