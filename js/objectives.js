
Monolith.Objective = {};
Monolith.Objectives = [];

Monolith.Objective.Add = function(message, displayFunc, criteriaFunc, completeFunc) {
    
    Monolith.UI.Objectives.push({
        "displayFunc" : displayFunc,
        "criteriaFunc" : criteriaFunc,
        "completeFunc" : completeFunc
    });

    // TOOD: ID'ing this way is going to cause problems ... need a global objective ID, not an order ...
    var objectiveId =  Monolith.UI.Objectives.length - 1;

    // TODO: UI.Hint message on mouseover ... ?
    // once hint works ...
    jQuery("#ui-objectives").append('<div id="objective' + objectiveId + '" class="objective">' + displayFunc() + '</div>');
    
    jQuery("#ui-objectives").fadeIn(1000);
    
    jQuery("#ui-objectives .objective").fadeIn(1000);

    return objectiveId;
}

Monolith.Objective.AddStructureBasedObjective = function(structure, quantity, message, successFunc) {

    message = message.replace('<i {structure} />', '<i class="fa ' + structure["ui-class"] + '"');
    // TODO: assign the message to a variable that can be cleared when the objective is completed
    Monolith.UI.Message(message);
    
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

    message = message.replace('<i {resource} />', '<i class="fa ' + resource["ui-class"] + '"');
    Monolith.UI.Message(message);

    Monolith.Objective.Add(
        message,
        function() { 
            return Monolith.Resources.Get(resource.name) + ' / ' + quantity + 
            ' <i class=\"fa ' + structure["ui-class"] + '\"/>';
        },
        function() { return Monolith.Resources.Get(resource.name) >= quantity; },
        successFunc
    );    
}

function addStairsObjective() {
    
    Monolith.Objective.AddStructureBasedObjective(
        Monolith.AllBuildables.Stairs,
        1,
        'You need room to grow. Build <i {structure} /> to expand your Monolith.',
        function() { console.log("They built stairs. We need to add more objectives. "); }
    )
}

var addTurretObjective = function() {
    
    Monolith.Objective.AddStructureBasedObjective(
        Monolith.AllBuildables.Turret,
        1,
        'The monsters are coming. Build <i {structure} /> to defend your Monolith.',
        function() { console.log("They built a turret. We need to add more objectives. "); }
    )
}