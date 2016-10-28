Rails.application.routes.draw do
    mount_devise_token_auth_for 'User', at: 'auth'

    namespace :api do
        # publicly accessable movies
        resources :movies, only: [:index]
        get '/movies/upcoming' => "movies#upcoming"

        # get user info
        get '/user' => "users#user_profile"

        scope :user do
            # Bookmark and rate movies for current_user
            resources :movies, except: [:new, :edit, :show], controller: 'user_movies', as: 'user_movies'
        end

        # TODO to keep? Bonus
        resources :genres, only: [:index, :show]
    end

    # static auth page for login/signup
    resources :auth, only: [:index]

    # static profile page for current_user info and all bookmarked
    resources :profile, only: [:index]

    # static home page with upcoming movies and user's followed
    root "home#index"
end