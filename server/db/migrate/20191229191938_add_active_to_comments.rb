class AddActiveToComments < ActiveRecord::Migration[5.1]
  def change
    add_column :comments, :active, :boolean
  end
end
