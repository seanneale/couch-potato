class API::UserMoviesController < ApplicationController
  before_action :authenticate_user!
	before_action :get_usermovies, only: [:index]
  before_action :get_usermovie, only: [:update, :destroy]

	def index
	end

  def create
    if !UserMovie.where(check_user_movie_params).present?
      @usermovie = UserMovie.create(user_movie_params)
        if @usermovie.save
          head 201
        else
          render json: {message: 'UserMovie Cannot Be Saved'}, status: 404
        end
      puts "User Movie Created"
    else
      puts "User Movie Already Exists"
      render json: {message: 'User Movie Already Exists'}, status: 404
    end
  end

  def update
    @usermovie.assign_attributes(user_preference_params)
    if @usermovie.save
      head 201
    else
      render json: {message: 'UserMovie Cannot Be Saved'}, status: 404
    end
  end

  def destroy
    if @usermovie.destroy
      head 201
    else
      render json: {message: 'UserMovie Cannot Be Deleted'}, status: 404
    end
  end

private
	def get_usermovies
		@usermovies = current_user.user_movies.includes(:movie)
	end

  def get_usermovie
    @usermovie = UserMovie.find_by(id: params[:id])
    if @usermovie.nil?
      render json: {message: "Cannot find User Movie"}, status: 404
    end
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
