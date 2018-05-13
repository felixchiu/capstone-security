class CreateInquiries < ActiveRecord::Migration
  def change
    create_table :inquiries do |t|
      t.text :question, {null: false}
      t.text :reply
      t.boolean :completed
      t.integer :creator_id, {null:false}

      t.timestamps null: false
    end
    add_index :inquiries, :creator_id
  end
end
