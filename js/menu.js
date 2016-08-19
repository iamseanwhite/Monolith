var uiStyles = document.createElement("style");
document.head.appendChild(uiStyles);

function monolithTileClicked(floorTile) {
	
	clearTimeout(notifyBuildHint);
	
	jQuery("#monolith .col.active").removeClass("active");		// Deselect any currently "active" tiles
	
	jQuery(floorTile).addClass("active");
	
	if(isBuilding(floorTile)) openMenu("#ui-block-detail")
	else openMenu("#ui-build-menu");
}

function isBuilding(col) {
	// TODO: Change this to not use attribute
	return jQuery(col).attr("structure") != null;
}

function isUpgrade(upgradeName) {
	
	for(var index in Monolith.Upgrades) {
		
		if(upgradeName == index) return true;
	}
	
	return false;
}

function openMenu(menu) {
	
	closeMenus();
	
	disableUnbuildableBuildings();
	
	showOnlyApplicableUpgrades();
	
	var menuWidth = jQuery(menu).outerWidth();		
	jQuery(menu).css("transform", "translateX(-" + menuWidth + "px)");
}

function disableUnbuildableBuildings() {
	
	if(currentFloorHasStairs()) jQuery("#ui-build-menu .Stairs").addClass("disabled");
	else jQuery("#ui-build-menu .Stairs").removeClass("disabled");
	
	for(var structureName in Monolith.Structures) {
		
		var structure = Monolith.Structures[structureName];
		
		if(Monolith.Player.Resources.Materials < structure.materials) jQuery("#ui-build-menu ." + structure.name).addClass("disabled");
		else jQuery("#ui-build-menu ." + structure.name).removeClass("disabled");
	}
}

function showOnlyApplicableUpgrades() {
	
	if(!jQuery("#monolith .col.active").length) return;
	
	jQuery("#ui-block-detail div").hide();
	jQuery("#ui-block-detail .fa-trash-o").parent().show();	
		
	// TODO: Remove the structure attribute entirely, replace with call to Monolith.Floors ...
	var activeStructure = jQuery("#monolith .col.active").attr("structure");
	
	if(activeStructure == null) return;
	
	var upgrades = Monolith.Structures[activeStructure].upgrades;
	
	for(var index in upgrades) {
		
		jQuery("#ui-block-detail ." + upgrades[index].name.replaceAll(" ", ".")).parent().show();
	}
}

function closeMenus() {
	jQuery(".menu").css("transform", "");
}

function addItemToMenu(menu, menuItem) {
	
	// var itemDescription = menuItem.description.replaceAll("'", "&quot;");	 // haven't figured out how to make escape work ...
	
	var itemClass = menuItem["ui-class"] + ' ' + menuItem["name"];
	
	var itemClassName = itemClass.replaceAll(" ", ".");
	
	// TODO: Maybe there's a way to show cost types in a "line", so that the resource icon need only be shown once, and there's more size for the amounts to be shown
	
	var menuItemCost = '';
	
	if(menuItem.materials) menuItemCost += '<i class="fa ' + Monolith.Resources["Materials"].Icon + '">' + menuItem.materials + '</i>';
	
	if(menuItem.population) menuItemCost += '<i class="fa ' + Monolith.Resources["Population"].Icon + '">' + menuItem.population + '</i>';
	
	jQuery(menu).prepend('<div style="display: inline-block" onClick="buildMenuItemClick(\'' + itemClass + '\', \'' + menuItem["name"] + '\')"><i class="fa ' + itemClass + '"></i>' +
		'<br />' + menuItemCost + 
	'</div>');
	
	uiStyles.appendChild(document.createTextNode(menu + ' .' + itemClassName + ':hover ~ .description:before { content: \'' + menuItem.name + ': \'; }'));
	uiStyles.appendChild(document.createTextNode(menu + ' .' + itemClassName + ':hover ~ .description:after { content: \'' + menuItem.description + '\'; }'));
}

function buildMenuItemClick(itemClass, itemName) {
	
	if(isUpgrade(itemName)) doUpgrade(itemClass, itemName);
	else doBuild(itemName);
		
	jQuery("#monolith .col.active").removeClass("active");

	closeMenus();
}

function doBuild(itemName) {
	
	var structure = Monolith.Structures[itemName];
	
	var itemClass = structure["ui-class"];
	
	// if(itemClass.indexOf("Stairs") > -1 && currentFloorHasStairs()) return;
	if(structure.isStairs && currentFloorHasStairs()) return;
	
	if(!Monolith.PayResource("Materials", structure.materials)) return;
		
	var activeElement = jQuery("#monolith .col.active");
	
	jQuery(activeElement).children(".fa").addClass(itemClass).addClass(itemName);
	
	jQuery(activeElement).attr("structure", itemName);
	
	var parent = jQuery(activeElement).parent();
	
	var row = jQuery("#monolith .row").index(parent);
	
	var col = jQuery(parent).children().index(activeElement);
	
	setFloorTile(col, row, itemClass);
	
	structureAdded(structure);	
}

function doUpgrade(itemClass, itemName) {
	
	var upgrade = Monolith.Upgrades[itemName];
	
	if(itemClass.indexOf("Stairs") > -1 && currentFloorHasStairs()) return;
	
	if(!Monolith.PayResource("Materials", upgrade.materials)) return;
		
	var activeElement = jQuery("#monolith .col.active");
	
	// jQuery(activeElement).children(".fa").addClass(itemClass);
	
	jQuery(activeElement).prepend('<i class="fa fa-stack-1x ' + itemClass + '" aria-hidden="true"></i>');
	
	var parent = jQuery(activeElement).parent();
	
	var row = jQuery("#monolith .row").index(parent);
	
	var col = jQuery(parent).children().index(activeElement);
	
	upgradeFloorTile(col, row, itemClass);
}

function structureAdded(structure) {
	
	if(structure.name == "Habitat") clearTimeout(notifyShelterHint);
	
	if(structure.isStairs) addFloor();
	
	if(structure["ui-class"].indexOf("McFattys") > -1) {
		
		removeMenuItem("#ui-build-menu", "McFattys");
		
		Monolith.increaseMaxFloorSize(1, 0);
	}
}

function removeMenuItem(menu, itemClass) {
	
	jQuery(menu + " ." + itemClass).remove();
}

function createMenuItemForDelete() {
	
	jQuery("#ui-block-detail").prepend('<div><i class="fa fa-trash-o"></i></div>');
	jQuery("#ui-block-detail :first-child").click( function() { 
	
		jQuery("#monolith .col.active").removeAttr("structure");
	
		jQuery("#monolith .col.active").attr("class", "fa col");

		closeMenus();
	});
}

createMenuItemForDelete();

// TODO: If clicking empty space, close menus
// jQuery("body").click(function() { closeMenus(); });