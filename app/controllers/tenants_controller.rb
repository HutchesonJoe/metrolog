class TenantsController < ApplicationController

  def index
    tenants = Tenant.all
    render json: tenants
  end
  
end
