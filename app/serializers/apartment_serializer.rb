class ApartmentSerializer < ActiveModel::Serializer
  attributes :id, :building_id, :unit_number, :tenant_id, :building, :tenant
  belongs_to :building
  belongs_to :tenant
end
