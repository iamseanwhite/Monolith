Monolith.UI.SetUIVariable("Materials", Monolith.Player.Resources.Materials);

Monolith.UI.TitleMessage('<h1>Monolith</h1>');

var notifyShelterHint = setTimeout(function() {
	Monolith.UI.Hint('<i class="fa ' + Monolith.Structures.Habitat["ui-class"] + '"/> x <i class="fa fa-clock-o" /> = <i class="fa ' + Monolith.Resources["Materials"].Icon + '" />');
	}, 10000);
	
var notifyBuildHint = setTimeout(function() {
	Monolith.UI.HighlightElement(jQuery("#monolith .col")[4]);
	}, 5000);
	
jQuery("#monolith").html(getFloorContent());

addFloor();

Monolith.CurrentFloor = Monolith.Floors[0];

drawFloor();