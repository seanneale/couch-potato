// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$('.home.index').ready(function(){
	console.log('home')
	logout();
})

function logout(){
	$('#logout').on('click',function(){
		$.auth.signOut();
		window.location.href = "/login";
	})
	
}