// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
function generateProfilePage(name,email){
	$('#welcome').text(name + "'s profile")
	$('#name').text("Name: " + name)
	$('#email').text("Email: " + email)
	$('#editNameInput').val(name)
	$('#editEmailInput').val(email)
}

function gettingUserMovieLibrary(){
	$.ajax({
		method: 'GET',
		url: '/api/user/movies'
	}).success(function(resp){
		console.log(resp.user_movie);
		for(var i = 0; i < resp.user_movie.length; i++){
			newElem =	'<div class="col-xs-4">' + 
							'<img class="img-responsive" src="http://image.tmdb.org/t/p/original/'+ resp.user_movie[i].movie.poster_path +'">' +
						'</div>';
			$('#movieDisplay').append(newElem);
		}
	})
}


function getInfoForProfilePage(){
	$.ajax({
		method: 'GET',
		url: '/api/user'
	}).success(function(resp){
		//function that builds the user's profile page
		generateProfilePage(resp.name,resp.email);
	});
}

function editUserInfo(){
	var newName = $('#editNameInput').val();
	var newEmail = $('#editEmailInput').val();
	console.log(newName);
	console.log(newEmail);
	$.auth.updateAccount({
		name: newName,
		email: newEmail
	});
	generateProfilePage(newName,newEmail)
	$('#viewDetails').show();
	$('#editDetails').hide();
}


$('.profile.index').ready(function(){
	getInfoForProfilePage();
	$('#editDetails').hide();

	$('#showEditSection').on('click',function(e){
		e.preventDefault();
		$('#viewDetails').hide();
		$('#editDetails').show();
	});

	$('#makeChangesBtn').on('click',function(e){
		e.preventDefault();
		editUserInfo();
	})

	gettingUserMovieLibrary();	
	// code for updating the user account!!
	// $.auth.updateAccount({
	// 	email: 'test@test.com'
	// });

	//code for destroying the current user
	// $.auth.destroyAccount();

	// code for signingout
	// $.auth.signOut();
});