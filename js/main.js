$(document).ready(function($) {

	"use strict";

// Function to check date/time and redirect if necessary
  function checkAndRedirect() {
    // Get current URL
    var currentUrl = window.location.href;

    // Check if the URL contains query parameters (e.g., ?private=yes)
    if (currentUrl.includes("?private=yes")) {
      return; // Do nothing if there are query parameters
    }

    // Get current date/time in Brussels timezone
    var now = new Date().toLocaleString("en-US", { timeZone: "Europe/Brussels" });
    var currentTime = new Date(now);

    // Define start and end time in Brussels timezone
    var startTime = new Date("2025-02-28T00:00:00+01:00"); // Feb 28, 12:00 AM Brussels time
    var endTime = new Date("2025-03-03T05:30:00+01:00"); // Mar 3, 5:30 AM Brussels time

    // Check if current time falls within the range
    if (currentTime >= startTime && currentTime <= endTime) {
      window.location.href = "https://www.eppo.europa.eu";
    }
  }

    // Run the function to check and redirect
    checkAndRedirect();

  // Run the function to check and redirect
  checkAndRedirect();

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.eppo_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();
	

	// Function to initialize animations
	var contentWayPoint = function() {
		var i = 0;
		$('.eppo-animate').waypoint(function(direction) {
			if (direction === 'down' && !$(this.element).hasClass('eppo-animated')) {
				i++;
				$(this.element).addClass('item-animate');
				setTimeout(function() {
					$('body .eppo-animate.item-animate').each(function(k) {
						var el = $(this);
						setTimeout(function() {
							var effect = el.data('animate-effect');
							if (effect === 'fadeIn') {
								el.addClass('fadeIn eppo-animated');
							} else if (effect === 'fadeInLeft') {
								el.addClass('fadeInLeft eppo-animated');
							} else if (effect === 'fadeInRight') {
								el.addClass('fadeInRight eppo-animated');
							} else if (effect === 'fadeInDown') {
								el.addClass('fadeInDown eppo-animated');
							} else {
								el.addClass('fadeInUp eppo-animated');
							}
							el.removeClass('item-animate');

              // Start the counter animation after the element animation completes
							setTimeout(function() {
						    $('.n-counter').waypoint(function(direction) {
					        if (direction === 'down' && !$(this.element).hasClass('eppo-animated')) {
				            $(this.element).find('.eppo-number').each(function() {
			                var $this = $(this),
		                    num = $this.data('number'),
		                    decimalPlaces = $this.data('decimal-places');

			                // Define the numberStep function
			                var numberStep = function(now, tween) {
		                    var formattedNumber = decimalPlaces !== undefined
	                        ? now.toFixed(decimalPlaces) // Format with decimal places
	                        : Math.floor(now); // No decimals

		                    // Add space as a thousands separator
		                    formattedNumber = formattedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

		                    $(tween.elem).text(formattedNumber);
		                };

			                // Animate the number with the custom numberStep function
			                $this.animateNumber(
		                    {
	                        number: num,
	                        numberStep: numberStep
		                    },
		                    3000 // Duration of the counter animation in milliseconds
			                );
				            });
				            $(this.element).addClass('eppo-animated');
					        }
						    }, { offset: '100%' });
						}, 2000);


						 // Adjust the delay (in milliseconds) as needed

            }, k * 100); // Adjust the delay (in milliseconds) as needed
					});
				}, 100);
			}
		}, { offset: '95%' });
	};
	contentWayPoint();


	// navigation
	var OnePageNav = function() {
		$(".smoothscroll[href^='#'], #eppo-nav ul li a[href^='#']").on('click', function(e) {
			e.preventDefault();
			var hash = this.hash,
			target = $(hash),
			navToggler = $('.navbar-toggler'),
			eppoNavigation = $('#eppo-nav');

      if (target.length) { // Prevent errors if target section is missing
      	$('html, body').animate({
      		scrollTop: target.offset().top
        }, 1000, 'swing', function() { // Used 'swing' for broader compatibility
          history.replaceState(null, null, hash); // Fix for URL jump issues
        });
      }

      // Remove 'active' class from all nav links
      $('#eppo-nav ul li a').removeClass('active');

      // Add 'active' class to the clicked nav link
      $(this).addClass('active');

      // Close mobile menu using Bootstrap’s collapse method
      if (navToggler.is(':visible')) {
      	navToggler.click();
      	var bsCollapse = new bootstrap.Collapse(eppoNavigation, { toggle: false });
        bsCollapse.hide(); // Properly collapses the menu
      }
    });
	};
	OnePageNav();


	/**
   * Back to top button
   */
  let backtotop = $(".back-to-top");
  
  if (backtotop.length) {
    const toggleBacktotop = () => {
      if ($(window).scrollTop() > 100) {
        backtotop.addClass('active');
      } else {
        backtotop.removeClass('active');
      }
    };

    $(window).on('load scroll', toggleBacktotop);
  }



});

