class Super < ApplicationRecord
  has_secure_password
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, :email => true
  validates :username, presence: true, uniqueness: true, 
  # validates :password, :length => {:within => 6..12}
  
  has_many :buildings
  has_many :apartments, through: :buildings
end
