Monolith.Juice = {};

Monolith.Juice.BuildMenuItemUpdate = function(menuItem) {
	
	var parent = menuItem;
		
	// jQuery(parent).children("i").fadeOut(1000);
		
	var newWidth = jQuery(parent).outerWidth() * 1;
	var newHeight = jQuery(parent).outerHeight() * 1;
	
	jQuery(parent).addClass("buildMenuItemUpdate");
	
	setTimeout(function() {
		
		jQuery(parent).css({
			"background-image" : "linear-gradient(135deg, rgba(42,91,111,1) 0%,rgba(255,255,255,1) 50%,rgba(42,91,111,1) 100%)",
			"background-position" : "-" + newWidth + "px -" + newHeight + "px"
		});
	}, 1);

	setTimeout(function() {
	
		newWidth = newWidth * 2;
		
		newHeight = newHeight * 2;
				
		jQuery(parent).css({
			"background-position" : "-" + newWidth + "px -" + newHeight + "px"
		});
			
		jQuery(parent).children("i").fadeIn(1000);
	}, 1000);
	
	setTimeout(function() {
				
		jQuery(parent).css({
			"background-image" : "none"
		});
	}, 3000);
}

Monolith.Juice.MenuOpen = function(menu) {
	
	var top = jQuery(menu).offset().top;
	
	// Starting from the bottom, not the top
	var bottom = $(window).height() - jQuery(menu).height() - jQuery(menu).offset().top;
	bottom = jQuery(menu).position().top + jQuery(menu).offset().top + jQuery(menu).outerHeight(true);
	bottom = jQuery(menu).position().top + jQuery(menu).offset().top;
	bottom = jQuery("#monolith .col.active").offset().top;
	console.log("bottom: " + bottom + " top " + top + " offset " + jQuery(menu).offset().top + "height " + jQuery(menu).outerHeight());
	
	jQuery(menu).css("bottom", bottom).css("top", "");
	
	jQuery(menu).css("max-height", ".5em");
	
	jQuery(menu).css("visibility", "visible");
	
	setTimeout(function() {
		jQuery(menu).css("max-height", "100%");
	}, 1);
}

// If the device is NOT on battery, crank up the juice!
navigator.getBattery().then(function(battery) { 
	
	if(battery.charging) jQuery("body").addClass("animated");
});
