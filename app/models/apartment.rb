class Apartment < ApplicationRecord
  belongs_to :tenant
  belongs_to :building
end
