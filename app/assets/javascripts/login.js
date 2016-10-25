// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$('.login.index').ready(function(){
	console.log('login')
	$('#login-form').on('submit', function(){
		$.auth.emailSignIn({
			email: $('#login-form input[name="email"]').val(),
			password: $('#login-form input[name="password"]').val(),
		}).then(function(user){
			alert('Welcome ' + user.name + '!');
		}).fail(function(resp){
			alert('Authentication failure: ' + resp.errors.join(' '));
	});
	});



	$('#signup-form').on('submit', function(e){
		e.preventDefault()
		$.auth.emailSignUp({

			email: $('#signup-form input[name="email"]').val(),
			password: $('#signup-form input[name="password"]').val(),
			password_confirmation: $('#signup-form input[name="password_confirmation"]').val()
		}).then(function(user){
			alert('Welcome ' + user.name + '!');
		}).fail(function(resp){
			alert('Authentication failure: ' + resp.errors.join(' '));
		});
	});
})