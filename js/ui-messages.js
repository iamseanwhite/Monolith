
Monolith.UI.Hint = function(message) {
	
	jQuery("#message-overlay div")
		.append('<span class="hint">' + message + '</span>');
		
	setTimeout(function() {
		jQuery("#message-overlay .hint")
			.css("opacity", ".7");
		}, 20);
		
	Monolith.UI.FadeMessageOut(4200);
}

Monolith.UI.Message = function(message) {
	
	jQuery("#message-overlay div")
		.append('<span class="ui-message">' + 
			'<span class="message">' + message + '</span> ' + 
			' <span class="close">x</span>' + 
			'</span>');

		var message = jQuery(".ui-message").last();
		
	setTimeout(function() {
		message.css("opacity", ".9");
	}, 20);

	// TODO: Fade out faster than it faded in ...
	message.children(".close").click(function(event) {
		
		var messageParent = this.parentNode;
		jQuery(messageParent).css("opacity", "0");

		setTimeout(function() {
			messageParent.remove();
		}, 2000);
	});
}

Monolith.UI.TitleMessage = function(message) {
	
	jQuery("#message-overlay div")
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

Monolith.UI.HighlightMenuItem = function(menuItem) { 
	
	// jQuery(menuItem).css("textShadow", "3px 3px 1px white;");
	jQuery(menuItem).toggleClass("highlightUIItem");
	
	setTimeout(function() {
		jQuery(menuItem).toggleClass("highlightUIItem");
	}, 1000);
	
	setTimeout(function() {
		jQuery(menuItem).toggleClass("highlightUIItem");
	}, 1900);
	
	setTimeout(function() {
		jQuery(menuItem).toggleClass("highlightUIItem");
	}, 2700);
	
	setTimeout(function() {
		jQuery(menuItem).toggleClass("highlightUIItem");
	}, 3500);
	
	setTimeout(function() {
		jQuery(menuItem).toggleClass("highlightUIItem");
	}, 4200);
}