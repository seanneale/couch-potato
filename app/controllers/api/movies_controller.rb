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

	# TODO make this a task
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

private
	def get_movies
		@movies = Movie.all
	end

	def get_movie
		@movie = Movie.find_by(id: params[:id])
	end

end
