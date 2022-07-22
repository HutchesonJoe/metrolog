class ComplaintsController < ApplicationController
  skip_before_action :authorized

  def index
    complaints = Complaint.all
    render json: complaints
  end

end
