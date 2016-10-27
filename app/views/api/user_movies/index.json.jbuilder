json.user @current_user
json.user_movie do
  json.array! @usermovies do |user_movie|
    json.merge! user_movie.attributes
    json.movie user_movie.movie
  end
end