class API::MoviesController < ApplicationController
	before_action :authenticate_user!
	before_action :get_movies
	before_action :get_movie

	def index
		render json: @movies
	end

	def show
		render json: @movie
	end

	def upcoming
		upcoming = []
		@movies.each do |movie|
			if movie.upcoming
				upcoming.push movie
			end
		end
		upcoming.sort_by{|movie| movie[:id]}
		upcoming.each do |movie|
			puts movie.id
		end
	    render json: upcoming
	end

	def search_local
		search_term = params[:title]
		results = Movie.where('title ILIKE ?', "%#{search_term}%");
		render json: results
	end

	def search_remote
		search_term = params[:title]
		puts search_term
		Tmdb::Api.key('080c6e21243c377d80ac2754b8827b4f')
		results = Tmdb::Movie.find(search_term)
		puts results
		@movies = []
	    results.each do |result|
			tmdb_id = result.id
			# puts @movie_params
			if @result = Movie.find_by(tmdb_id: tmdb_id)
				# @movies.push @result
				puts 'found'
			else 
				trailers = Tmdb::Movie.trailers(tmdb_id)
				trailers["youtube"] && trailers["youtube"][0] ? trailer = trailers["youtube"][0]["source"] : trailer = 'no source'
				credit_details = Tmdb::Movie.credits(tmdb_id)
				director = credit_details["crew"].find { |key| key['job'] == "Director"}
				director ? director = director["name"] : @director = "no source"
				writer = credit_details["crew"].find { |key| key['job'] == "Screenplay" || key['job'] == "Writer"}
				writer ? writer = writer['name'] : writer = "no source"
				cast = credit_details["cast"]
				cast[0] ? cast0 = cast[0]["name"] : cast0 = 'no source'
				cast[1] ? cast1 = cast[1]["name"] : cast1 = 'no source'
				cast[2] ? cast2 = cast[2]["name"] : cast2 = 'no source'
				cast = "#{cast0}, #{cast1} & #{cast2}"
				if trailer != "no source" && result.release_date
					@result = Movie.create(tmdb_id: result.id, title: result.title, release_date: result.release_date, poster_path: result.poster_path, overview: result.overview, background_path: result.backdrop_path, trailer_path: trailer, director: director, writer: writer, cast: cast, loved_counter: 0, unloved_counter: 0, upcoming: false)
					@movies.push @result
				end
			end
	    end
		render json: @movies
	end

private
	def get_movies
		@movies = Movie.all
	end

	def get_movie
		@movie = Movie.find_by(id: params[:id])
	end

end
