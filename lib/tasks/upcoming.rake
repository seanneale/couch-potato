task :create_upcoming_movies => :environment do
	# add upcoming flag to schema
	# done
	# update seeds
	# done
	# set all upcoming flags to false
	#
	Movie.update_all "upcoming = false"
	# use old method to get the 'upcoming films' 
	# 
	Tmdb::Api.key('080c6e21243c377d80ac2754b8827b4f')
    @movies = Tmdb::Movie.upcoming
    @upcomings = []
    @movies.each do |movie|
    	puts movie.id
		@tmdb_id = movie.id
		@trailers = Tmdb::Movie.trailers(@tmdb_id)
		@trailers["youtube"] && @trailers["youtube"][0] ? @trailer = @trailers["youtube"][0]["source"] : @trailer = 'no source'
		@credit_details = Tmdb::Movie.credits(@tmdb_id)
		@director = @credit_details["crew"].find { |key| key['job'] == "Director"}
		@director ? @director = @director["name"] : @director = "no source"
		@writer = @credit_details["crew"].find { |key| key['job'] == "Screenplay" || key['job'] == "Writer"}
		@writer ? @writer = @writer['name'] : @writer = "no source"
		@cast = @credit_details["cast"]
		@cast[0] ? @cast0 = @cast[0]["name"] : @cast0 = 'no source'
		@cast[1] ? @cast0 = @cast[1]["name"] : @cast0 = 'no source'
		@cast[2] ? @cast0 = @cast[2]["name"] : @cast0 = 'no source'
		@cast = "#{@cast0}, #{@cast1} & #{@cast2}"
		@movie_params = {
			title: movie.title,
			release_date: movie.release_date,
			poster_path: movie.poster_path,
			overview: movie.overview,
			background_path: movie.backdrop_path,
			trailer_path: @trailer,
			director: @director,
			writer: @writer,
			cast: @cast,
			loved_counter: 0,
			unloved_counter: 0
		}
		puts @movie_params
        # set_movie_params movie
        # @upcoming = Movie.create_with(@movie_params).find_or_create_by(tmdb_id: movie.id)
        # @upcomings.push(@upcoming)
    end
    # check films exists
		#if it does: update the upcoming flag to false
		#if it does not: add the film to the library, with the upcoming flag set to true
	#
end

def set_movie_params movie
	@tmdb_id = movie.id
	@trailers = Tmdb::Movie.trailers(@tmdb_id)
	@trailers["youtube"] && @trailers["youtube"][0] ? @trailer = @trailers["youtube"][0]["source"] : @trailer = 'no source'
	@credit_details = Tmdb::Movie.credits(@tmdb_id)
	@director = @credit_details["crew"].find { |key| key['job'] == "Director"}
	@director ? @director = @director["name"] : @director = "no source"
	@writer = @credit_details["crew"].find { |key| key['job'] == "Screenplay" || key['job'] == "Writer"}
	@writer ? @writer = @writer['name'] : @writer = "no source"
	@cast = @credit_details["cast"]
	@cast[0] ? @cast0 = @cast[0]["name"] : @cast0 = 'no source'
	@cast[1] ? @cast0 = @cast[1]["name"] : @cast0 = 'no source'
	@cast[2] ? @cast0 = @cast[2]["name"] : @cast0 = 'no source'
	@cast = "#{@cast0}, #{@cast1} & #{@cast2}"
	@movie_params = {
		title: movie.title,
		release_date: movie.release_date,
		poster_path: movie.poster_path,
		overview: movie.overview,
		background_path: movie.backdrop_path,
		trailer_path: @trailer,
		director: @director,
		writer: @writer,
		cast: @cast,
		loved_counter: 0,
		unloved_counter: 0
	}
end