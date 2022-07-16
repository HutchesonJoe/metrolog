class TenantComplaintSerializer < ActiveModel::Serializer
  attributes :id, :resolved, :super_notes, :tenant_notes, :created_at, :updated_at, :complaint_id, :tenant_id, :building_id, :unit
  
  belongs_to :complaint
  belongs_to :tenant
  belongs_to :building
end
