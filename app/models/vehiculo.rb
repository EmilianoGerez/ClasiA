class Vehiculo < ActiveRecord::Base
  belongs_to :usuario
  belongs_to :agencia
  belongs_to :segmento
  belongs_to :dpto_mendoza
  belongs_to :marca
  belongs_to :modelo
  has_many :fotos, dependent: :destroy
  accepts_nested_attributes_for :fotos, :reject_if => :all_blank, :allow_destroy => true

  validates_presence_of   :segmento_id
  validates_presence_of   :dpto_mendoza_id
  validates_presence_of   :marca_id
  #validates_presence_of   :modelo_id
  validates_presence_of   :anio
  validates_presence_of   :titulo
  validates_presence_of   :combustible
  validates_presence_of   :condicion
  validates_presence_of   :titulo
  validates :precio, numericality: { only_integer: true }
  validates :kilometraje, numericality: { only_integer: true }

  has_attached_file :foto_ppal, :styles => { :original => "1024x768", :medium => "320x240>", :thumb => "150x113>" }, :default_url => "/images/missing.jpg"
  validates_attachment_content_type :foto_ppal, :content_type => ["image/jpeg", "image/gif", "image/png"]
  validates_attachment_size :foto_ppal, :less_than => 1.megabytes
end
