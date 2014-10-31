class VehiculosController < ApplicationController
  before_action :set_vehiculo, only: [:show, :edit, :update, :destroy]
  before_action :set_empty_vehiculo, only: [:index]
  # GET /vehiculos
  # GET /vehiculos.json
  def index
    

    if params[:vehiculo]
      @vehiculo = Vehiculo.new(vehiculo_params)

      # obtener el paramtero segmento y filtrar la busqueda
      @segmento = params[:vehiculo]['segmento_id']
      if @segmento.blank?
        @vehiculos = Vehiculo.all
      else
        @vehiculos = Vehiculo.where(segmento_id: @segmento)
      end

      # MARCA
      @marca = params[:vehiculo][:marca_id]
      unless @marca.blank?
        @vehiculos = @vehiculos.where(marca_id: @marca)
      end
      # PRECIO
      # obtener el valor maximo
      @max = @vehiculos.order(precio: :desc).first
      unless @max.blank?
        params[:precioMax_query] = @max.precio
      end
      # Filtrado por precio
      @precioMin = params[:precioMin]
      @precioMax = params[:precioMax]
      unless @precioMin.blank? and @precioMax.blank?
        @vehiculos = @vehiculos.where(precio: (@precioMin.to_f)..(@precioMax.to_f))
      end

      # CONDICION
      @condicion = params[:vehiculo][:condicion]
      unless @condicion.blank?
        @vehiculos = @vehiculos.where(condicion: @condicion)
      end

       # UBICACION
      @ubicacion = params[:vehiculo][:dpto_mendoza_id]
      unless @ubicacion.blank?
        @vehiculos = @vehiculos.where(dpto_mendoza_id: @ubicacion)
      end

      #COMBUSTIBLE
      @combustible = params[:vehiculo][:combustible]
      unless @combustible.blank?
        @arrayCombustible = @combustible.split(",")
        @aux = []
        @arrayCombustible.each do |e| 
          if e == "GNC"
            @aux = @aux + @vehiculos.where('combustible LIKE ?', "%#{e}%")
          else
            @aux = @aux + @vehiculos.where(combustible: e)
          end
        end
        @vehiculos = @aux
      end

      # paginar todos los vehiculos
      @vehiculos = @vehiculos.paginate(:page => params[:page], :per_page => 4)
      
    else
      @vehiculos = Vehiculo.all
      @vehiculos = @vehiculos.paginate(:page => params[:page], :per_page => 4)
      # obtener el valor maximo
      @max = @vehiculos.order(precio: :desc).first
      unless @max.blank?
        params[:precioMax_query] = @max.precio
      end
    end
  end

  # GET /vehiculos/1
  # GET /vehiculos/1.json
  def show
  end

  # GET /vehiculos/new
  def new
    @vehiculo = Vehiculo.new
    segmento = params[:segmento]
    @caracteristicas_equipamiento = Caracteristica.where(segmento_id: segmento, tipo: 'equipamiento')
    @caracteristicas_seguridad = Caracteristica.where(segmento_id: segmento, tipo: 'seguridad')
    @caracteristicas_exterior = Caracteristica.where(segmento_id: segmento, tipo: 'exterior')
  end

  # GET /vehiculos/1/edit
  def edit
  end

  # POST /vehiculos
  # POST /vehiculos.json
  def create
    @vehiculo = Vehiculo.new(vehiculo_params)
    respond_to do |format|
      if @vehiculo.save
        format.html { redirect_to @vehiculo, notice: 'Vehiculo was successfully created.' }
        format.json { render :show, status: :created, location: @vehiculo }
      else
        format.html { render :new }
        format.json { render json: @vehiculo.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /vehiculos/1
  # PATCH/PUT /vehiculos/1.json
  def update
    respond_to do |format|
      if @vehiculo.update(vehiculo_params)
        format.html { redirect_to @vehiculo, notice: 'Vehiculo was successfully updated.' }
        format.json { render :show, status: :ok, location: @vehiculo }
      else
        format.html { render :edit }
        format.json { render json: @vehiculo.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /vehiculos/1
  # DELETE /vehiculos/1.json
  def destroy
    @vehiculo.destroy
    respond_to do |format|
      format.html { redirect_to vehiculos_url, notice: 'Vehiculo was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_empty_vehiculo
      @vehiculo = Vehiculo.new
    end

    def set_vehiculo
      @vehiculo = Vehiculo.find(params[:id])
      @segmento = @vehiculo.segmento_id
      @caracteristicas_equipamiento = Caracteristica.where(tipo: 'equipamiento', segmento_id: @segmento)
      @caracteristicas_seguridad = Caracteristica.where(tipo: 'seguridad', segmento_id: @segmento)
      @caracteristicas_exterior = Caracteristica.where(tipo: 'exterior', segmento_id: @segmento)
      @split_equipamiento = @vehiculo.equipamiento.split(",")
      @split_seguridad = @vehiculo.seguridad.split(",")
      @split_exterior = @vehiculo.exterior.split(",")
    end
    # Never trust parameters from the scary internet, only allow the white list through.
    def vehiculo_params
      params.require(:vehiculo).permit(:usuario_id, :agencia_id, :segmento_id, :dpto_mendoza_id, :marca_id, :modelo_id, :modeloCustom, :titulo, :anio, :kilometraje, :combustible, :precio, :condicion, :comentario, :destacado, :principal, :denunciado, :alta, :equipamiento, :seguridad, :exterior, :foto_ppal, fotos_attributes: [:id, :descripciom, :imagen, :_destroy])
    end
end
