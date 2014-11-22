class AgenciaController < ApplicationController
	before_action :set_agencia

  def index
  	@segmento = params[:segmento]
  	unless @segmento.blank?
  		@vehiculos = Vehiculo.where(alta: true, segmento_id: @segmento, agencia_id: @agencia.id)
  		@vehiculos_principal = Vehiculo.where(alta: true, principal: true, segmento_id: @segmento, agencia_id: @agencia.id)
    else
		  @vehiculos = Vehiculo.where(alta: true, agencia_id: @agencia.id)
  		@vehiculos_principal = Vehiculo.where(alta: true, principal: true, agencia_id: @agencia.id)
    end
  end

  private
  def set_agencia
      @agencia = Agencia.find(params[:id])
      # obtener los segmentos en los que existe publicacions de la agencia
      @segmentos = Vehiculo.where(agencia_id: params[:id]).select('segmento_id').uniq
  end
end
