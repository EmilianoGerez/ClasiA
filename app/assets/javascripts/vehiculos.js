(function($) {
    $.get = function(key) {
		key = key.replace(/[\[]/, '\\[');
		key = key.replace(/[\]]/, '\\]');
		var pattern = "[\\?&]" + key + "=([^&#]*)";
		var regex = new RegExp(pattern);
		var url = unescape(window.location.href);
		var results = regex.exec(url);
		if (results === null) {
			return null;
		} else {
			return results[1];
		}
	}
})(jQuery);

$(document).ready(function(){

// PASOS DEL FORMULARIO
	//Pasos de formulario y comprobacion
		//Inicializado desde CSS
		// $('#paso1 .form-control').each(function(){
		// 	$(this).attr('disabled', true);
		// });
		
		// esconder si se produce un error
		if ($('.alert-danger').html()){
			$('#paso0').hide();
			$('#paso1').fadeIn();
			$('#continuar_paso0').hide();
			$('#continuar_paso1').show();
			$('#titulo_paso').show();
			
		}
		// Paso0 al Paso1
		$('#continuar_paso0').click(function (){
			//validacion de inpust requeridas
			var required = $('#vehiculo_segmento_id').val();

			if ( required){
				$('#paso0').hide();
				$('#paso1').fadeIn();
				$('#continuar_paso0').hide();
				$('#continuar_paso1').show();
				$('#titulo_paso').show();
			}else{
				$('#segmento_error').html('Error: debes seleccionar un segmento');
			}
		});

		// Volver paso1
		$('#volver_paso1').click(function (){
			$('#paso2').hide();
			$('#paso3').hide();
			$('#paso1').fadeIn();
			$('#continuar_paso1').show();
			$('#volver_paso1').hide();
			$('#continuar_paso2').hide();
			$('#volver_paso2').hide();
			$('#publicar').hide();
			$('#titulo_paso').html('Datos del Vehículo');

		});

		// Paso1 al Paso2
		$('#continuar_paso1').click(function (){
			//validacion de inpust requeridas
			var required = $('#vehiculo_dpto_mendoza_id').val() && $('#vehiculo_marca_id').val() && $('#vehiculo_modeloCustom').val() && $('#vehiculo_anio').val() && $('#vehiculo_combustible').val() && $('#vehiculo_condicion').val();
			//validacion de inputs numericas
			var numeric = $.isNumeric( $('#vehiculo_precio').val()) && $.isNumeric( $('#vehiculo_kilometraje').val());

			if ( required && numeric){
				$('#paso1').hide();
				$('#paso2').fadeIn();
				$('#continuar_paso1').hide();
				$('#volver_paso1').show();
				$('#continuar_paso2').show();
				$('#titulo_paso').html('Características del Vehículo');
				$('#vehiculo_titulo').val( $('#titulo_prev').val()); //setea valor titulo
			}
		});

		// Volver paso2
		$('#volver_paso2').click(function (){
			$('#paso1').hide();
			$('#paso3').hide();
			$('#paso2').fadeIn();
			$('#continuar_paso1').hide();
			$('#volver_paso1').show();
			$('#continuar_paso2').show();
			$('#volver_paso2').hide();
			$('#publicar').hide();
			$('#titulo_paso').html('Características del Vehículo');

		});

		// Continuar al paso 3
		$('#continuar_paso2').click(function (){
			$('#paso2').hide();
			$('#paso3').fadeIn();
			$('#continuar_paso2').hide();
			$('#volver_paso1').show();
			$('#volver_paso2').show();
			$('#publicar').show();
			$('#titulo_paso').html('Fotos del Vehículo');
		});

		// Submit ultimo paso
		$('#publicar').click(function (){
			$('#vehiculo_alta').val(1); // setear alta para submit
		});


// CAMPO SEGMENTO
    // Setear segmento
		var segmento = $.get("segmento");
		if ( $('#vehiculo_segmento_id').val() == "" && segmento != "" ) {
			$('#vehiculo_segmento_id').val(segmento);
		}
		$('#vehiculo_segmento_id').change(function(){
			$('.mascara-container').show();
			spinner();
			var segmento_val = $(this).val();
			window.location = "?segmento="+segmento_val;
		});

// CAMPO TITULO
	// Inicializar titulo_prev
		var marca = $('#vehiculo_marca_id :selected').html();
		var modeloc = $('#vehiculo_modeloCustom').val();
		var anio = $('#vehiculo_anio').val();
		var titulo = marca + ' ' + ' ' + modeloc + ' ' + anio;
		$('#titulo_prev').val(titulo);

	//Manejo input titulo
		$('#vehiculo_marca_id').change(function (){
			var marca = $('#vehiculo_marca_id :selected').html();
			var modeloc = $('#vehiculo_modeloCustom').val();
			var anio = $('#vehiculo_anio').val();
			var titulo = marca + ' ' + ' ' + modeloc + ' ' + anio;
			$('#titulo_prev').val(titulo);
		});
		$('#vehiculo_modeloCustom').change(function (){
			var marca = $('#vehiculo_marca_id :selected').html();
			var modeloc = $('#vehiculo_modeloCustom').val();
			var anio = $('#vehiculo_anio').val();
			var titulo = marca + ' ' + ' ' + modeloc + ' ' + anio;
			$('#titulo_prev').val(titulo);
		});
		$('#vehiculo_anio').change(function (){
			var marca = $('#vehiculo_marca_id :selected').html();
			var modeloc = $('#vehiculo_modeloCustom').val();
			var anio = $('#vehiculo_anio').val();
			var titulo = marca + ' ' + ' ' + modeloc + ' ' + anio;
			$('#titulo_prev').val(titulo);
		});

// CAMPO ALTA
	// Inicializar input alta, previene submit
		$('#vehiculo_alta').val(''); // prevenir submit

// CAMPO USUARIO
	//Setear input con variable de usuario
		var usuario = $("#usuario_id").val();
		$("#vehiculo_usuario_id").val(usuario);

// ARRAY CARACTERISTICAS
	// Inicilizar Array de Equipamiento
		var array_equipamiento = [];
		var equipamiento = $('#vehiculo_equipamiento').val();
		if (equipamiento) {
			array_equipamiento = equipamiento.split(',');
		}

	// Inicilizar Array de Seguridad
		var array_seguridad = [];
		var seguridad = $('#vehiculo_seguridad').val();
		if (seguridad) {
			array_seguridad = seguridad.split(',');
		}

	// Inicilizar Array de Exterior
		var array_exterior = [];
		var exterior = $('#vehiculo_exterior').val();
		if (exterior) {
			array_exterior = exterior.split(',');
		}

	// Eventos Equipamiento
		$('.array_equipamiento').click(function (){
			var input_val = $(this).val();
			var exist = $.inArray(input_val, array_equipamiento);
			if ( exist == -1) {
				array_equipamiento.push(input_val);
			}else{
				array_equipamiento = jQuery.grep(array_equipamiento, function(value) {
					return value != input_val;
				});
			}
			$('#vehiculo_equipamiento').val(array_equipamiento);
		});

	// Eventos Seguridad
		$('.array_seguridad').click(function (){
			var input_val = $(this).val();
			var exist = $.inArray(input_val, array_seguridad);
			if ( exist == -1) {
				array_seguridad.push(input_val);
			}else{
				array_seguridad = jQuery.grep(array_seguridad, function(value) {
					return value != input_val;
				});
			}
			$('#vehiculo_seguridad').val(array_seguridad);
		});

	// Eventos Exterior
		$('.array_exterior').click(function (){
			var input_val = $(this).val();
			var exist = $.inArray(input_val, array_exterior);
			if ( exist == -1) {
				array_exterior.push(input_val);
			}else{
				array_exterior = jQuery.grep(array_exterior, function(value) {
					return value != input_val;
				});
			}
			$('#vehiculo_exterior').val(array_exterior);
		});

//FOTOS Y COOCON ANIDADO
	// Estilo input file con bootsjs
		$(":file").filestyle({buttonName: "btn-primary", buttonText: "Seleccionar", icon: false });
	// Fotos Anidadas
		$( "#agregar" ).click(function() { //cantidad de campos de fotos
			var cant = $( ".nested-fields" ).length;
			if (cant > 2){
				$( "#agregar" ).attr('disabled', true);
			}
		});

		$( "#borrar" ).click(function() {
				$(".nested-fields").last().remove();
				$( "#agregar" ).attr('disabled', false);
		});

});

function spinner (){
	// SPINNER
	var opts = {
		lines: 13, // The number of lines to draw
		length: 20, // The length of each line
		width: 10, // The line thickness
		radius: 30, // The radius of the inner circle
		corners: 1, // Corner roundness (0..1)
		rotate: 0, // The rotation offset
		direction: 1, // 1: clockwise, -1: counterclockwise
		color: '#000', // #rgb or #rrggbb or array of colors
		speed: 1, // Rounds per second
		trail: 60, // Afterglow percentage
		shadow: false, // Whether to render a shadow
		hwaccel: false, // Whether to use hardware acceleration
		className: 'spinner', // The CSS class to assign to the spinner
		zIndex: 2e9, // The z-index (defaults to 2000000000)
		top: '50%', // Top position relative to parent
		left: '50%' // Left position relative to parent
	};
	$('#cargando').after(new Spinner(opts).spin().el);
}