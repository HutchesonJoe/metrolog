class TenantsController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_invalid_response
  # rescue_from ActiveRecord::UnprocessableEntity, with: :render_unprocessable

  skip_before_action :authorized, only: [:create, :index]
  
  def index
    tenants = Tenant.all
    render json: tenants
  end

  def create
    tenant = Tenant.create!(tenant_params)
    render json: tenant, status: :created
  rescue render_unprocessable
  end

  def show
    tenant = Tenant.find_by(id: session[:user_id])
    render json: tenant
  end

  private

  def tenant_params
    params.permit(:first_name, :last_name, :email, :phone_number, :username,  :additional_tenants, :currently_occupying, :password, :password_confirmation)
  end

  def render_invalid_response(invalid)
   render json: { errors: invalid.record.errors.full_messages }, status: 422
  end

  def render_unprocessable
    render json: { errors: ["Oops! Something went wrong. Try again."]}
  end

end
