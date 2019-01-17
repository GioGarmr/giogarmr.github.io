const WebSocket = require("ws")
const server = new WebSocket.Server({ port: 8080 })

//Id do ultimo usuario a fazer requisicao
var usr_id = "";
//Cadeiras do main.html
var py1 = "", py2 = "", py3 = "", py4 = "";
//Users online
var on_users = [""];

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
		//ws.send(JSON.stringify(msg));

		//Verificacao de usuario
		if(msgtype == "usr")
		{
			var user = msg.user;
      var passwd = msg.password;
      //Armazena o que a funcao "Users" retornar
			var exist = Users(user, passwd);
			//ws.send("usr=" + name + " " + "is=" + exist);
			var m_msg = {type: "reply", exist: exist, id: usr_id};
			ws.send(JSON.stringify(m_msg));
		}
		//Pega a informacao de uso das cadeiras
		else if(msgtype == "getchair")
		{
			var m_msg = {py1: py1, py2: py2, py3: py3, py4: py4};
			//ws.send("hello");
			ws.send(JSON.stringify(m_msg));
		}
		//Tranca o uso da cadeira
		else if(msgtype == "claim")
		{
			var id = msg.id;
			var chair = msg.chair;
			//var msg = {type: id};
			//ws.send(JSON.stringify(msg));
			Chairs(id, chair);
			//var msg = {type: "claimed", py1: py1, py2: py2, py3: py3, py4: py4};
		}
		//Chama a funcao "Clear"
		else if(msgtype == "clear")
		{
			var id = msg.id;
			//Deleta a id do user no array
			//NOTA: Esse metodo nao e confiavel
			//delete on_users[id];
			Clear(id);
		}
		//Deixa um user online
		else if(msgtype == "register")
		{
			var id = msg.id;
			on_users.push(id);
		}
		//Pega os usuarios que estao online
		else if(msgtype == "getU")
		{
			var m_msg = {online_users: on_users};
			ws.send(JSON.stringify(m_msg));
		}
	})
})

//Verifica os usuarios
function Users (user, passwd)
{
	//Array de usuarios
	var users = ["inacio", "DIO", "admin"];
	//Array de senhas
	var pass = ["cafe123", "dioda", "admin"];
	//Ids dos usuarios
	var id = ["jkkbRKzwXC", "FdKjHsqkC5", "aDmIn"];
	//Retorna true se o user existe
	var exist = "false";

	var i;
	//Compara os usuarios e senhas
	for(i = 0; i <= users.length; i++)
	{
		//Caso o usuario exista, muda para "true"
		if(user == users[i] && passwd == pass[i])
		{
			exist = "true";
			usr_id = id[i];
		}
		if(exist == "true")
		{
			//Verifica se o user esta online
			for(var g = 0; g <= on_users.length; g++)
			{
				if(usr_id == on_users[g])
				  exist = "logged";
			}
		}
	}

	return exist;
}

//Relaciona as cadeiras com os users
function Chairs (id, chair)
{
	if(chair == "py1" && py1 == "")
		py1 = id;
	else if(chair == "py2" && py2 == "")
		py2 = id;
	else if(chair == "py3" && py3 == "")
		py3 = id;
	else if(chair == "py4" && py4 == "")
		py4 = id;
}

//Remove um id relacionado a uma ou mais cadeiras
function Clear (id)
{
	if(py1 == id)
		py1 = "";
	if(py2 == id)
		py2 = "";
	if(py3 == id)
		py3 = "";
	if(py4 == id)
		py4 = "";

	//Muda o status do id para offline
	for(var i = 0; i < on_users.length; i++)
	{
		if(on_users[i] == id)
		{
			on_users.splice(i, 1);
			  break;
		}
	}
}
