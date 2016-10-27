class API::UserMoviesController < ApplicationController
	before_action :authenticate_user!
	before_action :get_usermovies

	def index
	end

private
	def get_usermovies
		@usermovies = current_user.user_movies.includes(:movie)
	end
end
