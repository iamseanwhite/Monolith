Monolith.UI = {};

Monolith.UI.SetUIVariable = function(name, value) {
	
	// TODO: Can we take this out of the div maybe?
	
	if(!jQuery("#ui-variables div." + name).length) 
	{
		if(value == 0) return;
		
		jQuery("#ui-variables").append('<div class="' + name + '"></div>');
	}
	
	jQuery("#ui-variables div." + name).html('<i title="' + name + '" class="fa ' + Monolith.Resources[name].Icon + '" aria-hidden="true"> ' + value + '</i>');
}

var mouseDown = Number.MAX_SAFE_INTEGER;
jQuery("body").on("mousedown", function(e) { if(e.button == 0) mouseDown = new Date().getTime(); });
jQuery("body").on("mouseup", function(e) { if(e.button == 0) mouseDown = Number.MAX_SAFE_INTEGER; });

// TODO: Currently based on mouse X. Has a bad feel. Would prefer to translate mouse delta to transform delta
jQuery("body").on("mousemove", function(e) {
	
	if(new Date().getTime() - 200 < mouseDown) return false;
	
	// TODO: Optimize variable determination
	var h = e.pageY/$("body").height();
	var w = e.pageX/$("body").width();
	
	var rx = 90 * (1-h);
	var rz = -90 + 180 * (1-w);
	var tz = -50;
	
	$("#monolith").css("transform", "rotateX("+rx+"deg) rotateZ("+rz+"deg) translateZ("+tz+"px)");
	
	jQuery("#btn-reset-monolith-rotation").show();
});

jQuery("#btn-reset-monolith-rotation").click(function() {
	$("#monolith").css("transform", "rotateX(45deg) rotateZ(45deg)");
	
	jQuery("#btn-reset-monolith-rotation").hide();
});

// TODO: Onscroll = change floors