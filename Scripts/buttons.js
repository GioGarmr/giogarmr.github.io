//Permite que o botao seja largado, se ele estiver sobre da area
window.allowDrop = function(ev)
{
	ev.preventDefault();
	//Pega o atributo e verifica
	if(ev.target.getAttribute("draggable") == "true")
	ev.dataTransfer.dropEffect = "none"; //Nao pode largar
	else
	ev.dataTransfer.dropEffect = "all"; //Pode largar
};

//Funcao chamada pelo botao
window.button = function(ev)
{
	ev.dataTransfer.setData("id", ev.target.id);
};

//Nota: A demo do RE2 Remake foi liberada, depois vejo isso
//Se o botao for largado em um lugar permitido
window.drop = function(ev)
{
	ev.preventDefault();
	var calendar = document.getElementById("calendar");

	//Pega o "numero" do botao
	var id = ev.dataTransfer.getData("id");
	var dragged = document.getElementById(id);

	//Fixa o "filho" na "dropzone"
	ev.target.appendChild(dragged);
	dragged.className += " dropped";

	//Se o botao com um certo id for largado, um link sera aberto
	//Orange Justice
	/*if(id == "orange")
	{
		window.open("https://www.youtube.com/watch?v=qeKpP7-_xiI", "_blank");
		console.log("Orange justice");
	}
	//Piton, isso mesmo
	else if(id == "pit")
	{
		window.open("https://cdnbr2.img.sputniknews.com/images/1203/99/12039919.jpg", "_blank");
		console.log("Piton");
	}*/

	//Printa o id do botao fixado
	console.log("dropped: " + id);

	/*if(id == "py1")
	dragged.innerHTML = "Python" + spacing + "1";*/

	//Gambiarra para manter a tela do calendario alinhada
	calendar.style.marginTop = "-55px";
	calendar.style.visibility = "visible";
};

/*window.can_drag = function(act)
{
ev.dataTransfer.setData("n", ev.target.id);
};*/
