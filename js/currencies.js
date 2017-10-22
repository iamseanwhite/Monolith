Monolith.Resources = {
	"population" : { "Icon" : "fa-users"},
	"materials" : { "Icon" : "fa-cubes"},
	"research" : { "Icon" : "fa-flask"},
	"kills" : { "Icon" : "fa-ban"},
};

Monolith.Player.Resources = {};
Monolith.Player.Resources.population = 0;
Monolith.Player.Resources.materials = 100;

Monolith.PopPerHabitat = 10;
Monolith.BankInterest = 0.01;

Monolith.CalculatePopulation = function() {
	
	var maxPop = (Monolith.GetStructureCount("Habitat") * Monolith.PopPerHabitat) + (Monolith.GetStructureCount("Bunk Beds") * Monolith.PopPerHabitat);
	if(Monolith.Player.Resources.population < maxPop) Monolith.Player.Resources.population = Monolith.Player.Resources.population + 1;
	if (Monolith.Player.Resources.population > maxPop) Monolith.Player.Resources.population = maxPop;
	
	Monolith.UI.SetUIVariable("population", Monolith.Player.Resources.population);
}

Monolith.CalculateMaterials = function() {
	
	Monolith.Player.Resources.materials = Math.floor(Monolith.Player.Resources.materials + (Monolith.Player.Resources.population / 5));
	
	Monolith.Player.Resources.materials += Monolith.GetStructureCount("Bank") * Monolith.Player.Resources.materials * Monolith.BankInterest;
	
	Monolith.UI.SetUIVariable("materials", Monolith.Player.Resources.materials);
}

var promptedYet = false;
Monolith.CalculateResearch = function() {
	
	incrementResource("research", Monolith.GetStructureCount("Lab"));
	
	/*
	// TODO: And there's things that can be researched ... 
	// TODO: We want to remind them each time a new research unlocks, and then periodically if all researches are unlocked. Maybe glow brighter for more research?
	if(Monolith.Player.Resources.research >= 10 && !promptedYet) {
		
		promptedYet = true;
		Monolith.UI.HighlightMenuItem(jQuery("#ui-variables .Research"));
	}
	*/
}

Monolith.CalculateKills = function() {
	
	var turretKills = Monolith.GetStructureCount("Turret");
	incrementResource("kills", turretKills);
}

Monolith.PayResource = function(resource, amount) {
	
	// TODO: Little animation when this happens. Maybe like a falling thing with a - amount
	
	if(Monolith.Player.Resources[resource] < amount) return false;
	
	if(resource != "population") Monolith.Player.Resources[resource] -= amount;
	
	Monolith.UI.SetUIVariable(resource, Monolith.Player.Resources[resource]);
	
	return true;
}

Monolith.RecalculateCost = function(structure) {

	if(structure.structureType == "upgrade") {

		structure.materials = Math.floor(structure.materials * 1.15);

		return;
	}

	structure.materials = Math.floor(structure.materials * 1.3);

	for(var upgrade in structure.upgrades) {

		structure.upgrades[upgrade].materials = Math.floor(structure.upgrades[upgrade].materials * 1.1);
		Monolith.RepaintMenuItem(structure.upgrades[upgrade]);
	}

	Monolith.RepaintMenuItem(structure);
}

incrementResource = function(resource, amount) {
	
	if(!Monolith.Player.Resources[resource]) Monolith.Player.Resources[resource] = 0;
	Monolith.Player.Resources[resource] = Monolith.Player.Resources[resource] + amount;
	Monolith.UI.SetUIVariable(resource, Monolith.Player.Resources[resource]);
}

setInterval(Monolith.CalculatePopulation, 5000);

setInterval(Monolith.CalculateMaterials, 2500);

setInterval(Monolith.CalculateResearch, 10000);

// setInterval(Monolith.CalculateKills, 5000);