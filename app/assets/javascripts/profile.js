// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
function generateProfilePage(resp){
	console.log('generating');
	console.log(resp.email);

}

function gettingUserMovieLibrary(id){
	console.log(id)
}


function getInfoForProfilePage(){
	$.ajax({
		method: 'GET',
		url: '/current_user'
	}).success(function(resp){
		//function that builds the user's profile page
		generateProfilePage(resp);
		gettingUserMovieLibrary(resp.id);
	})
};
	

$('.profile.index').ready(function(){
	getInfoForProfilePage();
	// code for updating the user account!!
	// $.auth.updateAccount({
	// 	email: 'test@test.com'
	// });

	//code for destroying the current user
	// $.auth.destroyAccount();

	// code for signingout
	// $.auth.signOut();
})