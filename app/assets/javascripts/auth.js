// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$('.auth.index').ready(function(){
	$('#signup').hide();
	$('.navbar-right').hide()

	$('#login-form').on('submit', function(e){
		e.preventDefault();
		$.auth.emailSignIn({
			email: $('#loginEmailInput').val(),
			password: $('#loginPasswordInput').val(),
		}).then(function(user){
			window.location.href = "/";
		}).fail(function(resp){
			alert('Authentication failure: ' + resp.errors.join(' '));
		});
	});

	$('#signup-form').on('submit', function(e){
		e.preventDefault();
		$.auth.emailSignUp({
			name: $('#signUpNameInput').val(),
			email: $('#signUpEmailInput').val(),
			password: $('#signUpPasswordInput').val(),
			password_confirmation: $('#signUpPasswordConfirmInput').val()
		}).then(function(user){
			// alert('Welcome ' + user.name + '!');
			window.location.href = "/";
		}).fail(function(resp){
			alert('Authentication failure: ' + resp.errors.join(' '));
		});
	});

	bindShowHideEventListeners();
});

function bindShowHideEventListeners(){

	$('#showMeSignUp').on('click',function(){
		$('#login').hide();
		$('#signup').show();
	});

	$('#showMeLogIn').on('click',function(){
		$('#login').show();
		$('#signup').hide();
	});
}