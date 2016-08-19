Monolith.Resources = {
	"Population" : { "Icon" : "fa-users"},
	"Materials" : { "Icon" : "fa-cubes"},
	"Research" : { "Icon" : "fa-flask"},
};

Monolith.Player.Resources = {};
Monolith.Player.Resources.Population = 0;
Monolith.Player.Resources.Materials = 1000;
Monolith.Player.Resources.Research = 0;

// TODO: If nothing else is built, can only build habitat

var popPerHabitat = 10;

Monolith.Player.Resources.CalculatePopulation = function() {
	
	var maxPop = (jQuery("#monolith .col .Habitat").size() * popPerHabitat) + (jQuery("#monolith .col .Bunk.Beds").size() * popPerHabitat);
	if(Monolith.Player.Resources.Population < maxPop) Monolith.Player.Resources.Population = Monolith.Player.Resources.Population + 1;
	if (Monolith.Player.Resources.Population > maxPop) Monolith.Player.Resources.Population = maxPop;
	
	Monolith.UI.SetUIVariable("Population", Monolith.Player.Resources.Population);
}

Monolith.Player.Resources.CalculateMaterials = function() {
	
	Monolith.Player.Resources.Materials = Math.floor(Monolith.Player.Resources.Materials + (Monolith.Player.Resources.Population / 5));
	Monolith.UI.SetUIVariable("Materials", Monolith.Player.Resources.Materials);
}

Monolith.Player.Resources.CalculateResearch = function() {
	
	// TODO: Derive this from Monolith.Floors
	Monolith.Player.Resources.Research = Monolith.Player.Resources.Research + jQuery("#monolith .col .Lab").size();
	Monolith.UI.SetUIVariable("Research", Monolith.Player.Resources.Research);
}

Monolith.PayResource = function(resource, amount) {
	
	if(Monolith.Player.Resources[resource] < amount) return false;
	
	Monolith.Player.Resources[resource] -= amount;
	
	Monolith.UI.SetUIVariable(resource, Monolith.Player.Resources[resource]);
	
	return true;
}

setInterval(Monolith.Player.Resources.CalculatePopulation, 5000);

setInterval(Monolith.Player.Resources.CalculateMaterials, 2500);

setInterval(Monolith.Player.Resources.CalculateResearch, 5000);