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
		$landingFooter = $('.landing__footer');
		$landingInfo = $('.landing__info');
		$subLandingArrow = $('.sub-landing-arrow');
		var autoHeightLanging = function(){
			var landingFooterPaddingTop;
			if(!$navButton.is(':visible') && screen.width >760){
				landingFooterPaddingTop = $window.height() - $landingInfo.outerHeight(true) - $landingFooter.height() - $subLandingArrow.height()/2 - 20;
			} else if ($navButton.is(':visible') && screen.width <760) {
				landingFooterPaddingTop = $window.height() - $landingInfo.outerHeight(true)*2 - $landingFooter.height() - $subLandingArrow.height()/2 + 145;
			} else {
				landingFooterPaddingTop = $window.height() - $landingInfo.outerHeight(true) - $landingFooter.height() - $subLandingArrow.height()/2 -145;
			}
			$('.landing__footer').css({
				'margin-top': landingFooterPaddingTop
			});
		}
		autoHeightLanging();
		$window.resize(function(){
			autoHeightLanging();
		});

		autoHeightPanel2();
		autoHeightPanel3();
		$window.resize(function(){
			autoHeightPanel2();
			autoHeightPanel3();
		});

		if($(location).attr('hash') === '#contact'){
			doScrollToContact();
		}
	});
	var doScrollToContact = function(){
		var scrollToContact = $('.homepage-prefooter').offset().top;
		$("html, body").animate({ scrollTop: scrollToContact + $window.height() }, 1000);
	}
	
	$('.ScrollToContact').on('click', function(e){
		e.preventDefault();
		doScrollToContact();
	});

	var $scrollToPanel2Button = $('#to-panel2');

	$scrollToPanel2Button.on('click', function(){
		var scrollToPanel2Px = $('.panel2').offset().top;
		$('html, body').animate({ scrollTop: scrollToPanel2Px - $nav.height() }, 1000)
	})

	var $scrollToPanel3Button = $('#to-panel3');

	$scrollToPanel3Button.on('click', function(){
		var scrollToPanel3Px = $('.panel3').offset().top;
		$('html, body').animate({ scrollTop: scrollToPanel3Px - $nav.height() }, 1000)
	})

	var $scrollToPanel4Button = $('#to-panel4');

	$scrollToPanel4Button.on('click', function(){
		var scrollToPanel4Px = $('.panel4').offset().top;
		$('html, body').animate({ scrollTop: scrollToPanel4Px - $nav.height() }, 1000)
	})

	// Bouncing arrow-down
	setInterval(function(){
		$('.arrow-container').effect("bounce", {times: 3}, 800);
	}, 3000)
	
	var $panel2 = $('.panel2');
	var $panel2Container = $('.panel2-container');
	var autoHeightPanel2 = function(){
		if(!$navButton.is(':visible')){
			$panel2.css({
				'padding-top': ($window.height() - $panel2Container.height())/7 + 'px',
				'padding-bottom': ($window.height() - $panel2Container.height())/11 + 'px'
			})
		}
	}

	var $panel3 = $('.panel3');
	var $panel3DownButtonBlock = $('.panel3 .sub-landing-arrow')
	var autoHeightPanel3 = function(){
		if(!$navButton.is(':visible') && $window.height()>$panel3.height()){
			$panel3DownButtonBlock.css({
				'margin-top': $window.height() - $panel3.height()
			})
		}
	}
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