class CreateUserMoviesJoinTable < ActiveRecord::Migration[5.0]
  def change
    create_table :user_movies do |t|
    	t.belongs_to :user
    	t.belongs_to :movie
    	t.boolean :seen
    	t.boolean :rated
        t.timestamps
    end
  end
end
