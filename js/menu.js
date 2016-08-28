Monolith.Menu = {};

var uiStyles = document.createElement("style");
document.head.appendChild(uiStyles);

function monolithTileClicked(floorTile) {
	
	clearTimeout(notifyBuildHint);
	
	jQuery("#monolith .col.active").removeClass("active");		// Deselect any currently "active" tiles
	
	jQuery(floorTile).addClass("active");
	
	if(isBuilding(floorTile)) openMenu("#ui-block-detail")
	else openMenu("#ui-build-menu");
}

function isBuilding(element) {
	
	return Monolith.GetFloorEntryForElement(element) != null;
}

function openMenu(menu) {
	
	Monolith.UI.CloseMenus();
	
	Monolith.UI.DisableUnbuildableStructures();
	
	showOnlyApplicableUpgrades();
	
	Monolith.UI.DisableUnresearchableResearch();
	
	Monolith.UI.DisableUnupgradeableUpgades();
	
	var menuWidth = jQuery(menu).outerWidth();		
	jQuery(menu).css("transform", "translateX(-" + menuWidth + "px)");
}

Monolith.UI.DisableUnbuildableStructures = function() {
	
	if(currentFloorHasStairs()) jQuery("#ui-build-menu .Stairs").addClass("disabled");
	else jQuery("#ui-build-menu .Stairs").removeClass("disabled");
	
	for(var structureName in Monolith.Structures) {
		
		var structure = Monolith.Structures[structureName];
		
		// TODO: Test if we can do .menu instead of specifying the menu
		if(Monolith.Player.Resources.Materials < structure.materials) jQuery("#ui-build-menu ." + structure.name).addClass("disabled");
		else jQuery("#ui-build-menu ." + structure.name).removeClass("disabled");
	}
}

function showOnlyApplicableUpgrades() {
	
	if(!jQuery("#monolith .col.active").length) return;
	
	jQuery("#ui-block-detail div").hide();
	jQuery("#ui-block-detail .fa-trash-o").parent().show();	
		
	// TODO: Remove the structure attribute entirely, replace with call to Monolith.Floors ...
	// var activeStructure = jQuery("#monolith .col.active").attr("structure");
	var floorEntry = Monolith.GetFloorEntryForElement(jQuery("#monolith .col.active"));
	
	if(floorEntry == null) return;
	
	var activeStructure = floorEntry.structure;
	
	if(activeStructure == null) return;
	
	for(var index in activeStructure.upgrades) {
		
		jQuery("#ui-block-detail ." + activeStructure.upgrades[index].name.replaceAll(" ", ".")).parent().show();
	}
}

Monolith.UI.CloseMenus = function() {
	jQuery(".menu").css("transform", "");
}

function addItemToMenu(menu, menuItem) {
	
	// var itemDescription = menuItem.description.replaceAll("'", "&quot;");	 // haven't figured out how to make escape work ...
	
	var clickFunction = "buildMenuItemClick";
	
	if(menu == "#lab-research") clickFunction = "researchMenuItemClick";
	
	var itemClass = menuItem["ui-class"] + ' ' + menuItem["name"];
	
	var itemClassName = itemClass.replaceAll(" ", ".");
	
	// TODO: Maybe there's a way to show cost types in a "line", so that the resource icon need only be shown once, and there's more size for the amounts to be shown
	
	var menuItemCost = '';
	
	if(menu != "#lab-research") {
		
		if(menuItem.materials) menuItemCost += '<i class="fa ' + Monolith.Resources["Materials"].Icon + '">' + menuItem.materials + '</i>';
	
		if(menuItem.population) menuItemCost += '<i class="fa ' + Monolith.Resources["Population"].Icon + '">' + menuItem.population + '</i>';
	}
	else if(menuItem.research) menuItemCost += '<i class="fa ' + Monolith.Resources["Research"].Icon + '">' + menuItem.research + '</i>';
	
	jQuery(menu).prepend('<div style="display: inline-block" onClick="' + clickFunction + '(\'' + menuItem["name"] + '\')"><i class="fa ' + itemClass + '"></i>' +
		'<br />' + menuItemCost + 
	'</div>');
	
	uiStyles.appendChild(document.createTextNode(menu + ' .' + itemClassName + ':hover ~ .description:before { content: \'' + menuItem.name + ': \'; }'));
	uiStyles.appendChild(document.createTextNode(menu + ' .' + itemClassName + ':hover ~ .description:after { content: \'' + menuItem.description + '\'; }'));
}

function buildMenuItemClick(itemName) {
	
	if(isUpgrade(itemName)) doUpgrade(itemName);
	else if(isTowerUpgrade(itemName)) Monolith.Menu.DoTowerUpgrade(itemName);
	else doBuild(itemName);
		
	jQuery("#monolith .col.active").removeClass("active");

	Monolith.UI.CloseMenus();
}

function isUpgrade(upgradeName) {
	
	for(var index in Monolith.Upgrades) {
		
		if(upgradeName == index) return true;
	}
	
	return false;
}

function isTowerUpgrade(upgradeName) {
	
	for(var index in Monolith.TowerUpgrades) {
		
		if(upgradeName == index) return true;
	}
	
	return false;
}

function doBuild(itemName) {
	
	var structure = Monolith.Structures[itemName];
	
	if(structure.isStairs && currentFloorHasStairs()) return;
	
	if(!Monolith.PayResource("Materials", structure.materials)) return;
		
	var activeElement = jQuery("#monolith .col.active");
	
	jQuery(activeElement).children(".fa").addClass(structure["ui-class"]).addClass(itemName).addClass("buildStructure");
	
	var parent = jQuery(activeElement).parent();
	
	var row = jQuery("#monolith .row").index(parent);
	
	var col = jQuery(parent).children().index(activeElement);
	
	setFloorTile(col, row, structure);
	
	structureAdded(structure);
}

function doUpgrade(itemName) {
	
	var upgrade = Monolith.Upgrades[itemName];
	
	// if(itemClass.indexOf("Stairs") > -1 && currentFloorHasStairs()) return;
	
	if(!Monolith.PayResource("Materials", upgrade.materials)) return;
		
	var activeElement = jQuery("#monolith .col.active");
	
	// jQuery(activeElement).children(".fa").addClass(itemClass);
	
	jQuery(activeElement).append('<i class="fa fa-stack-1x buildStructure ' + upgrade["ui-class"] + ' ' +  upgrade.name + '" aria-hidden="true"></i>');
	
	var parent = jQuery(activeElement).parent();
	
	var row = jQuery("#monolith .row").index(parent);
	
	var col = jQuery(parent).children().index(activeElement);
	
	upgradeFloorTile(col, row, upgrade);
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
	
	if(structure.name == "Habitat") clearTimeout(notifyShelterHint);
	
	if(structure.name == "Lab") clearTimeout(notifyLabHint);	
	
	if(structure.isStairs) addFloor();
}

function removeMenuItem(menu, itemClass) {
	
	jQuery(menu + " ." + itemClass).remove();
}

function createMenuItemForDelete() {
	
	jQuery("#ui-block-detail").prepend('<div><i class="fa fa-trash-o"></i></div>');
	jQuery("#ui-block-detail :first-child").click( function() { 
	
		// jQuery("#monolith .col.active").removeAttr("structure");
	
		jQuery("#monolith .col.active").attr("class", "fa col");

		Monolith.UI.CloseMenus();
	});
}

createMenuItemForDelete();

jQuery("#wrapper").click(function(event) { 

	if(event.toElement == this) Monolith.UI.CloseMenus();
});