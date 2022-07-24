class BuildingsController < ApplicationController
  
  skip_before_action :authorized
  
  def index
    buildings = Building.all 
    render json: buildings
  end

  def update
    building = Building.find_by(id: params[:id])
    building.update(:super_id)
  end
  
end
