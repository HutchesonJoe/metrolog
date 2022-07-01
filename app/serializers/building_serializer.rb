class BuildingSerializer < ActiveModel::Serializer
  attributes :id, :address, :number_of_units, :super_id
  has_many :tenant_complaints
  

end
