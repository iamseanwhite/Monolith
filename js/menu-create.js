Monolith.Menu = {};
Monolith.ResearchedItems = [];

var uiStyles = document.createElement("style");
document.head.appendChild(uiStyles);

function addItemToMenu(menuItem) {
	
	var menu = "#ui-build-menu";
	
	if(menuItem.structureType == "upgrade") menu = "#ui-block-detail";
	
	// var itemDescription = menuItem.description.replaceAll("'", "&quot;");	 // haven't figured out how to make escape work ...
	
	var itemClass = menuItem["ui-class"] + ' ' + menuItem["name"];
	
	// var itemClassName = itemClass.replaceAll(" ", ".");
	
	// TODO: Maybe there's a way to show cost types in a "line", so that the resource icon need only be shown once, and there's more size for the amounts to be shown
	
	var menuItemCost = '';
	
	if(!Monolith.IsResearched(menuItem)) {
		menuItemCost += '<i class="fa ' + Monolith.Resources["Research"].Icon + '">' + menuItem.research + '</i>';
	} else {
		
		// TODO: Loop cost types
		
		if(menuItem.materials) menuItemCost += '<i class="fa ' + Monolith.Resources["materials"].Icon + '">' + menuItem.materials + '</i>';
	
		if(menuItem.population) menuItemCost += '<i class="fa ' + Monolith.Resources["population"].Icon + '">' + menuItem.population + '</i>';
	}
	
	jQuery(menu).prepend('<div style="display: inline-block" class="' + menuItem["name"] + '" onClick="Monolith.UI.BuildMenuItemClick(\'' + menuItem["name"] + '\')"><i class="fa ' + itemClass + '"></i>' +
		'<br />' + menuItemCost + 
	'</div>');
	
	// uiStyles.appendChild(document.createTextNode(menu + ' div.' + itemClassName + ':hover ~ .description:before { content: \'' + menuItem.name + ': \'; }'));
	// uiStyles.appendChild(document.createTextNode(menu + ' div.' + itemClassName + ':hover ~ .description:after { content: \'' + menuItem.description + '\'; }'));
	uiStyles.appendChild(document.createTextNode(menu + ' .' + menuItem["name"] + ':hover ~ .description:before { content: \'' + menuItem.name + ': \'; }'));
	uiStyles.appendChild(document.createTextNode(menu + ' .' + menuItem["name"] + ':hover ~ .description:after { content: \'' + menuItem.description + '\'; }'));
}

Monolith.RepaintMenuItem = function(structure) {

	var menuItemCost = '';
		
	if(structure.materials) menuItemCost += '<i class="fa ' + Monolith.Resources["materials"].Icon + '">' + structure.materials + '</i>';

	if(structure.population) menuItemCost += '<i class="fa ' + Monolith.Resources["population"].Icon + '">' + structure.population + '</i>';
	
	var itemClass = structure["ui-class"] + ' ' + structure["name"];

	jQuery(".menu ." + structure["name"]).html('<i class="fa ' + itemClass + '"></i>' +
		'<br />' + menuItemCost);

}

Monolith.IsResearched = function(menuItem) {
	
	return !(menuItem.research && menuItem.research > 0 && jQuery.inArray(menuItem, Monolith.ResearchedItems) == -1);
}

// Menu item for delete
jQuery("#ui-block-detail").prepend('<div><i class="fa fa-trash-o" onClick="Monolith.UI.DeleteActiveStructure()"></i></div>');

Monolith.UI.DeleteActiveStructure = function() {
	
	var activeElement = jQuery("#monolith .col.active");
	
	activeElement.removeClass("active")
		.children().remove();
	
	clearFloorTile(Monolith.GetXYForCol(activeElement));

	Monolith.UI.CloseMenus();
}

Monolith.GetXYForCol = function(tile) {
	
	var parent = jQuery(tile).parent();
	
	var row = jQuery("#monolith .row").index(parent);
	
	var col = jQuery(parent).children().index(tile);
	
	return col + "," + row;
}

jQuery("#wrapper").click(function(event) { 

	if(event.toElement == this) Monolith.UI.CloseMenus();
});