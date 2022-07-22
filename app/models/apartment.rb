class Apartment < ApplicationRecord

  validates :unit_number, presence: true
  
  belongs_to :tenant
  belongs_to :building
end
