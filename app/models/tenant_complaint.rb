class TenantComplaint < ApplicationRecord
  belongs_to :tenant
  belongs_to :complaint
end
