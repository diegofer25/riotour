/* global Materialize */
app.controller('LoginController', LoginController);

function LoginController(){
	var vm = this;
	vm.logar = function logar(user){
		if(user && user.email == sessionStorage.getItem('email') && user.senha == sessionStorage.getItem('email')){
			window.location.href = 'https://riotour.azurewebsites.net/';
		}else{
			Materialize.toast('Login ou senha inválidos', 3000, 'center-align rounded red darken-4');
		}
	}
}