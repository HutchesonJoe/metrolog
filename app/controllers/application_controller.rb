class ApplicationController < ActionController::API
  include ActionController::Cookies
  
  before_action :authorized
  

  def authorized 
    if session[:is_super]
      @current_user = Super.find_by(id: params[:user_id])
    else
      @current_user = Tenant.find_by(id: params[:user_id])
    end
    return render json: { errors: ["Not Authorized"]}, status: :unauthorized unless @current_user 
  end


end
