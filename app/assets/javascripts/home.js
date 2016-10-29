                           // UPCOMING MOVIES \\
//-------------------------------------------------------------------------\\

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
    var poster_img_path = base_path + movies[i].poster_path;
    var movie_title = movies[i].title;
    var release_date = movies[i].release_date;
    var movie_id = movies[i].id;
    insertToUpcomingMovie(movie_id, release_date, movie_title, poster_img_path);
  };
}
// <h2>' +
//                  movie_title +
//                  '</h2>
function insertToUpcomingMovie(movie_id, release_date, movie_title, poster_img_path){
  console.log("starting to insert upcoming movies");
  var template = '<div class="hovereffect2" data-toggle="modal" data-target=".modal"><img src="'+
                 poster_img_path +
                 '"><div class="overlay"><h2>'+
                 release_date+
                 '</h2><a class="info" href="#">++</a><a class="info" href="#">Seen</a></div></div>';
  $('#upcomingMoviesBox').append(template);
    $('a').off().click(function(e){
      e.preventDefault();
      e.stopPropagation()
      console.log("link clicked")
    })
}

                          // USER MOVIES \\
//-------------------------------------------------------------------------\\

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
    var background_img_path = base_path + usermovie.background_path;
    var movie_title = usermovie.title;
    var release_date = usermovie.release_date;
    var movie_id = usermovie.id;
    if (usermoviesArray[i].seen){
      insertToSeenMovieList(movie_id, release_date, movie_title, background_img_path)
    }else{
      insertToWantToWatchList(movie_id, release_date, movie_title, background_img_path)
    };
  }
};

function insertToSeenMovieList(movie_id, release_date, movie_title, background_img_path){
  console.log("Seen List --  " + movie_title)
  var template = '<div class="hovereffect" data-toggle="modal" data-target=".modal"><img src="'+
                 background_img_path +
                 '"><div class="overlay"><h2>' +
                 movie_title +
                 '</h2><a class="info" href="#">link here</a></div></div>';
  $('#seenBox').append(template);
    $('a').off().click(function(e){
      e.preventDefault();
      e.stopPropagation()
      console.log("link clicked")
    })
}
function insertToWantToWatchList(movie_id, release_date, movie_title, background_img_path){
  console.log("Want To Watch List -- " + movie_title)
  var template = '<div class="hovereffect"><img src="'+
                 background_img_path +
                 '"><div class="overlay" data-toggle="modal" data-target=".modal"><h2>' +
                 movie_title +
                 '</h2><a class="info" href="#">link here</a></div></div>';
  $('#wantToWatchBox').append(template);
    $('a').off().click(function(e){
      e.preventDefault();
      e.stopPropagation()
      console.log("link clicked")
    })

}
                             // INITIALIZE \\
//-------------------------------------------------------------------------\\
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
