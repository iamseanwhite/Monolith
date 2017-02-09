Monolith.AllBuildables = {};
Monolith.GamePackages = ["upgrades", "structures", "upgrades-td", "structures-td"];

getStructures = function(packageName) {
	
	Monolith.GamePackages.shift();

	// TODO: A code branch should be added to handle get failure
	jQuery.get("data/" + packageName + ".json").done(function(data) {
		
		if (typeof data === 'string' || data instanceof String) {		
			var structures = JSON.parse(data);
		} else {
			var structures = data;
		}
		
		for (var index in structures) {
			
			var structure = structures[index];
				
			// Monolith.Structures[structure.name] = structure;
			Monolith.AllBuildables[structure.name] = structure;
			
			if(!structure.unlockedOnFloor) addItemToMenu(structure);
			
			if(!structure.upgrades) continue;
			
			for(var i = 0; i < structure.upgrades.length; i++) {
				
				structure.upgrades[i] = Monolith.AllBuildables[structure.upgrades[i].name];
			}
		}
		
		if(Monolith.GamePackages.length > 0) getStructures(Monolith.GamePackages[0]);
		else delete Monolith.GamePackages;
		// TODO: Inside above 'else' block, trigger 'data loaded' function
	});
}

getStructures(Monolith.GamePackages[0]);
