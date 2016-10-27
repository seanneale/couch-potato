Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

	namespace :api do
  		resources :movies, except: [:new, :edit, :destroy, :create], :defaults => { :format => 'json' }
		resources :genres, only: [:index, :show], :defaults => { :format => 'json' }

		resources :users, except: [:new, :edit, :index] , :defaults => { :format => 'json' } do
			resources :movies, except: [:new, :edit, :show], controller: 'user_movies', :defaults => { :format => 'json' }
		end
  	end

	resources :profile, only: [:index]
	resources :login, only: [:index]
	resources :home, only: [:index]	
	get 'current_user' => "api/users#user_profile", :defaults => { :format => 'json' }
	get 'upcoming' => "api/movies#upcoming", :defaults => { :format => 'json' }

end
