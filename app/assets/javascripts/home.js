

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
  var movieId            = movie.id;
  insertToModal(movie_title, poster_path, trailer_path, overview, release_date, director, writer, cast, movieId)
  // console.log(movie.title)
  // console.log(movie.trailer_path)
}; // close generateMovieDetails

function insertToModal(movie_title, poster_path, trailer_path, overview, release_date, director, writer, cast, movieId){

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
  modalAddToWantToWatchList(movieId);
  modalAddToSeenList(movieId);
  modalDeleteUserMovie(movieId);
}; // close insertToModal

function modalDeleteUserMovie(movieId){

  $('#modalDeleteUserMovie').off().click(function(e){

    e.preventDefault();
    e.stopPropagation()
    var userId                = $('.UpcomingMoviesHeader').attr('id')
    userId                    = parseInt(userId)
    console.log("User's ID: "+ userId);

    $.ajax({
      method      : 'GET',
      url         : '/api/user/movies',
      dataType    : 'json',
      success     : function(resp) {
        // console.log(movieId);
        var array = resp.user_movie;
        var obj = array.filter(function(obj){
          return obj.movie_id == movieId;
        })[0];
        // console.log(array);
        // console.log(obj);
        // console.log(obj.id);
        usermovieId = obj.id
        // var usermovieId = obj.id
        // console.log(usermovieId);
        ajaxDelete(usermovieId);
      },
      error       : function(resp) {
        console.log("something went wrong... opps")
      }
    });

  }); // close $('.overlay #addToSeen')

} // close addSeenList

function ajaxDelete(usermovieId) {
  $.ajax({
    method      : 'DELETE',
    url         : '/api/user/movies/' + usermovieId,
    success     : function(resp) {
                    console.log('deleting usermovie');
                    console.log(resp);
                    $('#seenBox').html('');
                    $('#wantToWatchBox').html('');
                    getUserMoviesLists();
                  },
    error       : function(resp) {
                    console.log(resp);
                    console.log("ajax error");
                  }
  }); // close success, ajax
}

function modalAddToSeenList(movieId){

  $('#modalAddToSeen').off().click(function(e){

    e.preventDefault();
    e.stopPropagation()
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
function modalAddToWantToWatchList(movieId){
  $('#modalAddToWant').off().click(function(e){
    e.preventDefault();
    e.stopPropagation()
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
}; // close modalAddToWantToWatchList



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
    var rated             = usermoviesArray[i].rated
    console.log("HELLLLLOOO "+usermoviesArray[i].rated)
    // if user has seen the movie vs not seen the movie
    if (usermoviesArray[i].seen) {
      insertToSeenMovieList(movie_id, release_date, movie_title, postser_path, usermovieId, rated);
      // if (usermoviesArray[i].rated){
      //   $('.overlay').html('');
      //   $('.overlay').append('<a class="info setLoved" href="" >loved</a>');
      // };
    } else {
      insertToWantToWatchList(movie_id, release_date, movie_title, postser_path, usermovieId)
    }; // close if statement
  }; // close for loop

}; // close generateUserMovies


function insertToSeenMovieList(movie_id, release_date, movie_title, postser_path, usermovieId, rated){

  var templateRatedFalse = '<div class="hovereffect2 thisMovie" id="'            +
                 movie_id                                              +
                 '"data-toggle="modal" data-target=".modal"><img src="'+
                 postser_path                                          +
                 '"><div class="overlay" id="'                         +
                 usermovieId                                           +
                 '"><a class="info setNeutral" href="" >Neutral</a></div></div>';
  var templateRatedTrue = '<div class="hovereffect2 thisMovie" id="'            +
                 movie_id                                              +
                 '"data-toggle="modal" data-target=".modal"><img src="'+
                 postser_path                                          +
                 '"><div class="overlay" id="'                         +
                 usermovieId                                           +
                 '"><a class="info setLoved" href="" >loved</a></div></div>';
  console.log("Seen List --  " + movie_title);
  console.log(usermovieId);
  if (rated){
    $('#seenBox').append(templateRatedTrue);
  }else{
    $('#seenBox').append(templateRatedFalse);
  };


  NeutralClickedUpdateToLoved();
  LovedClickedUpdateToNeutral()
  getMovieModal();

} // close insertToSeenMovieList


function insertToWantToWatchList(movie_id, release_date, movie_title, postser_path, usermovieId){

  var template = '<div class="hovereffect2 thisMovie" id="'            +
                 movie_id                                              +
                 '"data-toggle="modal" data-target=".modal"><img src="'+
                 postser_path                                          +
                 '"><div class="overlay" id="'                         +
                 usermovieId                                           +
                 '"><a class="info" href="" id="addToSeenFromWant">Seen</a></div></div>';

  console.log("Want To Watch List -- " + movie_title);
  console.log(usermovieId)
  $('#wantToWatchBox').append(template);
  addToSeenFromWant()
  getMovieModal();

} // close insertToWantToWatchList




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
    ////////////////////////////////////////////////////////<<<<<<<<<<<<<<<<<<<<<<<<<<< error
    ajaxAppendSeenMovie(movieId)
    ////////////////////////////////////////////////////////<<<<<<<<<<<<<<<<<<<<<<<<<<< error
    } else {
            ajaxAppendNotSeenMovie(movieId)
    };

}
////////////////////////////////////////////////////////<<<<<<<<<<<<<<<<<<<<<<<<<<< error
function ajaxAppendSeenMovie(movieId){
////////////////////////////////////////////////////////<<<<<<<<<<<<<<<<<<<<<<<<<<< error
  $.ajax({
    method   : 'GET',
    url      : '/api/movies/'+movieId
  }).success(function(resp){
    ////////////////////////////////////////////////////////<<<<<<<<<<<<<<<<<<<<<<<<<<< error
    getSeenMovieDetails(resp);
    ////////////////////////////////////////////////////////<<<<<<<<<<<<<<<<<<<<<<<<<<< error
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

////////////////////////////////////////////////////////<<<<<<<<<<<<<<<<<<<<<<<<<<< error
function getSeenMovieDetails(movie){
////////////////////////////////////////////////////////<<<<<<<<<<<<<<<<<<<<<<<<<<< error
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
    var rated = obj.rated
    var usermovieId = obj.id
    console.log("LOOOOOKKKK "+rated)
    console.log (usermovieId)
    console.log(movie_title)

    insertToSeenMovieList(movie_id, release_date, movie_title, postser_path, usermovieId, rated)
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
    $(this).parent().parent().remove();
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
                    var movieId = resp.movie_id;
                    ajaxAppendSeenMovie(movieId);
                  },
    error       : function(resp) {
                    console.log(resp);
                    console.log("ajax error");
                  }
  }); // close success, ajax
};

              // Add New UserMovie '++'' or 'Seen'
//---------------------------------------------------\\

function NeutralClickedUpdateToLoved(){
$('.overlay .setNeutral').off().click(function(e){

    e.preventDefault();
    e.stopPropagation()
    console.log("neutral clicked ... ---> .... loved set");
    var usermovieId          = $(this).parent().attr('id');
    $('.thisMovie'+' #'+usermovieId+', this').html('');
    console.log($('.thisMovie'+' #'+usermovieId+', this'))
    $('.thisMovie'+' #'+usermovieId+', this').append('<a class="info setLoved" href="" >loved</a>');
    // console.log(usermovieId);
// // need usermovie
//     // console.log(typeof(movieId));
//     // console.log(typeof(userId));
    var updateUserMovieData   = {
                            seen       : true,
                            rated      : true,

                            }; // close updateUserMovie
    NeutralClickedUpdateToLoved();
    LovedClickedUpdateToNeutral();
    updateUserMoviePreferences(updateUserMovieData, usermovieId);


  }); // close $('.overlay #addToWantToWatch')
}; // close updateToLoved

function LovedClickedUpdateToNeutral(){
  $('.overlay .setLoved').off().click(function(e){

    e.preventDefault();
    e.stopPropagation()
    console.log("love clicked ... ---> .... neutralset");
    var usermovieId          = $(this).parent().attr('id');
    $('.thisMovie'+' #'+usermovieId+', this').html('');
    console.log($('.thisMovie'+' #'+usermovieId+', this'));

    $('.thisMovie'+' #'+usermovieId+', this').append('<a class="info setNeutral" href="" >Neutral</a>');
    var updateUserMovieData   = {
                            seen       : true,
                            rated      : false,

                            }; // close updateUserMovie

    NeutralClickedUpdateToLoved();
    LovedClickedUpdateToNeutral();
    updateUserMoviePreferences(updateUserMovieData, usermovieId);
  });
};

function updateUserMoviePreferences(updateUserMovieData, usermovieId){
  $.ajax({
    method      : 'PATCH',
    url         : '/api/user/movies/' + usermovieId,
    data        : updateUserMovieData,
    dataType    : 'json',
    success     : function(resp) {
                    console.log('finished running ajax PATCH usermovies');
                    console.log(resp);
                    var movieId = resp.movie_id;
                    ////////////////////////////////////////////////////////<<<<<<<<<<<<<<<<<<<<<<<<<<< error
                    // ajaxAppendSeenMovie(movieId);
                    ////////////////////////////////////////////////////////<<<<<<<<<<<<<<<<<<<<<<<<<<< error
                  },
    error       : function(resp) {
                    console.log(resp);
                    console.log("ajax error");
                  }
  }); // close success, ajax
};


                    // Preferences
//---------------------------------------------------\\
function lovedFilter(){
  $('#lovedFilter').off().click(function(e){
    e.preventDefault();
    $('#seenBox').html('');
    getUserMoviesForLoved()

  })
};
function getUserMoviesForLoved(){
  $.ajax({
      method   : 'GET',
      url      : '/api/user/movies'
  }).success(function(resp){
    console.log('successful in getting usermovies');
    generateLovedMovies(resp);
  }); // close success, ajax
} // close getUserMoviesForLoved
function generateLovedMovies(usermovies){

  console.log("starting to generate loved movies");
  var base_path           = "https://image.tmdb.org/t/p/original";
  var usermoviesArray     = usermovies.user_movie
  for (var i = 0 ; i < usermoviesArray.length ; i++) {
    var usermovieId       = usermoviesArray[i].id
    var usermovie         = usermoviesArray[i].movie
    var postser_path      = base_path + usermovie.poster_path;
    var movie_title       = usermovie.title;
    var release_date      = usermovie.release_date;
    var movie_id          = usermovie.id;
    var rated             = usermoviesArray[i].rated
    // if user has loved the movie vs not seen the movie
    if (usermoviesArray[i].rated) {
      insertToSeenMovieList(movie_id, release_date, movie_title, postser_path, usermovieId, rated);
    }; // close if statement
  }; // close for loop
}; // close generateLovedMovies

function neutralFilter(){
  $('#neutralFilter').off().click(function(e){
    e.preventDefault();
    $('#seenBox').html('');
    getUserMoviesForNeutral()

  })
};
function getUserMoviesForNeutral(){
  $.ajax({
      method   : 'GET',
      url      : '/api/user/movies'
  }).success(function(resp){
    console.log('successful in getting usermovies');
    generateNeutralMovies(resp);
  }); // close success, ajax
} // close getUserMoviesForLoved
function generateNeutralMovies(usermovies){

  console.log("starting to generate neutral movies");
  var base_path           = "https://image.tmdb.org/t/p/original";
  var usermoviesArray     = usermovies.user_movie
  for (var i = 0 ; i < usermoviesArray.length ; i++) {
    var usermovieId       = usermoviesArray[i].id
    var usermovie         = usermoviesArray[i].movie
    var postser_path      = base_path + usermovie.poster_path;
    var movie_title       = usermovie.title;
    var release_date      = usermovie.release_date;
    var movie_id          = usermovie.id;
    var rated             = usermoviesArray[i].rated
    // if user has loved the movie vs not seen the movie
    if (!usermoviesArray[i].rated && usermoviesArray[i].seen) {
      insertToSeenMovieList(movie_id, release_date, movie_title, postser_path, usermovieId, rated);
    }; // close if statement
  }; // close for loop
}; // close generateLovedMovies
function allFilter(){
  $('#allFilter').off().click(function(e){
    e.preventDefault();
    $('#seenBox').html('');
    getUserMoviesForAll()

  })
};
function getUserMoviesForAll(){
  $.ajax({
      method   : 'GET',
      url      : '/api/user/movies'
  }).success(function(resp){
    console.log('successful in getting usermovies');
    generateAllMovies(resp);
  }); // close success, ajax
} // close getUserMoviesForLoved
function generateAllMovies(usermovies){

  console.log("starting to generate all movies");
  var base_path           = "https://image.tmdb.org/t/p/original";
  var usermoviesArray     = usermovies.user_movie
  for (var i = 0 ; i < usermoviesArray.length ; i++) {
    var usermovieId       = usermoviesArray[i].id
    var usermovie         = usermoviesArray[i].movie
    var postser_path      = base_path + usermovie.poster_path;
    var movie_title       = usermovie.title;
    var release_date      = usermovie.release_date;
    var movie_id          = usermovie.id;
    var rated             = usermoviesArray[i].rated
    // if user has loved the movie vs not seen the movie
    if (usermoviesArray[i].seen) {
      insertToSeenMovieList(movie_id, release_date, movie_title, postser_path, usermovieId, rated);
    }
  }; // close for loop
}; // close generateLovedMovies

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
  lovedFilter();
  neutralFilter();
  allFilter();
  searchLocalEventListener();
  $('.searchMoviesHeader').hide();
  $('#searchMoviesRow').hide();
}); // close (.home.index).ready


//----------------------
// SEARCHING FOR FILMS
function searchLocalEventListener(){
  $('#searchLocalBtn').on('click',function(){
    var searchField = $('#searchBox').val()
    $('#searchMoviesBox').html("");
    $("body").addClass("loading");
    $(".loadingModal").modal();
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
        moreResults = '<div class="thisMovie" id="searchRemoteBtn"><img src="https://azure.microsoft.com/svghandler/search/?width=600&height=315"></div>';
        $('#searchMoviesBox').append(moreResults);
        $('#searchRemoteBtn').on('click',function(){
          searchRemoteResult();
        })
        $(".loadingModal").modal('hide');
        $("body").removeClass("loading");
      }
    })
  });
}

function searchRemoteResult(){
  $("body").addClass("loading");
  $(".loadingModal").modal();
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
    }
    $('#searchRemoteBtn').remove();
    $(".loadingModal").modal('hide')
    $("body").removeClass("loading");
  })
}




  // logout();

 //  function logout(){
 //   $('#logout').on('click',function(){
 //     $.auth.signOut();
 //     window.location.href = "/login";
 //   });
 //  }

