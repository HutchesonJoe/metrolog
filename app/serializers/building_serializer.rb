class BuildingSerializer < ActiveModel::Serializer
  attributes :id, :address, :number_of_units, :super_id, :tenant_complaints
  
  has_many :tenant_complaints
  belongs_to :super
  

end
