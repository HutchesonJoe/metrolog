class TenantComplaintsController < ApplicationController

  def index
    tenant_complaints = TenantComplaint.all
    render json: tenant_complaints
  end

end
