class CreateSupers < ActiveRecord::Migration[6.1]
  def change
    create_table :supers do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :phone_number
      t.string :username
      t.string :password_digest
      t.timestamps
    end
  end
end
