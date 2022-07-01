class Building < ApplicationRecord
  has_many :apartments
  has_many :tenants, through: :apartments
  belongs_to :super
  has_many :tenant_complaints
end
