class SupersController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_invalid_response

  def index
    supers = Super.all
    render json: supers
  end

  def create
    superintendent = Super.create!(super_params)
    render json: superintendent, status: :created
  end

  def show
    superintendent = Super.find_by(id: session[:user_id])
    render json: superintendent
  end

  private

  def super_params
    params.permit(:first_name, :last_name, :email, :phone_number, :username, :password, :password_confirmation)
  end

  def render_invalid_response(invalid)
   render json: { errors: invalid.record.errors.full_messages }, status: 422
  end
end
