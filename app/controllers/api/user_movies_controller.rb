class API::UserMoviesController < ApplicationController
	before_action :authenticate_user!
end
