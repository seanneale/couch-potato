class AuthController < ApplicationController
	def index
		redirect_to '/' if current_user
	end
end
