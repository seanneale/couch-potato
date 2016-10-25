class CreateMovies < ActiveRecord::Migration[5.0]
  def change
    create_table :movies do |t|
      t.integer :tmdb_id
      t.string :title
      t.string :release_date
      t.string :poster_path
      t.text :overview
      t.string :background_path
      t.string :trailer_path
      t.string :director
      t.string :writer
      t.string :cast
      t.integer :loved_counter
      t.integer :unloved_counter

      t.timestamps
    end
  end
end
