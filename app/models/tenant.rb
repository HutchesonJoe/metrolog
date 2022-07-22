class Tenant < ApplicationRecord
  has_secure_password

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  # validates :apartment, presence: true

  has_one :apartment
  has_many :tenant_complaints
  has_many :complaints, through: :tenant_complaints
  has_one :building, through: :apartment
end
