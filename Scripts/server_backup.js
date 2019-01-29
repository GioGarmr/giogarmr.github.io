const WebSocket = require("ws")
const server = new WebSocket.Server({ port: 8080 })

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
			//Armazena os valores que a funcao "Users" retornar
			var rtrn = Users(user, passwd);
			//ws.send("usr=" + name + " " + "is=" + exist);
			var m_msg = {type: "reply", exist: rtrn[0], id: rtrn[1]};
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
		//Liberta um botao
		else if(msgtype == "declaim")
		{
			var id = msg.id;
			var chair = msg.chair;
			DeClaim(id, chair);
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
		else if(msgtype == "getusers")
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
	var users = ["inacio", "anderson", "alisson", "saulo"];
	//Array de senhas
	var pass = ["python", "netacad", "c", "fluxograma"];
	//Ids dos usuarios
	var id = ["jkkbRKzwXC", "FdKjHsqkC5", "lnILiNfkw8", "xh3pZstzq7"];
	//Salva o id do user - temporariamente
	var u_id;
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
			u_id = id[i];
		}
		if(exist == "true")
		{
			//Verifica se o user esta online
			for(var g = 0; g <= on_users.length; g++)
			{
				if(u_id == on_users[g])
				exist = "logged";
			}
		}
	}

	//Retorna os valores em um array
	return [exist, u_id];
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

function DeClaim (id, chair)
{
	if(chair == "py1")
	{
		if(py1 == id)
		py1 = "";
	}
	else if(chair == "py2")
	{
		if(py2 == id)
		py2 = "";
	}
	else if(chair == "py3")
	{
		if(py3 == id)
		py3 = "";
	}
	else if(chair == "py4")
	{
		if(py4 == id)
		py4 = "";
	}
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
