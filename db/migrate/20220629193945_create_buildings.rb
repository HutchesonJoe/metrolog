class CreateBuildings < ActiveRecord::Migration[6.1]
  def change
    create_table :buildings do |t|
      t.string :address
      t.integer :number_of_units
      t.integer :super_id
      t.timestamps
    end
  end
end
