class ApartmentsController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_invalid_response
  
  skip_before_action :authorized, only: [:index, :create]
  
  def index
    apartments = Apartment.all 
    render json: apartments
  end
  
  def create
    apartment = Apartment.create!(apartment_params)
    render json: apartment, status: :created 
  end

  private

  def apartment_params
    params.permit(:building_id, :unit_number, :tenant_id)
  end

  def render_invalid_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: 422
  end

end
