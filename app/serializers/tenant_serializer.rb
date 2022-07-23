class TenantSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :phone_number, :username, :additional_tenants, :currently_occupying
  has_one :apartment
  belongs_to :building
  has_many :tenant_complaints
  
end
