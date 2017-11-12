
function monolithTileClicked(floorTile) {
	
	if(typeof notifyBuildHint !== 'undefined') clearTimeout(notifyBuildHint);
	
	jQuery("#monolith .col.active").removeClass("active");
	
	jQuery(floorTile).addClass("active");
	
	if(Monolith.UI.IsBuilding(floorTile)) openMenu("#ui-block-detail");
	else openMenu("#ui-build-menu");
}

Monolith.UI.IsBuilding = function(element) {
	
	return Monolith.GetFloorEntryForElement(element) != null;
}

function openMenu(menu) {
	
	Monolith.UI.CloseMenus();
	
	Monolith.UI.DisableUnbuildableStructures(menu);
	
	showOnlyApplicableUpgrades();
	
	// Monolith.UI.DisableUnresearchableResearch();
	
	// Monolith.UI.DisableUnupgradeableUpgades();
	
	jQuery(menu).addClass("bottom")
		.css("bottom", "-" + jQuery(menu).outerHeight() + "px")
		.css("transform", "translateY(-" + jQuery(menu).outerHeight() + "px)");
	
	// jQuery(menu).css("transform", "translateX(-" + jQuery(menu).outerWidth() + "px)");
	
	/*
	var newTop = jQuery(".col.active").offset().top - jQuery(menu)[0].offsetHeight; // + (jQuery(".col.active")[0].offsetHeight / 3);
	var newLeft = jQuery(".col.active").offset().left + (jQuery(".col.active")[0].offsetWidth * .75) - (jQuery(menu)[0].offsetWidth / 2);
	jQuery(menu).css({
		top: newTop,
		left: newLeft
	}); //.css("max-height", ".5em");
	
	// Monolith.Juice.MenuOpen(menu);
	
	jQuery(menu).css("visibility", "visible");
	
	// jQuery(menu).css("visibility", "visible");
	
	/*
	setTimeout(function() {
		jQuery(menu).css("max-height", "100%");
	}, 1);
	*/
}

Monolith.UI.DisableUnbuildableStructures = function(menu) {
	
	if(currentFloorHasStairs()) jQuery(".menu i.Stairs ~").parent().hide(); // jQuery("#ui-build-menu .Stairs").addClass("disabled");
	else jQuery(".menu i.Stairs").parent().show();
	
	for(var buildableName in Monolith.AllBuildables) {
		
		var structure = Monolith.AllBuildables[buildableName];
		var structureClassName = structure.name.replace(" ", ".");
		
		jQuery(".menu ." + structureClassName).removeClass("disabled");
		
		for(var resource in Monolith.Player.Resources) {
				
			if(structure[resource] && Monolith.Resources.Get(resource) < structure[resource]) 
				jQuery(".menu ." + structureClassName).addClass("disabled");
		}
		
		/*
		if(!Monolith.IsResearched(structure)) {
			
			if(Monolith.Resources.Get("research") < structure.research) jQuery(".menu ." + structureClassName).addClass("disabled");
			else jQuery(".menu ." + structureClassName).removeClass("disabled");			
		} else {
			
			if(Monolith.Resources.Get("materials") < structure.materials) jQuery(".menu ." + structureClassName).addClass("disabled");
			else jQuery(".menu ." + structureClassName).removeClass("disabled");
		}
		*/
	}
}

function showOnlyApplicableUpgrades() {
	
	// if(!jQuery("#monolith .col.active").length) return;
	
	var activeStructure = Monolith.UI.GetActiveStructure();
	
	if(activeStructure == null) return;
	
	jQuery("#ui-block-detail div").hide();
	jQuery("#ui-block-detail .fa-trash-o").parent().show();	
	
	for(var index in activeStructure.upgrades) {
		
		var className = activeStructure.upgrades[index].name.replaceAll(" ", ".");
		
		if(jQuery("#monolith .col.active ." + className).length > 0) return;
		
		jQuery("#ui-block-detail ." + className).parent().show();
	}
}

Monolith.UI.GetActiveStructure = function() {
		
	var floorEntry = Monolith.GetFloorEntryForElement(jQuery("#monolith .col.active"));
	
	if(floorEntry == null) return null;
	
	return floorEntry.structure;
}

Monolith.UI.CloseMenus = function() {
	jQuery(".menu").css("transform", "");
}

Monolith.UI.BuildMenuItemClick = function(itemName) {
	
	var buildItem = Monolith.AllBuildables[itemName];
	
	if(!Monolith.IsResearched(buildItem)) {
		
		Monolith.DoResearch(buildItem);
		
		return;
	}
	
	// TODO: 
	// else if(isTowerUpgrade(itemName)) Monolith.Menu.DoTowerUpgrade(itemName);
	
	doBuild(buildItem);
		
	jQuery("#monolith .col.active").removeClass("active");

	Monolith.UI.CloseMenus();
}

Monolith.DoResearch = function(buildItem) {
			
	// console.log("Have not researched " + buildItem.name);
	
	if(!Monolith.PayResource("research", buildItem.research)) return; // TODO: Some kind of can't afford sound
	
	Monolith.ResearchedItems.push(buildItem);
	
	// TODO: loop through materials (did I mean resources ... ?)
	var newHtml = "";
	if(buildItem.materials) newHtml += '<i class="fa ' + Monolith.Resources["materials"].Icon + '">' + buildItem.materials + '</i>';	
	if(buildItem.population) newHtml += '<i class="fa ' + Monolith.Resources["population"].Icon + '">' + buildItem.population + '</i>';
	
	var parent = jQuery(".menu div." + itemName);
	
	Monolith.Juice.BuildMenuItemUpdate(parent);
		
	setTimeout(function() {
		jQuery(parent).children("."  + Monolith.Resources["Research"].Icon).remove();
		parent.html(parent.html() + newHtml);
	}, 1000);
}

// TODO: maybe this should go into a structures.js and be Monolith.Structures.DoBuild ...
function doBuild(structure) {

	console.log("hay")
	
	if(structure.isStairs && currentFloorHasStairs()) return;
	
	if(structure.materials) if(!Monolith.PayResource("materials", structure.materials)) return;
	
	if(structure.population) if(!Monolith.PayResource("population", structure.population)) return;

	Monolith.RecalculateCost(structure);
		
	var activeElement = jQuery("#monolith .col.active");
	
	jQuery(activeElement).append('<i class="fa fa-stack-1x ' + structure["ui-class"] + ' ' +  structure.name + '"></i>');
	
	setTimeout(function() {
		jQuery(activeElement).children("i:not([class*='buildStructure'])").addClass("buildStructure");
	}, 1);
	
	var floorIndex = Monolith.GetXYForCol(activeElement);
	
	if(structure.structureType == "upgrade") upgradeFloorTile(floorIndex, structure);
	
	else setFloorTile(floorIndex, structure);
	
	structureAdded(structure);
}

Monolith.Menu.DoTowerUpgrade = function(itemName) {
	
	var towerUpgrade = Monolith.TowerUpgrades[itemName];
	
	if(towerUpgrade.name == "McFattys") {
		
		removeMenuItem("#tower-upgrades", "McFattys");
		
		Monolith.IncreaseMaxFloorSize(1, 0);
	}
	
	jQuery("#ui-map").addClass(towerUpgrade["ui-class"]);
}

function structureAdded(structure) {
	
	if(structure.structureType == "tower-upgrade") removeMenuItem(structure.name);
	
	Monolith.UI.ClearHint("Habitat");
	
	Monolith.UI.ClearHint("Lab");
	
	if(structure.name == "McFattys") Monolith.IncreaseMaxFloorSize(1, 0);

	// Give the player 1 free pop with each bed ...
	// Without this, we'll need to make pop display on first bed bought ...
	if(structure.name == "Habitat" || structure.name == "Bunk Beds") Monolith.CalculatePopulation();
	
	if(structure.isStairs) { 
	
		structure.materials = structure.materials * 2;
		
		var structureClassName = structure.name.replace(" ", ".");
		jQuery(".menu ." + structureClassName).parent().children("." + Monolith.Resources["materials"].Icon).html(structure.materials);
		
		addFloor();
	}
}

function removeMenuItem(itemClass) {
	
	jQuery(".menu ." + itemClass).parent().remove();
}