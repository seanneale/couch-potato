class AddUpcomingFieldToMovies < ActiveRecord::Migration[5.0]
  def change
  		add_column :movies, :upcoming, :boolean
  end
end
