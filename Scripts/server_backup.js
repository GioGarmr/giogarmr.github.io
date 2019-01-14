const WebSocket = require("ws")
const server = new WebSocket.Server({ port: 8080 })

var cur_usr = "";
var cur_pass = "";

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
    //Salvar informacoes do usuario
    else if(msgtype == "saveusr")
    {
      cur_usr = msg.user;
      cur_pass = msg.password;
    }
  })
})

//Verifica os usuarios
function Users ()
{
  //Array de usuarios
  var users = ["inacio", "DIO"];
  //Array de senhas
  var pass = ["cafe123", "dioda"];
  //Retorna true se existe, se nao - false
  var exist = "false";

  var i = 0;
  //Compara os usuarios e senhas
  for(i = 0; i <= users.length; i++)
  {
    //Caso o usuario exista, muda para "true"
    if(cur_usr == users[i] && cur_pass == pass[i])
      exist = "true";
  }

  return exist;
}
