class TenantComplaint < ApplicationRecord
  belongs_to :tenant
  belongs_to :complaint
  belongs_to :building
end
