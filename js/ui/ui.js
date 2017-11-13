Monolith.UI = {};
Monolith.UI.Objectives = [];

jQuery("body").append('<script src="js/ui/ui-camera.js"><\/script>');
jQuery("body").append('<script src="js/ui/ui-messages.js"><\/script>');

// TODO: Add some juice to the way the numbers change

Monolith.UI.SetUIVariable = function(name) {

	var value = Monolith.Player.Resources[name].value;
	if(Monolith.Player.Resources[name].max)
		var max = Monolith.Player.Resources[name].max();
	
	if(!jQuery("#ui-variables div." + name).length) 
	{
		if(value == 0) return;
		
		jQuery("#ui-variables").append('<div class="' + name + '"></div>');
	}

	var uiText = '<i title="' + name + '" class="fa ' + Monolith.Resources[name].Icon + '"> ' + value;

	if(max && max != 0) uiText += ' / ' + max;
	
	jQuery("#ui-variables div." + name).html(uiText + '</i>');
	
	Monolith.UI.ObjectiveInterval();
	Monolith.UI.DisableUnbuildableStructures();
}

// TODO: rename
Monolith.UI.ObjectiveInterval = function() {

	for(var i = 0; i < Monolith.UI.Objectives.length; i++) {
		
		var objective = Monolith.UI.Objectives[i];

		var objectiveText = objective.displayFunc();

		jQuery("#objective" + i).html(objectiveText);

		if(objective.criteriaFunc()) { 
			
			Monolith.UI.Objectives.splice(i, 1);

			jQuery("#ui-objectives #objective" + i).remove();

			// TODO: dismiss any UI messages created by this objective
			// (can try attaching classes to those messages and identifying that way)

			objective.completeFunc();
		}
	}
}

jQuery(function() {

	// Sorry, got lazy
	var minHeight = parseInt(jQuery(".description").css("line-height")) * 2;

	jQuery(".description").css("min-height", minHeight + "px");
});
