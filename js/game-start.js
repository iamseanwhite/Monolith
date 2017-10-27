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

	var popToSupport = 40;
	
	Monolith.UI.Message('You will need a workforce. Build enough <i class="fa ' 
		+ Monolith.AllBuildables.Habitat["ui-class"] 
		+ '"/> to support ' + popToSupport + ' <i class="fa ' + Monolith.Resources["population"].Icon + '"/>');

	// still have to call this here because it's using max, not actual
	Monolith.Objective.Add(
		function() { return Monolith.Player.Resources.population.max() + ' / ' + popToSupport + ' <i class=\"fa ' + Monolith.Resources["population"].Icon + '\"/>'; },
		function() { return Monolith.Player.Resources.population.max() >= popToSupport; },
		addStairsObjective
	);
}, 5200);
	
// TODO: Hint highlight for research menu ...
	
jQuery("#monolith").html(getFloorContent());

addFloor();

Monolith.CurrentFloor = Monolith.Floors[0];

drawFloor();