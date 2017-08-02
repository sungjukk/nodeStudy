function slideBar(){
	$('.ui.labeled.icon.sidebar').sidebar('toggle');
}

function showLoginForm() {
	$('.ui.basic.modal').modal('show');
}

function login() {
	$('#loginFrm').submit();
}