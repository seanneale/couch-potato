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
		generateLibraryMovies(resp.user_movie)
		// for(var i = 0; i < resp.user_movie.length; i++){
		// 	newElem =	'<div class="col-xs-4">' + 
		// 					'<img class="img-responsive" src="http://image.tmdb.org/t/p/original/'+ resp.user_movie[i].movie.poster_path +'">' +
		// 				'</div>';
		// 	$('#movieDisplay').append(newElem);
		// }
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

function generateLibraryMovies(movies){

  console.log("starting to generate upcoming movies");
  var base_path        = "https://image.tmdb.org/t/p/original";

  for (var i = 0; i < movies.length; i++){ // for each upcoming movie in database
    // console.log(movies[i].poster_path)
    // variables to pass
    var poster_path    = base_path + movies[i].movie.poster_path;
    var movie_title    = movies[i].movie.title;
    var release_date   = movies[i].movie.release_date;
    var movie_id       = movies[i].movie.id;
    //appending a div to upComingMoviesBox
    insertToLibraryMovie(movie_id, release_date, movie_title, poster_path);
  }; // close for loop

} // close generateUpcoming Movies

function insertToLibraryMovie(movie_id, release_date, movie_title, poster_path){

  console.log("starting to insert upcoming movies");
  var template =  '<div class="hovereffect2 thisMovie" id="'              +
                  movie_id                                                +
                  '"data-toggle="modal" data-target=".modal"><img src="' +
                  poster_path                                             +
                  '"><div class="overlay"><h2>'                           +
                  release_date                                            +
                  '</h2><a class="info" href="" id="addToWantToWatch">++</a><a class="info" href="" id="addToSeen">Seen</a></div></div>';
  $('#libraryMoviesBox').append(template);
  //   // On Click '+', if usermovie does not exist, add to usermovies list
  // addToWantToWatchList();
  // // On Click '+', if usermovie does not exist, add to usermovies list
  // addSeenList();
  // On Click of modal, open modal with movie information
  getMovieModal();

} // close insertToUpcomingMovie


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

	$('#deleteAccountBtn').on('click',function(e){
		e.preventDefault();
		$.auth.destroyAccount();
		window.location.href = "/auth";
	})

	$('#logoutBtn').on('click',function(){
		$.auth.signOut();
		window.location.href = "/auth";
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