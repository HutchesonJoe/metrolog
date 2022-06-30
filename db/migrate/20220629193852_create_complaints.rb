class CreateComplaints < ActiveRecord::Migration[6.1]
  def change
    create_table :complaints do |t|
      t.string :complaint_type

      t.timestamps
    end
  end
end
