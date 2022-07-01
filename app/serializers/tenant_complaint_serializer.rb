class TenantComplaintSerializer < ActiveModel::Serializer
  attributes :id, :tenant_id, :complaint_id, :building_id, :resolved, :super_notes, :tenant_notes, :created_at, :updated_at
  
  belongs_to :complaint
end
