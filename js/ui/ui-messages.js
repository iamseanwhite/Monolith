
Monolith.UI.Hints = {};

Monolith.UI.Hint = function(name, message, delay) {

	if(window.getQueryParam("noHints") == "true") return;
	
	Monolith.UI.Hints[name] = setTimeout(function() {

		jQuery("#message-overlay div")
			.show()
			.append('<span class="hint">' + message + '</span>');
			
		setTimeout(function() {
			jQuery("#message-overlay .hint")
				.css("opacity", ".7");
			}, 20);
			
		Monolith.UI.FadeMessageOut(4200, ".hint");
	}, delay);
}

Monolith.UI.ClearHint = function(name) {

	if(name in Monolith.UI.Hints) {

		clearTimeout(Monolith.UI.Hints[name]);

		delete Monolith.UI.Hints[name];
	}
}

// TODO: multiple Messages are coming side-by-side rather than stacked veritcally
// TODO: looks like maybe if there's two messages displayed, only one can be dismissed
Monolith.UI.Message = function(message) {
	
	if(window.getQueryParam("noHints") == "true") return;
	
	jQuery("#message-overlay div")
		.show()
		.append('<span class="ui-message">' + 
			'<span class="message">' + message + '</span> ' + 
			' <span class="close">x</span>' + 
			'</span>');

	var messageDom = jQuery(".ui-message").last();
		
	setTimeout(function() {
		messageDom.css("opacity", ".9");
	}, 20);

	// TODO: Fade out faster than it faded in ...
	messageDom.children(".close").click(function(event) {
		
		var messageParent = this.parentNode;
		jQuery(messageParent).css("opacity", "0");	// maybe we could do jQuery(...).fadeOut().remove()...

		setTimeout(function() {
			messageParent.remove();

			if(jQuery("#message-overlay div").children().size() == 0) jQuery("#message-overlay div").hide();
		}, 2000);
	});
}

Monolith.UI.TitleMessage = function(message) {
	
	if(window.getQueryParam("noHints") == "true") return;
	
	jQuery("#message-overlay div")
		.show()
		.append('<h1 class="title">' + message + '</h1>');
		
	setTimeout(function() {
		jQuery("#message-overlay h1").css("opacity", ".9");
		}, 1);
		
	Monolith.UI.FadeMessageOut(3000, "h1");
}

Monolith.UI.FadeMessageOut = function(time, messageClass) {
		
	setTimeout(function() {
		jQuery("#message-overlay " + messageClass).css("opacity", "0");
		}, time);
		
	setTimeout(function() {
		jQuery("#message-overlay " + messageClass).remove();

		if(jQuery("#message-overlay div").children().size() == 0) jQuery("#message-overlay div").hide();
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

// TODO: ideally get to a point where the message overlay doesn't wind up blocking other ui elements
// maybe those ui elements have higher z-index priority?
jQuery("#message-overlay div").hide();
