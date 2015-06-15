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
	voltArray = ["General Motors", "Chevrolet Volt", "2015", "Compact Car", "5-door hatchback", "Transverse front-engine, front-wheel drive", "Hybrid (GM Voltec)", "1 x 84hp, 1398cc EcoFLEX Inline 4cyl", "1 x 149hp, 1 x 74hp, permanent magnet motor/generators", "Voltec Multi-mode electric transaxle", "17.1kWh lithium-Ion", "380 miles", "52 miles", "120V/15A, 240V/20A AC", "105.7 in", "177.1 in", "70.4 in", "56.6 in", "3,794 lb", "volt.jpg"];
	leafArray = ["Nissan", "Leaf", "2013", "Compact Car", "5-door hatchback", "Front-engine, front-wheel drive", "Electric", "n/a", "110hp synchronous motor", "Single speed constant ratio", "24kWh lithium-ion", "75 miles", "75 miles", "3.3kW (optional 6.6kW + 240V AC), adaptors for domestic AC sockets -- max 44 kW 480V DC", "106.3 in", "175.0 in", "69.7 in", "61.0 in", "3,291 lb", "leaf.jpg"];
	teslaArray = ["Tesla Motors", "Tesla Model S", "2015", "Full-size Luxury", "5-door liftback", "Rear-motor, rear-wheel drive or Dual motor all-wheel drive ('D' versions)", "Electric", "n/a", "416bhp three-phase AC induction motor", "1-speed fixed gear", "40, 60, 70, or 85 kWh lithium-ion", "75 kWh: 240 miles <br/> 85 kWh: 265 miles", "75 kWh: 240 miles <br/> 85 kWh: 265 miles", "11 kW 85-265 V onboard charger, optional twin charger for 22 kWh, Supercharger for 120 kWh DC offboard charging, adaptors for domestic AC sockets", "116.5 in", "195.9 in", "77.3 in", "56.5 in", "4,323 lb (S60) - 4,936 lb (P85D)", "tesla.jpg"];

	chevyVolt = carData.create(voltArray);
	nissanLeaf = carData.create(leafArray);
	teslaS = carData.create(teslaArray);

	carSelectionArray = {chevyVolt: chevyVolt, nissanLeaf: nissanLeaf, teslaS: teslaS};

});