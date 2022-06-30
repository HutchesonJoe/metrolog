class CreateApartments < ActiveRecord::Migration[6.1]
  def change
    create_table :apartments do |t|
      t.integer :building_id
      t.string :unit_number
      t.integer :tenant_id

      t.timestamps
    end
  end
end
