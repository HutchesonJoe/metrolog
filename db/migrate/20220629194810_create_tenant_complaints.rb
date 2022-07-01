class CreateTenantComplaints < ActiveRecord::Migration[6.1]
  def change
    create_table :tenant_complaints do |t|
      t.integer :tenant_id
      t.integer :complaint_id
      t.integer :building_id
      t.boolean :resolved
      t.string :tenant_notes
      t.string :super_notes

      t.timestamps
    end
  end
end
