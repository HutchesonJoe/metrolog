class Tenant < ApplicationRecord
  has_secure_password
  has_one :apartment
  has_many :tenant_complaints
  has_many :complaints, through: :tenant_complaints
end
