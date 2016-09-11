Monolith.Juice = {};

Monolith.Juice.BuildMenuItemUpdate = function(menuItem) {
	
	var parent = menuItem;
		
	// jQuery(parent).children("i").fadeOut(1000);
		
	var newWidth = jQuery(parent).outerWidth() * 1;
	var newHeight = jQuery(parent).outerHeight() * 1;
	// console.log(newWidth + "px " + newHeight + "px");
	
	console.log(jQuery(parent).outerWidth());
	
	jQuery(parent).addClass("buildMenuItemUpdate");
	
	console.log(jQuery(parent).outerWidth());
	
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