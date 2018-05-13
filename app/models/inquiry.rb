class Inquiry < ActiveRecord::Base
  include Protectable
  validates :question, :presence=>true
end
