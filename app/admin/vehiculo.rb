ActiveAdmin.register Vehiculo do

  index do
    column :agencia_id
    column :usuario_id
    column :segmento_id
    column :dpto_mendoza_id
    column :titulo
    column :destacado
    column :principal
    column :alta
    actions
  end

  # FILTROS
  filter :agencia_id, :as => :select, :member_label => :nombre, :collection => proc { Agencia.all }
  filter :segmento_id, :as => :select, :member_label => :nombre, :collection => proc { Segmento.all }
  filter :dpto_mendoza_id, :as => :select, :member_label => :nombre, :collection => proc { DptoMendoza.all }
  filter :titulo
  filter :precio
  filter :destacado
  filter :principal

  # PAGINACION
  config.per_page = 20

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  permit_params :agencia_id, :segmento_id, :dpto_mendoza_id, :marca_id, :modelo_id, :modeloCustom, :titulo, :anio, :kilometraje, :combustible, :precio, :condicion, :comentario, :destacado, :principal, :denunciado, :alta, :equipamiento, :seguridad, :exterior, :foto_ppal, fotos_attributes: [:id, :descripciom, :imagen, :_destroy]

  

  form do |f|
      f.inputs "Datos" do
        f.input :agencia_id, :as => :select, :member_label => :nombre, :collection => Agencia.all
        f.input :segmento_id, :as => :select, :member_label => :nombre, :collection => Segmento.all
        f.input :dpto_mendoza_id, :as => :select, :member_label => :nombre, :collection => DptoMendoza.all
        f.input :marca_id, :as => :select, :member_label => :nombre, :collection => Marca.all
        f.input :modelo_id, :as => :select, :member_label => :nombre, :collection => Modelo.all
        f.input :modeloCustom
        f.input :anio, :as => :select, :collection => 1900..2014
        f.input :titulo
        f.input :precio
        f.input :kilometraje
        f.input :combustible, :as => :select, :collection => ['Nafta', 'Nafta | GNC', 'Diesel', 'Diesel | GNC', 'GNC', 'Otro']
        f.input :condicion, :as => :select, :collection => ['Nuevo | 0km', 'Usado']
      end
      f.inputs "Caracteristicas" do
        f.input :equipamiento, :as => :check_boxes, :member_label => :nombre, :member_value => :nombre, :collection => Caracteristica.where(tipo: 'equipamiento'), :input_html => { :class => 'array_equipamiento'}
        f.input :equipamiento, :input_html => { :id => 'vehiculo_equipamiento'}

        f.input :seguridad, :as => :check_boxes, :member_label => :nombre, :member_value => :nombre, :collection => Caracteristica.where(tipo: 'seguridad'), :input_html => { :class => 'array_seguridad'}
        f.input :seguridad, :as => :hidden, :input_html => { :id => 'vehiculo_seguridad'}

        f.input :exterior, :as => :check_boxes, :member_label => :nombre, :member_value => :nombre, :collection => Caracteristica.where(tipo: 'exterior'), :input_html => { :class => 'array_exterior'}
        f.input :exterior, :as => :hidden, :input_html => { :id => 'vehiculo_exterior'}
      end
      f.inputs "Fotos" do
        f.input :foto_ppal, :as => :file
        f.has_many :fotos, :allow_destroy => true, :heading => 'Fotos secundarias' do |cf|
          cf.input :descripciom
          cf.input :imagen
        end
      end
      f.inputs "Especiales" do
        f.input :alta
        f.input :destacado
        f.input :principal
        f.input :denunciado
      end
      f.actions
  end

end
