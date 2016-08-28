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
	
	var maxPop = (Monolith.GetStructureCount("Habitat") * popPerHabitat) + (Monolith.GetStructureCount("Bunk Beds") * popPerHabitat);
	if(Monolith.Player.Resources.Population < maxPop) Monolith.Player.Resources.Population = Monolith.Player.Resources.Population + 1;
	if (Monolith.Player.Resources.Population > maxPop) Monolith.Player.Resources.Population = maxPop;
	
	Monolith.UI.SetUIVariable("Population", Monolith.Player.Resources.Population);
}

Monolith.Player.Resources.CalculateMaterials = function() {
	
	Monolith.Player.Resources.Materials = Math.floor(Monolith.Player.Resources.Materials + (Monolith.Player.Resources.Population / 5));
	Monolith.UI.SetUIVariable("Materials", Monolith.Player.Resources.Materials);
}

var promptedYet = false;
Monolith.Player.Resources.CalculateResearch = function() {
	
	Monolith.Player.Resources.Research = Monolith.Player.Resources.Research + Monolith.GetStructureCount("Lab");
	Monolith.UI.SetUIVariable("Research", Monolith.Player.Resources.Research);
	
	// TODO: And there's things that can be researched ... 
	// TODO: We want to remind them each time a new research unlocks, and then periodically if all researches are unlocked. Maybe glow brighter for more research?
	if(Monolith.Player.Resources.Research >= 10 && !promptedYet) {
		
		promptedYet = true;
		Monolith.UI.HighlightMenuItem(jQuery("#ui-variables .Research"));
	}
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