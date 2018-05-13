FactoryGirl.define do
  factory :inquiry do
    question {Faker::Lorem.sentence(1).chomp(".") }
    sequence(:reply) {|n| n%2==0 ? nil : Faker::Lorem.sentence(3).chomp(".") }
    completed false
    creator_id 1
  end

  trait :with_question do
    question { Faker::Lorem.sentence(1).chomp(".") }
  end

  trait :with_roles do
    after(:create) do |inquiry|
      Role.create(:role_name=>Role::ORGANIZER,
                  :mname=>Inquiry.name,
                  :mid=>inquiry.id,
                  :user_id=>inquiry.creator_id)
    end
  end

end
