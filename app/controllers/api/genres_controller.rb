# TODO to keep? Bonus
class API::GenresController < ApplicationController
	before_action :authenticate_user!
	before_action :get_genres
	before_action :set_genre

	def index
		render json: @genres
	end

	def show
		render json: @genre
	end

private
	def get_genres
		@genres = Genre.all
	end

	def set_genre
		@genre = Genre.find_by(name: params[:id])
	end
end
