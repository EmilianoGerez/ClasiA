//= require jquery.bxslider.min

$(document).ready(function(){
	$('.bxslider').bxSlider({
		pagerCustom: '#bx-pager'
	});

// Carcateristicas
	$('#header_equipamiento').click(function(){
		if (!$( this ).hasClass('activo')) {
			$( this ).addClass('activo');
			$('#header_seguridad').removeClass('activo');
			$('#header_exterior').removeClass('activo');
			$('#body_seguridad').hide();
			$('#body_exterior').hide();
			$('#body_equipamiento').show();
		}
	});
	// seguridad
	$('#header_seguridad').click(function(){
		if (!$( this ).hasClass('activo')) {
			$( this ).addClass('activo');
			$('#header_equipamiento').removeClass('activo');
			$('#header_exterior').removeClass('activo');
			$('#body_equipamiento').hide();
			$('#body_exterior').hide();
			$('#body_seguridad').show();
		}
	});
	// exterior
	$('#header_exterior').click(function(){
		if (!$( this ).hasClass('activo')) {
			$( this ).addClass('activo');
			$('#header_equipamiento').removeClass('activo');
			$('#header_seguridad').removeClass('activo');
			$('#body_equipamiento').hide();
			$('#body_seguridad').hide();
			$('#body_exterior').show();
		}
	});
});