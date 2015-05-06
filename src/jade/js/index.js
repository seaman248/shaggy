(function ($) {

	jQuery.fn.autoResizeFbPost = function () {

		var fixWidth = function ($container, $clonedContainer, doParse) {
			// default parameter. 
			doParse = typeof doParse == 'undefined' ? true : doParse;
			var updatedWidth = $container.width();
			// update all div.fb-post with correct width of container
			var isMobile = window.matchMedia("only screen and (max-width: 600px)");

			if (isMobile.matches) {
				//Conditional script here  
				if (window.matchMedia("(orientation: portrait)").matches) {
					// you're in PORTRAIT mode
					updatedWidth = $(window).width();
				}

				if (window.matchMedia("(orientation: landscape)").matches) {
					// you're in LANDSCAPE mode
					updatedWidth = $(window).height();
				}
			}

			$clonedContainer
				.find('div.fb-post')
				.each(function () {
					$(this).attr('data-width', updatedWidth);
				});
			$('div.embedded', $clonedContainer).each(function () {
				$(this).attr('max-width', updatedWidth);
			});
			// update page with adjusted markup
			$container.html($clonedContainer.html());

			//should we call FB.XFBML.parse? we don't want to do this at page load because it will happen automatically
			if (doParse && FB && FB.XFBML && FB.XFBML.parse)
				FB.XFBML.parse();
		};

		return this.each(function () {

			var $container = $(this),
			 $clonedContainer = $container.clone();

			// make sure there is a .fb-post element before we do anything.
			if (!$container.find('div.fb-post').length) {
				return false;
			}

			// execute once (document.ready) and do not call FB.XFBML.parse()
			fixWidth($container, $clonedContainer, false);

			$(window).bind('resize', function () {
				fixWidth($container, $clonedContainer);
			}).trigger('resize');
	   });
	};

})(jQuery);

var isMobile = function(pxs){
	if(screen.width < pxs || $(window).width() < pxs){
		return (true);
	} else {
		return (false);
	}
};

$(document).ready(function(){
	$window = $(window);
	$landing = $('.landing');
	$landingContainer = $('.landing .container')
	$nav = $('nav');
	$navLinks = $('.nav-links');
	$navButton = $('.nav-button i');
	$navBefore = $('.nav-before');
	$navLogo = $('.nav-logo');
	$window.scroll(function(){
		if($window.scrollTop() > $('.landing__info').height()){
			if(!isMobile(960)){
				$nav.addClass('fixed-nav');
				$navLinks.addClass('nav-links-with-logo');
				$navLogo.show();
			}
		} else {
			$nav.removeClass('fixed-nav');
			$navLinks.removeClass('nav-links-with-logo');
			$navLogo.hide();
		}
	});

	$('.map-container').height($('.contact-form').height())

	$('.fb-resize').autoResizeFbPost();

	$navButton.on('click',function(){
		if($navLinks.is(':visible')){
			$navLinks.slideUp();
			$navBefore.hide();
			$('body').unbind('touchmove')
			$("html,body").css("overflow","auto");
		} else {
			$navLinks.slideDown();
			$navBefore.show();
			$('body').bind('touchmove', function(e){e.preventDefault()});
			$("html,body").css("overflow","hidden");
		}
		return false;
	});
	$navBefore.on('click', function(){
		$navLinks.slideUp();
		$navBefore.hide();
		$('body').unbind('touchmove')
		$("html,body").css("overflow","auto");
	})
	$window.resize(function(){
		if(!$navButton.is(':visible')){
			$navLinks.show();
		}
	})
	$lorealLogo = $('.landing__loreal-logo')
	var autoHeightLanging = function(){
		var lorealMarginTop;
		var diff;
		if(screen.width < 760){
			diff = 550;
		} else {
			diff = 130;
		}
		lorealMarginTop =
			$window.height() 
			- diff
			- $('.landing__info').height() 
			- $lorealLogo.height() 
			- $('.landing__footer').height();
		$lorealLogo.css({
			'margin-top': lorealMarginTop
		});
	}
	autoHeightLanging();
	$window.resize(function(){
		autoHeightLanging();
	});
});

google.maps.event.addDomListener(window, 'load', init);

function init() {
	var mapOptions = {
		zoom: 13,
		center: new google.maps.LatLng(40.7747151, -73.9567418),
		styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
	};
	var mapElement = document.querySelector('.map-container');
	var map = new google.maps.Map(mapElement, mapOptions);
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(40.7747151, -73.9567418),
		map: map,
		title: 'Shaggy hair studio'
	});
}