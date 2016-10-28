class API::UsersController < ApplicationController
	before_action :authenticate_user!

  def user_profile
      render json: current_user
  end
end
