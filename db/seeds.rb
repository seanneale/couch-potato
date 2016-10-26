# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# m1 = Movie.create(title: 'Dr Strange')
# m1.genres.create(name: "action")

# standard base_url http://image.tmdb.org/t/p/original/
# configuration = Tmdb::Configuration.new

# puts configuration.base_url
# puts configuration.poster_sizes[6]

# user = m1.users.create(email: 'test@example.com', password: '#$taawktljasktlw4aaglj')
# # user.email = 'test@example.com'
# # user.encrypted_password = 
# # m1.users.save!

10.times do
	User.create(email: Faker::Internet.email, password: Faker::Internet.password(8), name: Faker::Name.name, image: Faker::Avatar.image)
end 

Tmdb::Api.key('080c6e21243c377d80ac2754b8827b4f')

@movies = Tmdb::Movie.upcoming

@movies.each do |movie|
	@tmdb_id = movie.id
	@trailers = Tmdb::Movie.trailers(@tmdb_id)
	@trailers["youtube"][0] ? @trailer = @trailers["youtube"][0]["source"] : @trailer = 'no source'
	@credit_details = Tmdb::Movie.credits(@tmdb_id)
	@director = @credit_details["crew"].find { |key| key['job'] == "Director"}
	@director = @director["name"]
	@writer = @credit_details["crew"].find { |key| key['job'] == "Screenplay" || key['job'] == "Writer"}
	@writer ? @writer = @writer['name'] : @writer = "no source"
	@cast = @credit_details["cast"]
	@cast[0] ? @cast0 = @cast[0]["name"] : @cast0 = 'no source'
	@cast[1] ? @cast0 = @cast[1]["name"] : @cast0 = 'no source'
	@cast[2] ? @cast0 = @cast[2]["name"] : @cast0 = 'no source'
	@cast = "#{@cast0}, #{@cast1} & #{@cast2}"
	Movie.create(tmdb_id: movie.id, title: movie.title, release_date: movie.release_date, poster_path: movie.poster_path, overview: movie.overview, background_path: movie.backdrop_path, trailer_path: @trailer, director: @director, writer: @writer, cast: @cast, loved_counter: 0, unloved_counter: 0)
end

@genres = Tmdb::Genre.list
@genres['genres'].each do |genre|
	@name = genre["name"]
	@tmdb_genre_id = genre["id"]
	Genre.create(name: @name, tmdb_id: @tmdb_genre_id)
end

@movies = Movie.all
@movies.each do |movie|
	puts movie.title
	@movie_info = Tmdb::Movie.detail(movie.tmdb_id)
	@movie_info["genres"].each do |genre|
		@genre_id = Genre.all.find {|key| key['tmdb_id'] == genre['id']}
		movie.movie_genres.create(genre_id: @genre_id["id"])
	end
end

@users = User.all
@users.each do |user|
	puts user.name
	@movies_ids = Movie.pluck(:id)
	rand(3..8).times do
		user.user_movies.create(movie_id: @movies_ids.sample, seen: [true, false].sample, rated: [true, false].sample)
	end
end