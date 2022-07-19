

class TenantComplaintsController < ApplicationController

  def index
    tenant_complaints = TenantComplaint.all
    render json: tenant_complaints
  end

  def update 
   #this is not quite working
    complaint = TenantComplaint.find(params[:id])
    # byebug
    complaint.update(super_notes: params[:super_notes])
    render json: complaint 
  end

  def show
    complaint = TenantComplaint.find(params[:id])
    render json: complaint
  end

  def create
    complaint = TenantComplaint.create!(tenant_complaint_params)
    render json: complaint
  end

  def destroy
    complaint = TenantComplaint.find(params[:id])
    complaint.destroy
  end

  def order_by_date
    @complaints = TenantComplaint.order(:created_at)
    render json: @complaints 
  end

  def get_open
    open_complaints = TenantComplaint.select {|c| !c.resolved?}
    render json: open_complaints
    
  end

  def get_closed
    complaints = TenantComplaint.select {|c| c.resolved?}
    render json: complaints
  end

  private

  def tenant_complaint_params
    params.permit(tenant_notes, resolved: false, complaint_id, tenant_id, building_id, unit)
  end
  # def @timeOpen
  #   #???
  #   complaint = Tenant_complaint.find(params[:id])

    
  # end

end
