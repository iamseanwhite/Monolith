// TODO: should this file be renamed to 'resources'?

Monolith.Resources = {
	"population" : { "Icon" : "fa-users"},
	"materials" : { "Icon" : "fa-cubes"},
	"research" : { "Icon" : "fa-flask"},
	"kills" : { "Icon" : "fa-ban"},
};

Monolith.Resources.MaxPopPerHabitat = 10;
Monolith.Resources.MaterialsPerPop = 0.2;
Monolith.Resources.BankInterest = 0.01;

Monolith.Player.Resources = {

	"population": {
		"Icon": "fa-users",
		"max": function() { 
			return (Monolith.Resources.GetStructureCount("Habitat") * Monolith.Resources.MaxPopPerHabitat) +
			(Monolith.Resources.GetStructureCount("Bunk Beds") * Monolith.Resources.MaxPopPerHabitat); }
	},
	"materials": {
		"Icon": "fa-cubes",
		"value": 100
	},
	"research" : { 
		"Icon" : "fa-flask"
	},
	"kills" : {
		"Icon" : "fa-ban"
	},
};

Monolith.Resources.Get = function(resourceName) {

	if(!Monolith.Player.Resources[resourceName].value) return 0;

	return Monolith.Player.Resources[resourceName].value;
}

Monolith.Resources.Set = function(resourceName, value) {

	if(Monolith.Player.Resources[resourceName].max && value > Monolith.Player.Resources[resourceName].max())
		Monolith.Player.Resources[resourceName].value = Monolith.Player.Resources[resourceName].max();
	else
		Monolith.Player.Resources[resourceName].value = Math.floor(value);

	Monolith.UI.SetUIVariable(resourceName);
}

Monolith.Resources.Add = function(resourceName, value) {

	if(value == 0) return;

	Monolith.Resources.Set(resourceName, Monolith.Resources.Get(resourceName) + value);
}

// TODO: Calculate methods can become part of the resource definition ... (as can recalculate interval ...)
// May have to use 'eval' ...
Monolith.CalculatePopulation = function() {

	Monolith.Resources.Add("population", 1);
}

Monolith.CalculateMaterials = function() {
	
	Monolith.Resources.Add("materials", Monolith.Resources.Get("population") * Monolith.Resources.MaterialsPerPop);

	// calculate bank interest AFTER adding material from population
	Monolith.Resources.Add("materials",
		(Monolith.Resources.GetStructureCount("Bank") * Monolith.Resources.Get("materials") * Monolith.Resources.BankInterest)
	);
}

var promptedYet = false;	// We can change "promptedYet" to a "lastPromptTime" variable with an initial value like null
Monolith.CalculateResearch = function() {
	
	Monolith.Resources.Add("research", Monolith.Resources.GetStructureCount("Lab"));
	
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
	
	// TODO: This is not at all how this should be calculated
	var turretKills = Monolith.Resources.GetStructureCount("Turret");
	Monolith.Resources.Add("kills", turretKills);
}

Monolith.PayResource = function(resource, amount) {
	
	// TODO: (juice) Little animation when this happens. Maybe like a falling thing with a - amount

	if(Monolith.Resources.Get(resource) < amount) return false;
	
	if(resource != "population") Monolith.Resources.Add(resource, amount * -1);
	
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

Monolith.Resources.GetStructureCount = function(structure) {

	if(typeof structure != "string") structure = structure.name;
	
	return Monolith.StructureCount[structure] || 0;
}

setInterval(Monolith.CalculatePopulation, 5000);

setInterval(Monolith.CalculateMaterials, 2500);

setInterval(Monolith.CalculateResearch, 10000);

// setInterval(Monolith.CalculateKills, 5000);