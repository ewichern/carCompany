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
	var items = $('.slideItems div');
	var indicators = $('.sliderIndicators li');
	var vehicleSelect = $('#vehicleSelect');
	var itemAmt = items.length;

	function cycleItems() {
		var item = $('.slideItems div').eq(currentIndex);
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
	
	vehicleSelect.change(function () {
		selection = this.value;
		var selectedCar = carArray[selection];
		var genInfo = selectedCar.generalInfo;
		for (key in genInfo) {
			$('#'.concat(key.toString())).html(genInfo[key]);
		}
	});
});

/*
 * Code for Vehicle Browser page
 */

var carData = {};

carData.proto = {
	generalInfo: {},
	powertrainInfo: {},
	physicalInfo: {}
};



// Object factory
carData.create = function(genInfo, powerInfo, physInfo) {
	var tempCar = Object.create(this.proto);
	tempCar.generalInfo = genInfo;
	tempCar.powertrainInfo = powerInfo;
	tempCar.physicalInfo = physInfo;
	return tempCar;
};

var carGenInfo = {};

carGenInfo.proto = {
	manufacturer: "",
	model: "",
	modelYear: 1900,
	vehicleClass: "",
	bodyStyle: "",
	layout: ""
};

carGenInfo.create = function(infoArray) {
	var tempInfo = (Object.create(this.proto));
	var count = 0;
	for (var key in tempInfo) {
		tempInfo[key] = infoArray[count];
		count++;
	}
	return tempInfo;
};

var carPowInfo = {};

carPowInfo.proto = {
	drivetrainType: "",
	engine: "",
	electricMotor: "",
	transmission: "",
	battery: "",
	range: "",
	electricRange: "",
	charging: ""
};

carPowInfo.create = function(infoArray) {
	var tempInfo = (Object.create(this.proto));
	var count = 0;
	for (var key in tempInfo) {
		tempInfo[key] = infoArray[count];
		count++;
	}
	return tempInfo;
};

var carPhysInfo = {};

carPhysInfo.proto = {
	wheelbase: "",
	length: "",
	width: "",
	height: "",
	curbWeight: ""
};

carPhysInfo.create = function(infoArray) {
	var tempInfo = (Object.create(this.proto));
	var count = 0;
	for (var key in tempInfo) {
		tempInfo[key] = infoArray[count];
		count++;
	}
	return tempInfo;
};

voltGenInfoArray = ["General Motors", "Chevrolet Volt", 2015, "Compact Car", "5-door hatchback", "Transverse front-engine, front-wheel drive"];
voltPowInfoArray = ["Hybrid (GM Voltec)", "1 x 84hp, 1398cc EcoFLEX Inline 4cyl", "1 x 149hp, 1 x 74hp, permanent magnet motor/generators", "Voltec Multi-mode electric transaxle", "17.1kWh lithium-Ion", "380 miles", "52 miles", "120V/15A, 240V/20A AC"];
voltPhysInfoArray = ["105.7 in", "177.1 in", "70.4 in", "56.6 in", "3,794 lb"];

voltGenInfo = carGenInfo.create(voltGenInfoArray);
voltPowInfo = carPowInfo.create(voltPowInfoArray);
voltPhysInfo = carPhysInfo.create(voltPhysInfoArray);

chevyVolt = carData.create(voltGenInfo, voltPowInfo, voltPhysInfo);

carArray = { chevyVolt: chevyVolt };