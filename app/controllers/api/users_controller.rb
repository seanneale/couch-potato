class API::UsersController < ApplicationController
	before_action :authenticate_user!
	before_action :get_user
	before_action :get_users

	def index
		render json: @users
	end

	def show
		render json: @user
	end

	# def update
	# 	puts @user[:image]
	# 	@user.assign_attributes(user_params)
	# 	puts @user[:image]
	# 	if @user.save
	# 		render :json => @user
	# 	else
	# 		render :json => { :errors => @user.errors.full_messages }
	# 	end
	# end

	def user_profile
	    render json: current_user
	end

private
	def get_users
		@users = User.all
	end

	def get_user
		@user = User.find_by(id: params[:id])
	end

	# def user_params
	# 	params.require(:update).permit(:name, :email, :uid, :image)
	# end

end


# , email: params[:email], image: params[:image], uid: params[:email]