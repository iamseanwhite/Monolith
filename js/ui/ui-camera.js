
// Okay, let's try this a different way
// Mouse down = mark pos
// mouse move = delta from marked pos
// now rotate based on delta


// TODO: Do this by percentage instead
var pixelsPerZRotation = 10;

var lastMouseX = null;
var lastZRotation = null;
var mouseDown = Number.MAX_SAFE_INTEGER;
jQuery("body").on("mousedown", function(e) { if(e.button == 0) mouseDown = new Date().getTime(); });
jQuery("body").on("mouseup", function(e) { if(e.button == 0) mouseDown = Number.MAX_SAFE_INTEGER; });

// TODO: Currently based on mouse X. Has a bad feel. Would prefer to translate mouse delta to transform delta
jQuery("body").on("mousemove", function(e) {
	
	if(window.getQueryParam("noCamera") == "true") return;
	
	if(lastMouseX == null) lastMouseX = e.pageX;
	var deltaX = e.pageX - lastMouseX;
	
	if(new Date().getTime() - 200 < mouseDown) return false;
	
	// TODO: Optimize variable determination (on reize)
	var h = e.pageY/$("body").height();
	var w = e.pageX/$("body").width();
	
	var rx = 90 * (1-h);
	var zRotation = -90 + 180 * (1-w);
	
	if(lastZRotation == null) lastZRotation = zRotation;
	else zRotation = lastZRotation + (deltaX / pixelsPerZRotation);

	// TODO: Y AXIS
	
	$("#monolith").css("transform", "rotateX("+rx+"deg) rotateZ(" + zRotation + "deg) translateZ(0px)");
	
	jQuery("#btn-reset-monolith-rotation").show();
});

jQuery("body").bind('mousewheel', function(e) {
	
	if(e.ctrlKey) return;
	
    if(e.originalEvent.wheelDelta / 120 > 0) {
        setCurrentFloor(Monolith.CurrentFloorIndex + 1);
    } else {
        setCurrentFloor(Monolith.CurrentFloorIndex - 1);
    }
});

jQuery("#btn-reset-monolith-rotation").click(function() {

	$("#monolith").css("transform", "rotateX(45deg) rotateZ(45deg)");
	
	jQuery("#btn-reset-monolith-rotation").hide();
});
