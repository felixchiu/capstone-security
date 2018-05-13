require 'rails_helper'

RSpec.describe Inquiry, type: :model do
  include_context "db_cleanup_each"

  context "build valid inquiry" do
    it "default inquiry created with random question" do
      inquiry=FactoryGirl.build(:inquiry)
      expect(inquiry.creator_id).to_not be_nil
      expect(inquiry.save).to be true
    end

    it "inquiry with User and non-nil question" do
      user=FactoryGirl.create(:user)
      inquiry=FactoryGirl.build(:inquiry, :with_question, :creator_id=>user.id)
      expect(inquiry.creator_id).to eq(user.id)
      expect(inquiry.question).to_not be_nil
      expect(inquiry.save).to be true
    end

    it "invalid inquiry provides error messages" do
      inquiry=FactoryGirl.build(:inquiry, question:nil)
      expect(inquiry.creator_id).to_not be_nil
      expect(inquiry.question).to be_nil
      expect(inquiry.validate).to be false
      expect(inquiry.errors.messages).to include(:question=>["can't be blank"])
    end
  end

end
