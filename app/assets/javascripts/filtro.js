function filtros_aplicados () {
	var aplicar = $('#filtros-aplicados');
	aplicar.html(' ');

	//Alerta segmento
	var segmento = $('#vehiculo_segmento_id').val();
	if (segmento) {
		var segmentoLabel = $('#vehiculo_segmento_id :selected').html();
		aplicar.append('<p class="alert alert-info" role="alert"><strong>Vehículo:</strong> '+ segmentoLabel +' <button type="button" class="close" data-dismiss="alert"><i class="fa fa-trash-o"></i></button></p>');
	}

	//Alerta marca
	var marca = $('#vehiculo_marca_id').val();
	if (marca) {
		var marcaLabel = $('#vehiculo_marca_id :selected').html();
		aplicar.append('<p class="alert alert-info" role="alert"><strong>Marca:</strong> '+ marcaLabel +'</p>');
	}

	//Alerta precios
	var precioMin = $('#precioMin').val();
	var precioMax = $('#precioMax').val();
	if ( precioMin || precioMax ) {
		aplicar.append('<p class="alert alert-info" role="alert"><strong>Precio:</strong> '+ precioMin + ' - ' + precioMax + '</p>');
	}

	//Alerta condicion
	var condicion = $('#vehiculo_condicion').val();
	if (condicion) {
		var condicionLabel = $('#vehiculo_condicion :selected').html();
		aplicar.append('<p class="alert alert-info" role="alert"><strong>Condición:</strong> '+ condicionLabel +'</p>');
	}

	//Alerta combustible
	var combustible = $('#vehiculo_combustible').val();
	if (combustible) {
		aplicar.append('<p class="alert alert-info" role="alert"><strong>Combustible:</strong> '+ combustible +'</p>');
	}

	//Alerta ubicacion
	var ubicacion = $('#vehiculo_dpto_mendoza_id').val();
	if (ubicacion) {
		var ubicacionLabel = $('#vehiculo_dpto_mendoza_id :selected').html();
		aplicar.append('<p class="alert alert-info" role="alert"><strong>Ubicación:</strong> '+ ubicacionLabel +'</p>');
	}
}

$( document ).ready(function() {
	filtros_aplicados();
// Slider Precio
	var precioMax_query = $('#precioMax_query').val();
	var max_val;
	// seteo slider
	if (precioMax_query) {
		max_val = precioMax_query;
	}else {
		max_val = 300000;
	}

	$('.span2').slider({
		min: 0,
		max: max_val,
		step: 100,
		value: [0, max_val],
		handle: 'square',
		tooltip: false
	});

	// inicilizar campos precio
	var precioMin = $( "#precioMin" ).val();
	var precioMax = $( "#precioMax" ).val();
	if (precioMin || precioMax ){
		$('.span2').slider('setValue', [precioMin,precioMax]);
	}
	$('.precio-label').html($('.tooltip-inner').html());
		
// Eventos slier	
	// seteo de campos al cambiar posicion del slider
	$('.span2').slider().on('slideStop', function(ev){
		var slide_val = $('.tooltip-inner').html();
		var slide_array = slide_val.split(" : ");
		$( "#precioMin" ).val( slide_array[0] );
		$( "#precioMax" ).val( slide_array[1] );
		$('#new_vehiculo').submit();
	});
	// tooltip
	$('.span2').slider().on('slide', function(ev){
		$('.precio-label').html($('.tooltip-inner').html());
	});
	// seteo del slider al cambiar valores de los campos
	$('.price-change').change(function(){
		var precioMin = $( "#precioMin" ).val();
		var precioMax = $( "#precioMax" ).val();
		var slide_val = $('.tooltip-inner').html();
		var slide_array = slide_val.split(" : ");
		if ( precioMax == "" ){
			$( "#precioMax" ).val(slide_array[1]);
			precioMax = slide_array[1];
		}
		if ( precioMin == "" ){
			$( "#precioMin" ).val(slide_array[0]);
			precioMin = slide_array[0];
		}
		// validar numerico
		if ( $.isNumeric(precioMin) && $.isNumeric(precioMax) ){
			$('.span2').slider('setValue', [precioMin,precioMax]);
		}else{
			$( "#precioMin" ).val("");
			$( "#precioMax" ).val("");
		}
	});

// Inicilizar Array de Comustible
	var array_combustible = [];
	var combustible = $('#vehiculo_combustible').val();
	if (combustible) {
		array_combustible = combustible.split(',');
		$('.array_combustible').each(function(){
			var input_init = $(this).val();
			var exist_init = $.inArray(input_init, array_combustible);
			if ( exist_init != -1) {
				$(this).attr('checked', true);
			}
		});
	}
	// Eventos Combustible
		$('.array_combustible').click(function (){
			var input_val = $(this).val();
			var exist = $.inArray(input_val, array_combustible);
			if ( exist == -1) {
				array_combustible.push(input_val);
			}else{
				array_combustible = jQuery.grep(array_combustible, function(value) {
					return value != input_val;
				});
			}
			$('#vehiculo_combustible').val(array_combustible);
		});

// MAEJO DEL FORMULARIO

	// Submit al modificar campo
	$('.form-control').change(function(){
		$('#new_vehiculo').submit();
	});
	$('.array_combustible').change(function(){
		$('#new_vehiculo').submit();
	});

	// spinner en submit
	$('#new_vehiculo').submit(function(){
		//$('input').prop( "disabled", true );
		//$('select').addClass( "disabled");
		spinner();
	});

	// Limpiar filtros
	$('#eliminar_todos').click(function(){
		$('.filter-input').val('');
		$('#new_vehiculo').submit();
	});

	$('.eliminar').click(function(){
		var input = $(this).parent().parent().next().find('.form-control');
		input.val('');
		$('#new_vehiculo').submit();
	});

	$('.eliminar-precio').click(function(){
		$('#precioMin').val('');
		$('#precioMax').val('');
		$('#new_vehiculo').submit();
	});

	$('.eliminar-combustible').click(function(){
		$('.array_combustible').each(function(){
			$(this).attr('checked', false);
		});
		$('#vehiculo_combustible').val('');
		$('#new_vehiculo').submit();
	});

	$('.close').click(function(){
		$('#vehiculo_segmento_id').val('');
		$('#new_vehiculo').submit();
	});

	// Toggle 
	$('.header-ppal').click(function(){
		$('#filtros_aplicados_contenido').slideToggle( "slow", function() {
			$('.header-ppal .glyphicon-chevron-down').toggle();
			$('.header-ppal .glyphicon-chevron-up').toggle();
		});
	});
	$('.filters-header').click(function(){
		$('#filtros_contenido').slideToggle( "slow", function() {
			$('.filters-header .glyphicon-chevron-down').toggle();
			$('.filters-header .glyphicon-chevron-up').toggle();
		});
	});
});

function spinner (){
	// SPINNER
	var opts = {
		lines: 13, // The number of lines to draw
		length: 20, // The length of each line
		width: 5, // The line thickness
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