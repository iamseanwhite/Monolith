Monolith.UI.Hint = function(message) {
	
	jQuery("#message-overlay div")
		// .css("vertical-align", "middle")
		// .css("padding-top", "0")
		.append('<span class="hint">' + message + '</span>');
		
	setTimeout(function() {
		jQuery("#message-overlay .hint")
			.css("opacity", ".7");
		}, 20);
		
	Monolith.UI.FadeMessageOut(4200);
}

Monolith.UI.TitleMessage = function(message) {
	
	jQuery("#message-overlay div")
		.css("vertical-align", "top")
		.css("padding-top", "10%")
		.append('<span>' + message + '</span>');
		
	setTimeout(function() {
		jQuery("#message-overlay h1").css("opacity", ".9");
		}, 1);
		
	Monolith.UI.FadeMessageOut(3000);
}

Monolith.UI.FadeMessageOut = function(time) {
		
	setTimeout(function() {
		jQuery("#message-overlay span h1").css("opacity", "0");
		jQuery("#message-overlay .hint").css("opacity", "0");
		}, time);
		
	setTimeout(function() {
		jQuery("#message-overlay span").remove();
		}, time + 2000);	
}

Monolith.UI.HighlightElement = function(element) {
		
	var transition = jQuery(element).css("transition");
	
	jQuery(element).css("transition", transition + ", transform 1s linear");
	
	// TODO: Need to avoid collisions with anything else that sets transform
	
	jQuery(element).css("transform", "scale(1.1)");
	
	for(var iteration = 0; iteration < 3; iteration++) {
		
		setTimeout(function() {
			jQuery(element).css("transform", "scale(1.1)");
		}, iteration * 2000);
		
		setTimeout(function() {
			jQuery(element).css("transform", "");
		}, (iteration * 2000) + 1000);
	}
}