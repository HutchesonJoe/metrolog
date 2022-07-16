

class TenantComplaintsController < ApplicationController

  def index
    tenant_complaints = TenantComplaint.all
    render json: tenant_complaints
  end

  # def @timeOpen
  #   #???
  #   complaint = Tenant_complaint.find(params[:id])

    
  # end

end
