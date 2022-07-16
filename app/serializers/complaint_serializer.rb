class ComplaintSerializer < ActiveModel::Serializer
  attributes :id, :complaint_type
  has_many :tenant_complaints
end
