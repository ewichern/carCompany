$(document).ready(function() {
//	$('body').addClass('js');
	var $menu = $('.navbar');
	var $menulink = $('.menu-link');

	/* Navbar toggle draws from Brad Frost's Toggle Navigation 
	 * Responsive Design Pattern
	 * found here: http://codepen.io/bradfrost/full/sHvaz
	 * 
	 * MIT License: http://opensource.org/licenses/MIT
	 */
	$menulink.click(function() {
		$menulink.toggleClass('active');
		$menu.toggleClass('active');
		return false;
	});

	/* 
	 * Code and design for carousel/slider comes partially from 
	 * here: http://www.sitepoint.com/web-foundations/making-simple-image-slider-html-css-jquery/
	 * 
	 * and partially from Twitter Bootstrap: http://getbootstrap.com/examples/carousel/
	 * which is another MIT License: http://opensource.org/licenses/MIT
	 * 
	 * However, I coded the click functionality for the dot indicators myself!
	 */

	var currentIndex = 0;
	var items = $('.slideItems>div');
	var indicators = $('.sliderIndicators li');
	var vehicleSelect = $('#vehicleSelect');
	var itemAmt = items.length;

	function cycleItems() {
		var item = $('.slideItems>div').eq(currentIndex);
		items.hide();
		indicators.removeClass('active');
		$(indicators[currentIndex]).addClass('active');
		item.css('display', 'inline-block');
	}

	var autoSlide = setInterval(function() {
		currentIndex += 1;
		if (currentIndex > itemAmt - 1) {
			currentIndex = 0;
		}
		cycleItems();
	}, 5000);

	$('.sliderControl.next').click(function() {
		clearInterval(autoSlide);
		currentIndex += 1;
		if (currentIndex > itemAmt - 1) {
			currentIndex = 0;
		}
		cycleItems();
	});

	$('.sliderControl.prev').click(function() {
		clearInterval(autoSlide);
		currentIndex -= 1;
		if (currentIndex < 0) {
			currentIndex = itemAmt - 1;
		}
		cycleItems();
	});

	indicators.click(function() {
		clearInterval(autoSlide);
		currentIndex = this.value;
		cycleItems();
	});

	vehicleSelect.change(function() {
		selection = this.value;
		var selectedCar = carSelectionArray[selection];
		for (key in selectedCar) {
			$('.'.concat(key.toString())).html(selectedCar[key]);
			if (key === 'imageFilename') {
				$('#vehicleImage a').attr('href', './images/'.concat(selectedCar[key]).toString());
				$('#vehicleImage img').attr('src', './images/'.concat(selectedCar[key]).toString());
				$('#vehicleImage img').attr('alt', selection);
			}
		}	
		$('#selectionDropdown').addClass('block');
		$('.vehicleInfo .hide').addClass('block');
		$('#selectionDropdown').removeClass('textAlignCenter');
		$('.vehicleInfo .hide').removeClass('hide');
	});

/*
 * Code for Vehicle Browser page
 */

var carData = {};

carData.proto = {
	manufacturer: "",
	model: "",
	modelYear: 1900,
	vehicleClass: "",
	bodyStyle: "",
	layout: "",
	drivetrainType: "",
	engine: "",
	electricMotor: "",
	transmission: "",
	battery: "",
	range: "",
	electricRange: "",
	charging: "",
	wheelbase: "",
	length: "",
	width: "",
	height: "",
	curbWeight: "",
	imageFilename: ""
};

// Object factory
carData.create = function(dataArray) {
	var tempCar = Object.create(this.proto);
	var count = 0;
	for (var key in tempCar) {
		tempCar[key] = dataArray[count];
		count++;
	}
	return tempCar;
};

chevyVolt = carData.create(voltArray);
nissanLeaf = carData.create(leafArray);
teslaS = carData.create(teslaArray);

carSelectionArray = {chevyVolt: chevyVolt, nissanLeaf: nissanLeaf, teslaS: teslaS};

});