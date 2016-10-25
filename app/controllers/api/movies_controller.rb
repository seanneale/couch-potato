class API::MoviesController < ApplicationController
	before_action :authenticate_user!
	before_action :get_movies

	def index
		render json: @movies
	end

private	
	def get_movies
		@movies = Movie.all
	end
end
