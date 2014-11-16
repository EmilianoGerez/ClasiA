//= require jquery.bxslider.min
//= require typeahead.bundle.min
//= require typeahead.jquery.min

$(document).ready(function(){
	$('.bxslider').bxSlider({
		minSlides: 1,
		maxSlides: 5,
		slideWidth: 200,
		slideMargin: 10,
		hideControlOnEnd: false,
		adaptiveHeight: true,
	});

	var vehiculos = new Bloodhound({
	datumTokenizer: Bloodhound.tokenizers.obj.whitespace('titulo'),
	queryTokenizer: Bloodhound.tokenizers.whitespace,
	prefetch: './vehiculos.json',
	//remote: './vehiculos.json',
	});
	 
	vehiculos.initialize();
	 
	$('.typeahead').typeahead(null, {
	name: 'vehiculo',
	displayKey: 'marca_modelo',
	source: vehiculos.ttAdapter()
	});
});