class SuperSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :phone_number, :username
  has_many :buildings
end
