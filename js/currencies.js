Monolith.Resources = {
	"population" : { "Icon" : "fa-users"},
	"materials" : { "Icon" : "fa-cubes"},
	"research" : { "Icon" : "fa-flask"},
};

Monolith.Player.Resources = {};
Monolith.Player.Resources.population = 0;
Monolith.Player.Resources.materials = 1000;
Monolith.Player.Resources.research = 0;

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
	
	Monolith.Player.Resources.research = Monolith.Player.Resources.research + Monolith.GetStructureCount("Lab");
	Monolith.UI.SetUIVariable("research", Monolith.Player.Resources.research);
	
	/*
	// TODO: And there's things that can be researched ... 
	// TODO: We want to remind them each time a new research unlocks, and then periodically if all researches are unlocked. Maybe glow brighter for more research?
	if(Monolith.Player.Resources.research >= 10 && !promptedYet) {
		
		promptedYet = true;
		Monolith.UI.HighlightMenuItem(jQuery("#ui-variables .Research"));
	}
	*/
}

Monolith.PayResource = function(resource, amount) {
	
	// TODO: Little animation when this happens. Maybe like a falling thing with a - amount
	
	if(Monolith.Player.Resources[resource] < amount) return false;
	
	if(resource != "population") Monolith.Player.Resources[resource] -= amount;
	
	Monolith.UI.SetUIVariable(resource, Monolith.Player.Resources[resource]);
	
	return true;
}

setInterval(Monolith.CalculatePopulation, 5000);

setInterval(Monolith.CalculateMaterials, 2500);

setInterval(Monolith.CalculateResearch, 10000);