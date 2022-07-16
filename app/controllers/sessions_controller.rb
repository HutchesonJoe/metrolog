class SessionsController < ApplicationController

  def create
    if(params[:isSuper])
      @user = Super.find_by(username: params[:username])
      @is_super = true
    else
      @user = Tenant.find_by(username: params[:username])
      @is_super = false
    end

    if @user&.authenticate(params[:password])
      session[:user_id] = @user.id
      session[:is_super] = @is_super
      render json: @user, status: :created
    else
      render json: {errors: ["Invalid username or password"]}, status: :unauthorized
    end
  end

#okay that this is in my sessions controller??
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

end
