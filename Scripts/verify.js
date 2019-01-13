//Executa quando a tela for carregada
window.onload = function ()
{
	//Armazena - a parte que interessa - da barra de endereco
	var info = location.search;

	//console.log(info);

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
	document.getElementById("pss").innerHTML = "password=" + pass;*/

	//Redireciona para a pagina principal
	window.location.replace("https://giogarmr.github.io/main.html");
}

/*console.log("usr=" + usr);
console.log("pass=" + pass);*/
