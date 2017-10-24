// TODO: All of these are actually to be removed ...

function addMenu(menuId) {
	
	jQuery("body").prepend('<div class="menu" id="' + menuId + '"><div class="description"></div></div>');
}

addMenu("tower-upgrades");

addMenu("lab-research");

jQuery("#ui-variables").click(function() { 
	
	openMenu("#lab-research");
});

function researchMenuItemClick(itemName) {
	
	// TODO: How to determine which menu to go to? (currently research only applies to buildings ...)
	
	var structure = Monolith.AllBuildables[itemName];
	
	addItemToMenu("#ui-build-menu", structure);
	
	removeFromResearchMenu(structure["ui-class"]);

	Monolith.UI.CloseMenus();
}

function removeFromResearchMenu(itemClass) {
	
	itemClass = itemClass.replaceAll(" ", ".");
	
	jQuery("#lab-research ." + itemClass).remove();
}

Monolith.UI.DisableUnresearchableResearch = function() {
	
	for(var structureName in Monolith.AllBuildables) {
		
		var structure = Monolith.AllBuildables[structureName];
		
		// TODO: Test if we can do .menu instead of specifying the menu
		if(Monolith.Resources.Get("research") < structure.research) jQuery("#lab-research ." + structure.name).addClass("disabled");
		else jQuery("#lab-research ." + structure.name).removeClass("disabled");
	}	
}

Monolith.UI.DisableUnupgradeableUpgades = function() {
	
	for(var towerUpgradeName in Monolith.TowerUpgrades) {
		
		var towerUpgrade = Monolith.TowerUpgrades[towerUpgradeName];
		
		if(Monolith.Resources.Get("population") < towerUpgrade.population) jQuery("#tower-upgrades ." + towerUpgrade.name).addClass("disabled");
		else jQuery("#tower-upgrades ." + towerUpgrade.name).removeClass("disabled");
	}	
}