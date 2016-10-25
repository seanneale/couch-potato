class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  # protect_from_forgery with: :exception
  before_action :get_current_user

  def authenticate_user!
    render json: {message: "Unauthorize"} if current_user.nil?
  end

  def get_current_user
    return nil unless cookies[:authHeaders]
    auth_headers = JSON.parse cookies[:authHeaders]

    expiration_datetime = DateTime.strptime(auth_headers["expiry"], "%s")
    current_user = User.find_by(uid: auth_headers["uid"])

    if current_user &&
       current_user.tokens.has_key?(auth_headers["client"]) &&
       expiration_datetime > DateTime.now

      @current_user = current_user
    end
    @current_user
  end
end
