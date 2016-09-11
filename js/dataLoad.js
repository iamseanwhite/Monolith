Monolith.Structures = {};
Monolith.Upgrades = {};
Monolith.TowerUpgrades = {};
Monolith.AllBuildables = {};

for (var index in upgrades) {
	
	var upgrade = upgrades[index];
	
	if(!upgrade.unlockedOnFloor) addItemToMenu(upgrade);
	
	Monolith.Upgrades[upgrade.name] = upgrade;
}

for (var index in structures) {
	
	var structure = structures[index];
		
	Monolith.Structures[structure.name] = structure;
	
	// if(structure.research) addItemToMenu("#lab-research", structure);
	
	// else addItemToMenu("#ui-build-menu", structure);
	
	if(!structure.unlockedOnFloor) addItemToMenu(structure);
	
	if(!structure.upgrades) continue;
	
	for(var i = 0; i < structure.upgrades.length; i++) {
		
		structure.upgrades[i] = Monolith.Upgrades[structure.upgrades[i].name];
	}	
}

for (var index in towerUpgrades) {
	
	var towerUpgrade = towerUpgrades[index];
		
	Monolith.TowerUpgrades[towerUpgrade.name] = towerUpgrade;
	
	// addItemToMenu("#tower-upgrades", towerUpgrade);
}

Monolith.AllBuildables = jQuery.extend(jQuery.extend(Monolith.Structures, Monolith.Upgrades), Monolith.TowerUpgrades);