class API::UserMoviesController < ApplicationController
	before_action :authenticate_user!
	before_action :get_usermovies, only: [:index]
  before_action :get_usermovie, only: [:update, :destroy]

	def index
	end

  def create
    if !UserMovie.where(check_user_movie_params).present?
      UserMovie.create(user_movie_params)
      puts "User Movie Created"
    else
      puts "User Movie Already Exists"
    end
  end

  def update
    @usermovie.assign_attributes(user_preference_params)
  end

  def destroy
    @usermovie.destroy
  end

private
	def get_usermovies
		@usermovies = current_user.user_movies.includes(:movie)
	end

  def get_usermovie
    @usermovie = UserMovie.find_by(id: params[:id])
  end

  def user_movie_params
    params.require(:usermovie).permit(:movie_id, :user_id, :seen, :rated)
  end

  def check_user_movie_params
    params.require(:usermovie).permit(:movie_id, :user_id)
  end

  def user_preference_params
    params.require(:usermovie).permit(:seen, :rated)
  end
end
