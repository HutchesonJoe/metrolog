class BuildingsController < ApplicationController
  
  skip_before_action :authorized
  
  def index
    buildings = Building.all 
    render json: buildings
  end
  
end
