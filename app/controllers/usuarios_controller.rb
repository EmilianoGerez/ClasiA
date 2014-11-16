class UsuariosController < ApplicationController
  def publicaciones
  	@segmento = params[:segmento]
  	unless @segmento.blank?
  		# comprobar que sea un segemento valido
	  	unless Segmento.exists?(id: @segmento)
	  		redirect_to usuarios_publicaciones_path
		end
	  	#@publicaciones = Vehiculo.where(usuario_id: current_usuario.id)
	  	@vehiculos_principal = Vehiculo.where(alta: true, principal: true, segmento_id: @segmento).order(created_at: :desc)
	  	@vehiculos = Vehiculo.where(alta: true, principal: false, segmento_id: @segmento).order(created_at: :desc)
  	else
  		#@publicaciones = Vehiculo.where(usuario_id: current_usuario.id)
  		@vehiculos_principal = Vehiculo.where(alta: true, principal: true).order(created_at: :desc)
  		@vehiculos = Vehiculo.where(alta: true, principal: false).order(created_at: :desc)
  	end
  	# contar cantidad
  	@cant_total = @vehiculos.length
  	@cant_autos = @vehiculos.where(segmento_id: 1).length
  	@cant_camionetas = @vehiculos.where(segmento_id: 2).length
  	@cant_camiones = @vehiculos.where(segmento_id: 3).length
  	@cant_motos = @vehiculos.where(segmento_id: 4).length
  	@cant_nautica = @vehiculos.where(segmento_id: 5).length
  	@cant_otros = @vehiculos.where(segmento_id: 6).length
  end
end
