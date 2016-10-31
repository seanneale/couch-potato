

// Modal Information

function getMovieModal(){

  $('.thisMovie').off().click(function(){
    console.log("Movie Clicked");
    var movieId = $(this).attr('id');
    console.log("This Movie's ID is " + movieId);
    getMovieDetails(movieId);
  }); // close '$.thisMovie'
}; // close getMovieModal

function getMovieDetails(movieId){

  $.ajax({
    method   : 'GET',
    url      : '/api/movies/'+movieId
  }).success(function(resp){
    generateMovieDetails(resp);
    // console.log('successful in getting this movie');
    // console.log(resp.title);
  }); // close success, ajax
}; // close getMovieDetails

function generateMovieDetails(movie){

  var poster_base_path   = "https://image.tmdb.org/t/p/original"
  var trailer_base_path  = "https://www.youtube.com/embed/"
  // "https://www.youtube.com/watch?v="
  var movie_title        = movie.title;
  var poster_path        = poster_base_path  + movie.poster_path;
  var trailer_path       = trailer_base_path + movie.trailer_path;
  var overview           = movie.overview;
  var release_date       = movie.release_date;
  var director           = movie.director;
  var writer             = movie.writer;
  var cast               = movie.cast;
  insertToModal(movie_title, poster_path, trailer_path, overview, release_date, director, writer, cast)
  // console.log(movie.title)
  // console.log(movie.trailer_path)
}; // close generateMovieDetails

function insertToModal(movie_title, poster_path, trailer_path, overview, release_date, director, writer, cast){

  // console.log(movie_title)
  // Title: Release Date: Director: Writer: Case:"
  var posterAndDetailsTemplate  = '<div id="modalPosterImg"><img src="' +
                                  poster_path                           +
                                  '"></div><div><p>Title:</p><h4>'      +
                                  movie_title                           +
                                  '</h4><p>Release Date:</p><h4>'       +
                                  release_date                          +
                                  '</h4><p>Director:</p><h4>'           +
                                  director                              +
                                  '</h4><p>Writer:</p><h4>'             +
                                  writer                                +
                                  '</h4><p>Cast:</p><h4>'               +
                                  cast                                  +
                                  '</h4></div>';

  var trailerAndPlotTemplate    = '<div class="embed-responsive embed-responsive-4by3">' +
                                  '<iframe class="embed-responsive-item" src="'          +
                                  trailer_path                                           +
                                  '"></iframe></div><div><h4>'                           +
                                  overview                                               +
                                  '</h4></div>';

  $('.modal-title').html(movie_title);
  $('#posterAndDetails').html(posterAndDetailsTemplate);
  $('#trailerAndPlot').html(trailerAndPlotTemplate)
}; // close insertToModal


// UPCOMING MOVIES

function getUpcomingMovies(){

  $.ajax({
      method   : 'GET',
      url      : '/api/movies/upcoming'
  }).success(function(resp){
    console.log('successful in getting upcoming');
    generateSuggestedMovies(resp,'#upcomingMoviesBox');
  }); // close success, ajax
} // close getUpcomingMovies


function generateSuggestedMovies(movies,destination){

  console.log("starting to generate upcoming movies");
  var base_path        = "https://image.tmdb.org/t/p/original";

  for (var i = 0; i < movies.length; i++){ // for each upcoming movie in database
    // console.log(movies[i].poster_path)
    // variables to pass
    var poster_path    = base_path + movies[i].poster_path;
    var movie_title    = movies[i].title;
    var release_date   = movies[i].release_date;
    var movie_id       = movies[i].id;
    //appending a div to upComingMoviesBox
    insertToSuggestedMovie(movie_id, release_date, movie_title, poster_path,destination);
  }; // close for loop

} // close generateUpcoming Movies


function insertToSuggestedMovie(movie_id, release_date, movie_title, poster_path,destination){

  console.log("starting to insert upcoming movies");
  var template =  '<div class="hovereffect2 thisMovie" id="'              +
                  movie_id                                                +
                  '"data-toggle="modal" data-target=".modal"><img src="' +
                  poster_path                                             +
                  '"><div class="overlay"><h2>'                           +
                  release_date                                            +
                  '</h2><a class="info" href="" id="addToWantToWatch">++</a><a class="info" href="" id="addToSeen">Seen</a></div></div>';
  $(destination).append(template);
    // On Click '+', if usermovie does not exist, add to usermovies list
  addToWantToWatchList();
  // On Click '+', if usermovie does not exist, add to usermovies list
  addSeenList();
  // On Click of modal, open modal with movie information
  getMovieModal();

} // close insertToUpcomingMovie



                     // USER MOVIES
//---------------------------------------------------\\

////////////////////////////////////////////////////////
function getUserMoviesLists(){
  $.ajax({
      method   : 'GET',
      url      : '/api/user/movies'
  }).success(function(resp){
    console.log('successful in getting usermovies');
    generateUserMovies(resp);

    $('.UpcomingMoviesHeader').attr('id', resp.user.id);
    // console.log("check for" + resp.user.id);
    // var upcomingID = $('.UpcomingMoviesHeader').attr('id')
    // console.log(typeof(upcomingID));
    // console.log(resp.user_movie) user movie, includes preference and movie details
    // console.log(resp.user_movie[0].movie.background_path); get specific user movie movie detail
    // console.log(resp.user_movie[0].seen); get preference true / false
  }); // close success, ajax

} // close getUserMoviesLists


function generateUserMovies(usermovies){

  console.log("starting to generate upcoming movies");
  var base_path           = "https://image.tmdb.org/t/p/original";
  // access usermovies data, and query through hash and array
  var usermoviesArray     = usermovies.user_movie
       // console.log(usermoviesArray[0].seen)
  // loop through all user's movies
  for (var i = 0 ; i < usermoviesArray.length ; i++) {
    var usermovieId       = usermoviesArray[i].id
    var usermovie         = usermoviesArray[i].movie
    var postser_path      = base_path + usermovie.poster_path;
    var movie_title       = usermovie.title;
    var release_date      = usermovie.release_date;
    var movie_id          = usermovie.id;
    // if user has seen the movie vs not seen the movie
    if (usermoviesArray[i].seen) {
      insertToSeenMovieList(movie_id, release_date, movie_title, postser_path, usermovieId)
    } else {
      insertToWantToWatchList(movie_id, release_date, movie_title, postser_path, usermovieId)
    }; // close if statement
  }; // close for loop

}; // close generateUserMovies


function insertToSeenMovieList(movie_id, release_date, movie_title, postser_path, usermovieId){

  var template = '<div class="hovereffect2 thisMovie" id="'            +
                 movie_id                                              +
                 '"data-toggle="modal" data-target=".modal"><img src="'+
                 postser_path                                          +
                 '"><div class="overlay" id="'                         +
                 usermovieId                                           +
                 '"><h2>'                                              +
                 movie_title                                           +
                 '</h2><a class="info" href="" id="addToSeenFromWant">Seen</a></div></div>';

  console.log("Seen List --  " + movie_title);
  console.log(usermovieId);
  $('#seenBox').append(template);
  getMovieModal();

} // close insertToSeenMovieList


function insertToWantToWatchList(movie_id, release_date, movie_title, postser_path, usermovieId){

  var template = '<div class="hovereffect2 thisMovie" id="'            +
                 movie_id                                              +
                 '"data-toggle="modal" data-target=".modal"><img src="'+
                 postser_path                                          +
                 '"><div class="overlay" id="'                         +
                 usermovieId                                           +
                 '"><h2>'                                              +
                 movie_title                                           +
                 '</h2><a class="info" href="" id="addToSeenFromWant">Seen</a></div></div>';

  console.log("Want To Watch List -- " + movie_title);
  console.log(usermovieId)
  $('#wantToWatchBox').append(template);
  addToSeenFromWant()
  getMovieModal();

} // close insertToSeenMovieList




                    // Add New UserMovie '++'' or 'Seen'
//---------------------------------------------------\\

function createUserMovie(createUserMovieData){
    $.ajax({
      method      : 'POST',
      url         : '/api/user/movies',
      data        : createUserMovieData,
      dataType    : 'json',
      success     : function(resp) {
                      console.log('finished running ajax POST usermovies');
                      console.log(resp);
                      // console.log(resp.movie_id);
                      appendNewUserMovie(resp);
                    },
      error       : function(resp) {
                      console.log(resp);
                      console.log("ajax error");
                    }
    }); // close success, ajax
} // close createUserMovie

function appendNewUserMovie(movie){
  var movieId = movie.movie_id
  if (movie.seen) {
    ajaxAppendSeenMovie(movieId)
    } else {
            ajaxAppendNotSeenMovie(movieId)
    };

}
function ajaxAppendSeenMovie(movieId){
  $.ajax({
    method   : 'GET',
    url      : '/api/movies/'+movieId
  }).success(function(resp){
    getSeenMovieDetails(resp);
  }); // close success, ajax
}
function ajaxAppendNotSeenMovie(movieId){
  $.ajax({
    method   : 'GET',
    url      : '/api/movies/'+movieId
  }).success(function(resp){
    getNotSeenMovieDetails(resp);
  }); // close success, ajax
}
////////////////////////////////////////////////////////////////////////////////////////


function getSeenMovieDetails(movie){

  var base_path         = "https://image.tmdb.org/t/p/original";
  var postser_path      = base_path + movie.poster_path;
  var movie_title       = movie.title;
  var release_date      = movie.release_date;
  var movie_id          = movie.id;

  $.ajax({
    method   : 'GET',
    url      : '/api/user/movies'
  }).success(function(resp){
    console.log('successful in getting usermovies');
    var array = resp.user_movie;
    var obj = array.filter(function(obj){
      return obj.movie_id == movie_id;
    })[0];
    // console.log(array);
    // console.log(obj);
    var usermovieId = obj.id
    console.log (usermovieId)
    console.log(movie_title)
    insertToSeenMovieList(movie_id, release_date, movie_title, postser_path, usermovieId)
  }); // close success, ajax



} // close getSeenMovieDetails

function getNotSeenMovieDetails(movie){
  var base_path         = "https://image.tmdb.org/t/p/original";
  var postser_path      = base_path + movie.poster_path;
  var movie_title       = movie.title;
  var release_date      = movie.release_date;
  var movie_id          = movie.id;

  $.ajax({
    method   : 'GET',
    url      : '/api/user/movies'
  }).success(function(resp){
    console.log('successful in getting usermovies');
    var array = resp.user_movie;
    var obj = array.filter(function(obj){
      return obj.movie_id == movie_id;
    })[0];
    // console.log(array);
    // console.log(obj);
    var usermovieId = obj.id
    console.log (usermovieId)
    console.log(movie_title)
    insertToWantToWatchList(movie_id, release_date, movie_title, postser_path, usermovieId)
  }); // close success, ajax
}

function addToWantToWatchList(){
  $('.overlay #addToWantToWatch').off().click(function(e){

    e.preventDefault();
    e.stopPropagation()


    var movieId               = $(this).parent().parent().attr('id');
    movieId                   = parseInt(movieId);
    var userId                = $('.UpcomingMoviesHeader').attr('id')
    userId                    = parseInt(userId)
    console.log("Clicked on Add To Want, This Movie ID is " + movieId);
    console.log("User's ID: "+ userId);
    // console.log(typeof(movieId));
    // console.log(typeof(userId));
    var createUserMovieData   = {
                            movie_id   : movieId,
                            user_id    : userId,
                            seen       : false,
                            rated      : false,

                            }; // close createUserMovieData

    createUserMovie(createUserMovieData);

  }); // close $('.overlay #addToWantToWatch')
}; // close addToWantToWatchList


function addSeenList(){

  $('.overlay #addToSeen').off().click(function(e){

    e.preventDefault();
    e.stopPropagation()

    // console.log(typeof(userId));

    var movieId               = $(this).parent().parent().attr('id');
    movieId                   = parseInt(movieId);
    var userId                = $('.UpcomingMoviesHeader').attr('id')
    userId                    = parseInt(userId)
    console.log("Clicked on Add To Seen, This Movie ID is " + movieId);
    console.log("User's ID: "+ userId);

    var createUserMovieData   = {
                            movie_id   : movieId,
                            user_id    : userId,
                            seen       : true,
                            rated      : false,
    }; // close createUserMovieData

    createUserMovie(createUserMovieData);

  }); // close $('.overlay #addToSeen')

} // close addSeenList

function addToSeenFromWant(){
  $('.overlay #addToSeenFromWant').off().click(function(e){

    e.preventDefault();
    e.stopPropagation()
    console.log("add to seen clicked");
    var usermovieId          = $(this).parent().attr('id');
    // console.log(usermovieId);
// need usermovie
    // console.log(typeof(movieId));
    // console.log(typeof(userId));
    var updateUserMovieData   = {
                            seen       : true,
                            rated      : false,

                            }; // close updateUserMovie

    updateUserMovie(updateUserMovieData, usermovieId);

  }); // close $('.overlay #addToWantToWatch')
}; // close addToWantToWatchList

function updateUserMovie(updateUserMovieData, usermovieId){
  $.ajax({
    method      : 'PATCH',
    url         : '/api/user/movies/' + usermovieId,
    data        : updateUserMovieData,
    dataType    : 'json',
    success     : function(resp) {
                    console.log('finished running ajax PATCH usermovies');
                    console.log(resp);
                    // console.log(resp.movie_id);
                    // updateUserMovieToSeen(resp);
                  },
    error       : function(resp) {
                    console.log(resp);
                    console.log("ajax error");
                  }
  }); // close success, ajax
};

function updateUserMovieToSeen(movie){
  var movieId = movie.movie_id
  updateAjaxToSeen(movieId)

}


                    // Extra On Click Functions
//---------------------------------------------------\\

function turnYoutubeVideoOff(){

  $('.modal').on('hidden.bs.modal', function () {
    $('.modal iframe').removeAttr('src');
  }) //turns youtube video off when modal is closed

} // close turnYoutubeVideoOff



                    // INITIALIZE
//---------------------------------------------------\\

$('.home.index').ready(function(){

  console.log('home');
  getUpcomingMovies();
  getUserMoviesLists();
  turnYoutubeVideoOff();
  searchLocalEventListener();
  $('.searchMoviesHeader').hide();
  $('#searchMoviesRow').hide();
}); // close (.home.index).ready

// SEARCHING FOR FILMS
function searchLocalEventListener(){
  $('#searchLocalBtn').on('click',function(){
    var searchField = $('#searchBox').val()
    $('#searchMoviesBox').html("");
    $.ajax({
      method: 'GET',
      url: '/api/movies/search-local',
      data: {title: searchField}
    }).success(function(resp){
      $('.searchMoviesHeader').show();
      $('#searchMoviesRow').show();
      if(resp.length == 0){
        moreResults = "<li>" +
                        "<div class='col-xs-12' id='searchRemoteBtn></div>" +
                      "</li>";
        $('#searchResults').append(moreResults);
        searchRemoteResult();
      } else {
        for(var i = 0; i < resp.length; i++){
          var base_path      = "https://image.tmdb.org/t/p/original";
          var poster_path    = base_path + resp[i].poster_path;
          var movie_title    = resp[i].title;
          var release_date   = resp[i].release_date;
          var movie_id       = resp[i].id;
          //appending a div to upComingMoviesBox
          insertToSuggestedMovie(movie_id, release_date, movie_title, poster_path,'#searchMoviesBox');
        }
        moreResults = "<li>" +
                        "<div class='col-xs-12' id='searchRemoteBtn'>For more results click here..</div>" +
                      "</li>";
        $('#searchResults').append(moreResults);
        $('#searchRemoteBtn').on('click',function(){
          searchRemoteResult();
        })
      }
    })
  });
}

function searchRemoteResult(){
  $('#searchRemoteBtn').text("Oooh, going a little further for these results, please be patient")
  var searchField = $('#searchBox').val()
  $.ajax({
    method: 'GET',
    url:'api/movies/search-remote',
    data: {title: searchField}
  }).success(function(resp){
    console.log(resp);
    for(var i = 0; i < resp.length; i++){
      var base_path      = "https://image.tmdb.org/t/p/original";
      var poster_path    = base_path + resp[i].poster_path;
      var movie_title    = resp[i].title;
      var release_date   = resp[i].release_date;
      var movie_id       = resp[i].id;
      //appending a div to upComingMoviesBox
      insertToSuggestedMovie(movie_id, release_date, movie_title, poster_path,'#searchMoviesBox');
      $('#searchRemoteBtn').parent().remove();
    }
  })
}




  // logout();

 //  function logout(){
 //   $('#logout').on('click',function(){
 //     $.auth.signOut();
 //     window.location.href = "/login";
 //   });
 //  }

