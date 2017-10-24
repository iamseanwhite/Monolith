jQuery(window).trigger('resize');

// TODO: Do this for all variables that init with non-zero value?
Monolith.UI.SetUIVariable('materials');

Monolith.UI.TitleMessage('<h1>Monolith</h1>');

/*
Monolith.UI.Hint("Habitat", 
	'<i class="fa ' + Monolith.AllBuildables.Habitat["ui-class"] + 
	'"/> x <i class="fa fa-clock-o" /> = <i class="fa ' + Monolith.Resources["materials"].Icon + '" />'
, 15000);
*/
	
var notifyBuildHint = setTimeout(function() {
	Monolith.UI.HighlightElement(jQuery("#monolith .col")[4]);
	}, 5500);

/*
Monolith.UI.Hint("Lab", 
	'<i class="fa ' + Monolith.AllBuildables.Lab["ui-class"] + '"/> = <i class="fa fa-smile-o" />'
	, 27000);
*/

setTimeout(function() {

	var popToSupport = 50;
	
	Monolith.UI.Message('You will need a workforce. Build enough <i class="fa ' 
		+ Monolith.AllBuildables.Habitat["ui-class"] 
		+ '"/> to support ' + popToSupport + ' <i class="fa ' + Monolith.Resources["population"].Icon + '"/>');

	Monolith.UI.AddObjective(
		function() { return Monolith.Player.Resources.population.max() + ' / ' + popToSupport + ' <i class=\"fa ' + Monolith.Resources["population"].Icon + '\"/>'; },
		function() { return Monolith.Player.Resources.population.max() >= popToSupport; },
		addTurretObjective
	);
}, 5200);

function addStairsObjective() {

	
}

var addTurretObjective = function() {
	
	Monolith.UI.Message('The monsters are coming. Build a <i class="fa ' 
		+ Monolith.AllBuildables.Turret["ui-class"] + '"/> to defend your Monolith.');

	Monolith.UI.AddObjective(
		function() { 
			return Monolith.GetStructureCount("Turret") + ' / 1 <i class=\"fa ' +
			Monolith.AllBuildables.Turret["ui-class"] + '\"/>';
		},
		function() { return Monolith.GetStructureCount("Turret") >= 1; },
		function() { console.log("They built a turret. We need to add more objectives. "); }
	);
}
	
// TODO: Hint highlight for research menu ...
	
jQuery("#monolith").html(getFloorContent());

addFloor();

Monolith.CurrentFloor = Monolith.Floors[0];

drawFloor();