class CreateMovieGenresJoinTable < ActiveRecord::Migration[5.0]
  def change
    create_table :movie_genres do |t|
    	t.belongs_to :genre
    	t.belongs_to :movie
  	    t.timestamps
    end
  end
end
