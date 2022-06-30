class Complaint < ApplicationRecord
  has_many :tenant_complaints
  has_many :tenants, through: :tenant_complaints
end
