# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

m1 = Movie.create(title: 'Dr Strange')
m1.genres.create(name: "action")


user = m1.users.create(email: 'test@example.com', password: '#$taawktljasktlw4aaglj')
# user.email = 'test@example.com'
# user.encrypted_password = 
# m1.users.save!

