                         // UPCOMING MOVIES \\
//----------------------------------------------------------------\\

function getUpcomingMovies(){
  $.ajax({
      method: 'GET',
      url: '/api/movies/upcoming'
  }).success(function(resp){
    console.log('successful in getting upcoming');
    generateUpcomingMovies(resp);

  });
}
function generateUpcomingMovies(movies){
  console.log("starting to generate upcoming movies");
  var base_path = "https://image.tmdb.org/t/p/original";
  for (var i = 0; i < movies.length; i++){
    // console.log(movies[i].poster_path)
    var poster_path = base_path + movies[i].poster_path;
    var movie_title = movies[i].title;
    var release_date = movies[i].release_date;
    var movie_id = movies[i].id;
    insertToUpcomingMovie(movie_id, release_date, movie_title, poster_path);
  };
}
// <h2>' +
//                  movie_title +
//                  '</h2>
function insertToUpcomingMovie(movie_id, release_date, movie_title, poster_path){
  console.log("starting to insert upcoming movies");
  var template = '<div class="hovereffect2 thisMovie" id="'+
                 movie_id+
                 '" data-toggle="modal" data-target=".modal"><img src="'+
                 poster_path +
                 '"><div class="overlay"><h2>'+
                 release_date+
                 '</h2><a class="info" href="#">++</a><a class="info" href="#">Seen</a></div></div>';
  $('#upcomingMoviesBox').append(template);
    click_a_NoRedirect();
    getMovieModal()
}

                          // USER MOVIES \\
//----------------------------------------------------------------\\

function getUserMoviesLists(){
  $.ajax({
      method: 'GET',
      url: '/api/user/movies'
  }).success(function(resp){
    console.log('successful in getting usermovies');
    generateUserMovies(resp);
    // console.log(resp.user_movie) user movie, includes preference and movie details
    // console.log(resp.user_movie[0].movie.background_path); get specific user movie movie detail
    // console.log(resp.user_movie[0].seen); get preference true / false
  });
}

function generateUserMovies(usermovies){
  console.log("starting to generate upcoming movies");
  var base_path = "https://image.tmdb.org/t/p/original";
  var usermoviesArray = usermovies.user_movie
  // console.log(usermoviesArray[0].seen)
  for (var i = 0 ; i < usermoviesArray.length ; i++){
    var usermovie = usermoviesArray[i].movie
    var background_path = base_path + usermovie.background_path;
    var movie_title = usermovie.title;
    var release_date = usermovie.release_date;
    var movie_id = usermovie.id;
    if (usermoviesArray[i].seen){
      insertToSeenMovieList(movie_id, release_date, movie_title, background_path)
    }else{
      insertToWantToWatchList(movie_id, release_date, movie_title, background_path)
    };
  }
};

function insertToSeenMovieList(movie_id, release_date, movie_title, background_path){
  console.log("Seen List --  " + movie_title)
  var template = '<div class="hovereffect thisMovie" id="'+
                 movie_id +
                 '" data-toggle="modal" data-target=".modal"><img src="'+
                 background_path +
                 '"><div class="overlay"><h2>' +
                 movie_title +
                 '</h2><a class="info" href="#">link here</a></div></div>';
  $('#seenBox').append(template);
    click_a_NoRedirect();
    getMovieModal();
}

function insertToWantToWatchList(movie_id, release_date, movie_title, background_path){
  console.log("Want To Watch List -- " + movie_title)
  var template = '<div class="hovereffect thisMovie" id="'+
                 movie_id+
                 '"><img src="'+
                 background_path +
                 '"><div class="overlay" data-toggle="modal" data-target=".modal"><h2>' +
                 movie_title +
                 '</h2><a class="info" href="#">link here</a></div></div>';
  $('#wantToWatchBox').append(template);
    click_a_NoRedirect();
    getMovieModal();
}
                     // Modal Information \\
//----------------------------------------------------------------\\

function getMovieModal(){

  $('.thisMovie').off().click(function(){
    console.log("Movie Clicked");
    var movieId = $(this).attr('id');
    console.log(movieId);
    getMovieDetails(movieId)
  });
};

function getMovieDetails(movieId){
  $.ajax({
    method: 'GET',
    url: '/api/movies/'+movieId
  }).success(function(resp){
    generateMovieDetails(resp);
    // console.log('successful in getting this movie');
    // console.log(resp.title);
  });
};

function generateMovieDetails(movie){
  var poster_base_path   = "https://image.tmdb.org/t/p/original"
  var trailer_base_path  = "https://www.youtube.com/embed/"
// "https://www.youtube.com/watch?v="
  var movie_title        = movie.title;
  var poster_path        = poster_base_path + movie.poster_path;
  var trailer_path       = trailer_base_path + movie.trailer_path;
  var overview           = movie.overview;
  var release_date       = movie.release_date;
  var director           = movie.director;
  var writer             = movie.writer;
  var cast               = movie.cast;
  insertToModal(movie_title, poster_path, trailer_path, overview, release_date, director, writer, cast)
  // console.log(movie.title)
  // console.log(movie.trailer_path)
};

function insertToModal(movie_title, poster_path, trailer_path, overview, release_date, director, writer, cast){
  // console.log(movie_title)
  // Title: Release Date: Director: Writer: Case:"
  var posterAndDetailsTemplate  = '<div id="modalPosterImg"><img src="' +
                                  poster_path +
                                  '"></div><div><p>Title:</p><h4>' +
                                  movie_title +
                                  '</h4><p>Release Date:</p><h4>' +
                                  release_date +
                                  '</h4><p>Director:</p><h4>' +
                                  director +
                                  '</h4><p>Writer:</p><h4>' +
                                  writer +
                                  '</h4><p>Cast:</p><h4>' +
                                  cast +
                                  '</h4></div>';
  var trailerAndPlotTemplate    = '<div class="embed-responsive embed-responsive-4by3"><iframe class="embed-responsive-item" src="' +
                                  trailer_path +
                                  '"></iframe></div>';

  $('.modal-title').html(movie_title);
  $('#posterAndDetails').html(posterAndDetailsTemplate);
  $('#trailerAndPlot').html(trailerAndPlotTemplate)


}




                     // On Click Functions \\
//----------------------------------------------------------------\\

function click_a_NoRedirect(){
  $('a').off().click(function(e){
    e.preventDefault();
    e.stopPropagation()
    console.log("link clicked");
  });
}


                         // INITIALIZE \\
//----------------------------------------------------------------\\
$('.home.index').ready(function(){
	console.log('home');
  getUpcomingMovies();
  getUserMoviesLists();

});


	// logout();

 //  function logout(){
 //  	$('#logout').on('click',function(){
 //  		$.auth.signOut();
 //  		window.location.href = "/login";
 //  	});
 //  }
