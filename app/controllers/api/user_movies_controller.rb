class API::UserMoviesController < ApplicationController
	before_action :authenticate_user!
	before_action :get_user

	def index
		puts @user
		# render json: @user.movies.to_json(:include => {:users => {:only => :name}})
	end

private
	def get_user
		@user = User.find_by(id: params[:id])
	end
end
