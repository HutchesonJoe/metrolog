class Super < ApplicationRecord
  has_secure_password
  has_many :buildings
  has_many :apartments, through: :buildings
end
