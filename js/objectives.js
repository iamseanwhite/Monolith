Monolith.Objective = {};
Monolith.Objectives = {};
Monolith.ObjectiveList = [];

Monolith.Objective.Add = function(objectiveMessage, displayFunc, criteriaFunc, completeFunc) {
    
    Monolith.UI.Objectives.push({
        "displayFunc" : displayFunc,
        "criteriaFunc" : criteriaFunc,
        "completeFunc" : function() {
            // TODO: maybe this should be more of a 'game object' that has a 'close' function, rather than straight dom ...
            objectiveMessage.children(".close").click();
            successFunc();
        }
    });

    // TOOD: ID'ing this way is going to cause problems ... need a global objective ID, not an order ...
    var objectiveId =  Monolith.UI.Objectives.length - 1;

    // TODO: UI.Hint message on mouseover ... ?
    // once hint works ...
    jQuery("#ui-objectives").append('<div id="objective' + objectiveId + '" class="objective">' + displayFunc() + '</div>');
    
    jQuery("#ui-objectives").fadeIn(1000);
    
    jQuery("#ui-objectives .objective").fadeIn(1000);

    var lastObjective = jQuery("#ui-objectives .objective").last();

    jQuery(lastObjective).hover(
        function() {
            Monolith.UI.Hint('objective' + objectiveId,
            objectiveMessage.html());
        },
        function() {
            Monolith.UI.ClearHint('objective' + objectiveId);
        }
    );

    return objectiveId;
}

Monolith.Objective.AddStructureBasedObjective = function(structure, quantity, message, successFunc) {

    message = message.replace('<i {structure} />', '<i class="fa ' + structure["ui-class"] + '" />');
    var objectiveMessage = Monolith.UI.Message(message);
    
    Monolith.Objective.Add(
        message,
        function() { 
            return Monolith.Resources.GetStructureCount(structure) + ' / ' + quantity + 
            ' <i class=\"fa ' + structure["ui-class"] + '\"/>';
        },
        function() { return Monolith.Resources.GetStructureCount(structure) >= quantity; },
        successFunc
    );
}

Monolith.Objective.AddResourceBasedObjective = function(resource, quantity, message, successFunc) {

    message = message.replace('<i {resource} />', '<i class="fa ' + resource["ui-class"] + '" />');
    var objectiveMessage = Monolith.UI.Message(message);

    Monolith.Objective.Add(
        objectiveMessage,
        function() { 
            return Monolith.Resources.Get(resource.name) + ' / ' + quantity + 
            ' <i class=\"fa ' + structure["ui-class"] + '\"/>';
        },
        function() { return Monolith.Resources.Get(resource.name) >= quantity; },
        successFunc
    );    
}

// TODO: solidify namespacing scheme
Monolith.Objectives.addWorkforceObjective = function() {
    var popToSupport = 40;
	
	var message = 'You will need a workforce. Build enough <i class="fa ' 
		+ Monolith.AllBuildables.Habitat["ui-class"] 
		+ '"/> to support ' + popToSupport + ' <i class="fa ' + Monolith.Resources["population"].Icon + '"/>';
	var objectiveMessage = Monolith.UI.Message(message);

	// still have to call this here because it's using max, not actual value
	Monolith.Objective.Add(
		objectiveMessage,
		function() { return Monolith.Player.Resources.population.max() + ' / ' + popToSupport + ' <i class=\"fa ' + Monolith.Resources["population"].Icon + '\"/>'; },
		function() { return Monolith.Player.Resources.population.max() >= popToSupport; },
		Monolith.Objectives.addStairsObjective
	);
}

Monolith.Objectives.addStairsObjective = function() {
    
    Monolith.Objective.AddStructureBasedObjective(
        Monolith.AllBuildables.Stairs,
        1,
        'You need room to grow. Build <i {structure} /> to expand your Monolith.',
        function() { /* no success function for now ... */ }
    )
}

Monolith.Objective.AddTurretObjective = function() {
    
    Monolith.Objective.AddStructureBasedObjective(
        Monolith.AllBuildables.Turret,
        1,
        'The monsters are coming. Build <i {structure} /> to defend your Monolith.',
        function() { console.log("They built a turret. We need to add more objectives. "); }
    )
}
