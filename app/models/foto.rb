class Foto < ActiveRecord::Base
  belongs_to :vehiculo

  has_attached_file :imagen, :styles => { :original => "1024x768", :medium => "320x240>", :thumb => "150x113>" }, :default_url => "/images/missing.jpg"
  validates_attachment_content_type :imagen, :content_type => ["image/jpeg", "image/gif", "image/png"]
  validates_attachment_size :imagen, :less_than => 1.megabytes
end
