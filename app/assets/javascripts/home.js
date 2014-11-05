//= require jquery.bxslider.min

$(document).ready(function(){
	$('.bxslider').bxSlider({
		minSlides: 1,
		maxSlides: 5,
		slideWidth: 200,
		slideMargin: 10,
		hideControlOnEnd: false,
		adaptiveHeight: true,
	});
});