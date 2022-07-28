class SessionsController < ApplicationController
  skip_before_action :authorized, only: [:create, :show, :destroy]
  rescue_from ActiveRecord::RecordInvalid, with: :render_invalid_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

  def create
    if(params[:isSuper])
      session[:is_super] = @is_super
      super_user
      
    elsif(params[:isSuper]==false)
      tenant_user
      
    end

    if @user&.authenticate(params[:password])
      session[:user_id] = @user.id
      session[:is_super] = @is_super
      render json: @user, status: :created
    else
      render json: {errors: ["Invalid username or password"]}, status: :unauthorized
    end
  end

  def show
    if session[:is_super]
      user = Super.find_by(id: session[:user_id])
    else
      user = Tenant.find_by(id: session[:user_id])
    end
    render json: user
  end

  def destroy
    session.delete :user_id
    head :no_content
  end 

  def super_user
    @user = Super.find_by!(username: params[:username])
    @is_super = true
  end

  def tenant_user
    @user = Tenant.find_by!(username: params[:username])
    @is_super = false
  end

  private

  def render_invalid_response(invalid)
    render json: { errors: invalid.record.error }, status: 422
  end

  def render_not_found(not_found)
    render json: { errors: ["Not found."] }, status: 404
  end


end
