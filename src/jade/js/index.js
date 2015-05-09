(function ($) {

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
		if($landing.length){
			$window.scroll(function(){
				if($window.scrollTop() > $('.landing__info').height()/2){
					if(!isMobile(1080)){
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
		} else {
			var showNavBar = function(){
				if(!$navButton.is(':visible')){
					$nav.addClass('fixed-nav');
					$navLinks.addClass('nav-links-with-logo');
					$navLogo.show();
					$('.content').css({
						'padding-top': $nav.height()+30
					})
				} else {
					$nav.removeClass('fixed-nav');
					$navLogo.hide();
					$navLinks.removeClass('nav-links-with-logo');
				}
			}
			showNavBar();
			$window.resize(function(){
				showNavBar();
			})
		}

		$('.map-container').height($('.contact-form').height());

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
			} else {
				$navLinks.hide();
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

	var scrollToContact = $('.homepage-prefooter').offset().top;
	$('.ScrollToContact').on('click', function(e){
		e.preventDefault();
		$("html, body").animate({ scrollTop: scrollToContact + $window.height() }, 1000);
	});

})(jQuery);

google.maps.event.addDomListener(window, 'load', init);

function init() {
	var mapOptions = {
		zoom: 18,
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