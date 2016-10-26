class API::UsersController < ApplicationController
	before_action :authenticate_user!
	before_action :get_user

	def show
		render json: @user
	end

private
	def get_user
		@user = User.find_by(id: params[:id])
	end

end


