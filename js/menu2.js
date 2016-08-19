function addMenu(menuId) {
	
	jQuery("body").prepend('<div class="menu" id="' + menuId + '"><div class="description"></div></div>');
}

addMenu("tower-upgrades");

addMenu("lab-research");

jQuery("#ui-variables").click(function() { 
	
	openMenu("#lab-research");
});

function addItemToResearchMenu(itemClass, itemName, itemDescription) {
	
	var menu = "#lab-research";
	
	var itemClassName = itemClass.replaceAll(" ", ".");
	
	itemClass = itemClass + ' ' + itemName;
	
	jQuery(menu).prepend('<i class="fa fa-fw ' + itemClass + '" onClick="researchMenuItemClick(\'' + itemName + '\')"></i>');
	
	uiStyles.appendChild(document.createTextNode(menu + ' .' + itemClassName + ':hover ~ .description:before { content: \'' + itemName + ': \'; }'));
	uiStyles.appendChild(document.createTextNode(menu + ' .' + itemClassName + ':hover ~ .description:after { content: \'' + itemDescription + '\'; }'));
}

function researchMenuItemClick(itemName) {
	
	// TODO: How to determine which menu to go to? (currently research only applies to buildings ...)
	
	var structure = Monolith.Structures[itemName];
	
	addItemToMenu("#ui-build-menu", structure);
	
	removeFromResearchMenu(structure["ui-class"]);

	closeMenus();
}

function removeFromResearchMenu(itemClass) {
	
	itemClass = itemClass.replaceAll(" ", ".");
	
	jQuery("#lab-research ." + itemClass).remove();
}