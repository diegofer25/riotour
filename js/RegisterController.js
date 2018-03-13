app.controller('RegisterController', RegisterController);

function RegisterController(){
	var vm = this;
	vm.registrar = function registrar(user){
		if(user.nome && user.email && user.senha){
			sessionStorage.setItem('nome', user.nome);
			sessionStorage.setItem('email', user.email);
			sessionStorage.setItem('senha', user.senha);
			window.location.href = "https://riotour.azurewebsites.net/";
		}		
	};
}