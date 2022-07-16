class CreateTenants < ActiveRecord::Migration[6.1]
  def change
    create_table :tenants do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :phone_number
      t.string :additional_tenants
      t.boolean :currently_occupying
      t.string :username
      t.string :password_digest
      t.timestamps
    end
  end
end
