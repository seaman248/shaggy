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


$(document).ready(function(){
	$window = $(window);
	$landing = $('.landing');
	$landingContainer = $('.landing .container')
	$nav = $('nav');
	$navLinks = $('.nav-links');
	$navButton = $('.nav-button i');
	$window.scroll(function(){
		if($window.scrollTop() > $landing.height()){
			$nav.addClass('fixed-nav');
		} else {
			$nav.removeClass('fixed-nav');
		}
	});

	$('.fb-resize').autoResizeFbPost();
	// $navButton.click(function(){
	// 	$navLinks.toggle();
	// });
	if (window.matchMedia('(max-device-width: 960px)').matches || window.matchMedia('(max-width: 960px)').matches){
		$navButton.on('click',function(){
			if($navLinks.is(':visible')){
				$navLinks.slideUp();
			} else {
				$navLinks.slideDown();
			}
			return false;
		})
	}
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