
Monolith.UI = {};
Monolith.UI.Objectives = [];

// TODO: Add some juice to the way the numbers change

Monolith.UI.SetUIVariable = function(name, value, max) {

	if(value == null) {
		Monolith.UI.SetUIVariableFromName(name);
		return;
	} else {
		console.log(name);
	}
	
	if(!jQuery("#ui-variables div." + name).length) 
	{
		if(value == 0) return;
		
		jQuery("#ui-variables").append('<div class="' + name + '"></div>');
	}

	var uiText = '<i title="' + name + '" class="fa ' + Monolith.Resources[name].Icon + '"> ' + value;

	if(max) uiText += ' / ' + max;
	
	jQuery("#ui-variables div." + name).html(uiText + '</i>');
}

Monolith.UI.SetUIVariableFromName = function(name) {

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
}

Monolith.UI.AddObjective = function(displayFunc, criteriaFunc, completeFunc) {

	Monolith.UI.Objectives.push({
		"displayFunc" : displayFunc,
		"criteriaFunc" : criteriaFunc,
		"completeFunc" : completeFunc
	});

	var objectiveId =  Monolith.UI.Objectives.length - 1;

	jQuery("#ui-objectives").append('<div id="objective' + objectiveId + '" class="objective">' + displayFunc() + '</div>');
	
	jQuery("#ui-objectives").fadeIn(1000);
	
	jQuery("#ui-objectives .objective").fadeIn(1000);

	return objectiveId;
}

Monolith.UI.ObjectiveInterval = setInterval(function() {

	for(var i = 0; i < Monolith.UI.Objectives.length; i++) {
		
		var objective = Monolith.UI.Objectives[i];

		var objectiveText = objective.displayFunc();

		jQuery("#objective" + i).html(objectiveText);

		// TODO: if criteria func is met, call completeFunc
		if(objective.criteriaFunc()) { console.log("Criteria met for objective " + i + "!"); }
	}
}, 2500);

jQuery(function() {

	// Sorry, got lazy
	var minHeight = parseInt(jQuery(".description").css("line-height")) * 2;

	jQuery(".description").css("min-height", minHeight + "px");
});
