// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
    // <div class="item active">
    //     <div class="col-md-4">
    //         <a href="#"><img src="http://placehold.it/250x250" class="img-responsive center-block"></a>
    //         <div class="text-center">1</div>
    //     </div>
    // </div>
function getUpcomingMovies(){
  $.ajax({
      method: 'GET',
      url: '/api/movies/upcoming'
  }).success(function(resp){
    console.log('successful in getting upcoming');
    //function that builds the user's profile page
    generateUpcomingMovies(resp);
    // var poster_path = resp[0]
    // poster_path = poster_path.poster_path
    // console.log(poster_path)
  });
}

function generateUpcomingMovies(movies){
  console.log("starting to generate upcoming movies");
  var base_path = "https://image.tmdb.org/t/p/w185";
  // console.log(movies)
  for (var i = 0; i < movies.length; i++){
    // console.log(movies[i].poster_path)
    var poster_img_path = base_path + movies[i].poster_path;
    var movie_title = movies[i].title;
    var release_date = movies[i].release_date;
    var movie_id = movies[i].id;
    if (poster_img_path == null || movie_title == null || release_date == null || movie_id == null){
      console.log("not enough information");
    }else{
      insertUpcomingMovie(movie_id, release_date, movie_title, poster_img_path);
    }
  }
}

function insertUpcomingMovie(movie_id, release_date, movie_title, poster_img_path){
  console.log("starting to insert upcoming movies");
  var template = '<img src="'+
                 poster_img_path +
                 '">';
  $('#upcomingMoviesBox').append(template);
}

$('.home.index').ready(function(){
	console.log('home');
	logout();

  function logout(){
  	$('#logout').on('click',function(){
  		$.auth.signOut();
  		window.location.href = "/login";
  	});
  }
	getUpcomingMovies();
});
