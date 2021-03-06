class Invite < ApplicationRecord
  belongs_to :campaign

  validates :token, length: { is: 8 }
  validates :token, uniqueness: { case_sensitive: false }
end
