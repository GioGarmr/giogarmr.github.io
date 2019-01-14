const WebSocket = require("ws")
const server = new WebSocket.Server({ port: 8080 })

//Array de usuarios e senhas
var cur_usr = "", cur_pass = "";
var usr_id = "";
//Cadeiras do main.html
var py1 = 1, py2 = 1, py3 = 1, py4 = 1;

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
      ws.send(exist);
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
    else if(msgtype == "rmchair")
    {
      var id = msg.id;
	  Chairs(id);
      var msg = {py1: py1, py2: py2, py3: py3, py4: py4};
      ws.send(JSON.stringify(msg));
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
  //Retorna true se o user existe
  var exist = "false";

  var i;
  //Compara os usuarios e senhas
  for(i = 0; i <= users.length; i++)
  {
    //Caso o usuario exista, muda para "true"
    if(cur_usr == users[i] && cur_pass == pass[i])
      exist = "true";
  }

  if(cur_usr == "inacio" && exist == true)
    usr_id = "jkkbRKzwXC";

  return exist;
}

function Chairs (id)
{
	if(id == "py1")
	  py1 = 0;
	else if(id == "py2")
	  py2 = 0;
	else if(id == "py3")
	  py3 = 0;
	else if(id == "py4")
	  py4 = 0;
}
