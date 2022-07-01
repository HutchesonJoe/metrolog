class SupersController < ApplicationController

  def index
    supers = Super.all
    render json: supers
  end
end
