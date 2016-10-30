class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  # protect_from_forgery with: :exception
  before_action :get_current_user
  before_action :configure_permitted_parameters, if: :devise_controller?

  def authenticate_user!
    redirect_to '/auth' if current_user.nil?
    # render json: {message: "Unauthorize"} if current_user.nil?
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

protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:image, :name, :email, :password])
    devise_parameter_sanitizer.permit(:account_update, keys: [:image, :name, :email, :password])
  end
end
