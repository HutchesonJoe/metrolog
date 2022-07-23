

class TenantComplaintsController < ApplicationController
  
  rescue_from ActiveRecord::RecordInvalid, with: :render_invalid_response
  #can i do an "except"
  skip_before_action :authorized, only: [:index, :destroy, :order_by_date, :create, :get_open, :get_closed, :update]

  def index
    tenant_complaints = TenantComplaint.all
    render json: tenant_complaints
  end

  def update 
    complaint = TenantComplaint.find(params[:id])
    complaint.update(tenant_complaint_params)
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
    if !session[:is_super]
    complaint = TenantComplaint.find(params[:id])
    complaint.destroy
    head :no_content
    else
      return render json: "Only tenants can delete a complaint.", status: :unauthorized
    end
  end
#am I using these?
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
    params.permit(:tenant_notes, :resolved, :complaint_id, :tenant_id, :building_id, :unit, :super_notes, :tenant_notes, :complaint_type)
  end

  def render_invalid_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: 422
  end

  
  # def @timeOpen
  #   #???
  #   complaint = Tenant_complaint.find(params[:id])

    
  # end

end
