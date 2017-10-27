Monolith.Floors = [];
Monolith.StructureCount = {};
Monolith.CurrentFloorIndex = 0;

Monolith.MaxRows = 3;
Monolith.MaxCols = 3;

var canChangeFloorsRightNow = true;
var defaultColumnClass = " fa fa-stack-1x buildStructure ";

if(localStorage.getItem("MonolithFloors") != null) Monolith.Floors = JSON.parse(localStorage.getItem('MonolithFloors'));

function setFloorTile(floorIndex, structure) {
	
	var structureCount = Monolith.StructureCount[structure.name] || 0;
	
	Monolith.StructureCount[structure.name] = structureCount + 1;
	
	 Monolith.CurrentFloor[floorIndex] = {
		 "structure" : structure,
		 "upgrades" : []
	 }
	 
	 // TODO: This. There's a lot of issues
	// localStorage.setItem('MonolithFloors', JSON.stringify(Monolith.Floors));
}

function upgradeFloorTile(floorIndex, upgrade) {
	
	if (Monolith.CurrentFloor[floorIndex] == null) {
		console.log("NOT GOOD");
		return;
	}
	
	 Monolith.CurrentFloor[floorIndex].upgrades.push(upgrade);
	 
	// localStorage.setItem('MonolithFloors', JSON.stringify(Monolith.Floors));
}

function clearFloorTile(floorIndex) {
	
	delete Monolith.CurrentFloor[floorIndex];
}

// TODO: Write a "set current tile" function that takes the .active .col and stores its children as a floor tile ...

function addFloor() {
	
	Monolith.Floors.push({});
	
	jQuery("#ui-map").prepend('<div class="row"><i onclick="setCurrentFloor(getFloorIndex(this));" class="fa"></i></div>');
	
	if(Monolith.Floors.length > 1) jQuery("#ui-map").css("opacity", "1");
	else jQuery("#ui-map .fa").addClass("currentFloor");
	
	// for all buildable items
	// if floor number is the unlockedOnFloor for structure, add it to build menu ...
	
	for(var buildableName in Monolith.AllBuildables) {
		
		var buildable = Monolith.AllBuildables[buildableName];
		
		if(buildable.unlockedOnFloor == Monolith.Floors.length) addItemToMenu(buildable);
	}
}

function getFloorIndex(floorElement) {
	
	return jQuery("#ui-map .fa").length - 1 - jQuery("#ui-map .fa").index(floorElement);
}

function setCurrentFloor(floorIndex) {
	
	if(Monolith.Floors[floorIndex] === undefined) return;
	
	if(Monolith.Floors[floorIndex] == Monolith.CurrentFloor) {
		
		// openMenu("#tower-upgrades");
		
		return;
	}
	
	Monolith.UI.CloseMenus();
	
	if(!canChangeFloorsRightNow) return;
	canChangeFloorsRightNow = false;
	
	Monolith.CurrentFloorIndex = floorIndex;
	
	Monolith.CurrentFloor = Monolith.Floors[floorIndex];
	
	jQuery(".currentFloor").removeClass("currentFloor");
	var menuFloorItem = jQuery("#ui-map .fa")[jQuery("#ui-map .fa").length - floorIndex - 1];
	jQuery(menuFloorItem).addClass("currentFloor");
	
	console.log("Setting floor to " + floorIndex);
	console.log(Monolith.CurrentFloor);
	
	// TODO: Different animation based on whether we're going up or down ...
	drawFloor();
}

function drawFloor() {
	
	// Well. This certainly got complicated. 
	
	var transitionTime = 1350;
	
	jQuery("#wrapper")
		.css("transition", "all " + transitionTime + "ms")
		.prepend( '<div id="newFloor" class="monolith-floor">' + getFloorContent() + '</div>' );
		
	jQuery(".monolith-floor .col").css("transition", "opacity " + (transitionTime / 2) + "ms");
	
	var delta = parseInt(jQuery("#monolith").offset().top) - parseInt(jQuery("#newFloor").offset().top);
	
	jQuery("#wrapper").css("padding-top", delta + "px");
	
	jQuery("#newFloor .col").css("opacity", "var(--monolith-opacity)");
	jQuery("#monolith .col").css("opacity", "0");
	
	setTimeout(resetFloor, transitionTime + 100);
}

function getFloorContent() {
	
	var floorContent = "";
	
	for(var row = 0; row < Monolith.MaxRows; row++) {
		
		floorContent += '<div class="row">';
		
		for(var col = 0; col < Monolith.MaxCols; col++) {
						
			floorContent += '<div class="col fa-stack fa-lg" onClick="monolithTileClicked(this)"></div>';			
		}
		
		floorContent += '</div>';
	}
	
	return floorContent;
}

function resetFloor() {
	
	// jQuery("#monolith").hide();
	
	resetFloorItemClasses();
		
	// jQuery(".monolith-floor .col").css("transition", "");
	
	jQuery("#wrapper")
		.css("transition", "")
		.css("padding-top", "0");
	
	jQuery("#monolith .col").css("opacity", "1");
	jQuery("#newFloor .col").css("opacity", "0");
	
	jQuery("#newFloor").remove();
	// jQuery("#monolith").show();
	
	canChangeFloorsRightNow = true;
}

function resetFloorItemClasses() {
	
	//jQuery("#monolith .col .fa").attr("class", defaultColumnClass);
	jQuery("#monolith .col").children().remove();
	
	for(var floorItem in Monolith.CurrentFloor) {
				
		var col = floorItem.split(",")[0];
		var row = floorItem.split(",")[1];
		row = jQuery("#monolith .row")[row];
		col = jQuery(row).children(".col")[col];
		
		var structure = Monolith.CurrentFloor[floorItem].structure;
		
		jQuery(col).append('<i class="' + structure.name + defaultColumnClass + structure["ui-class"] + '"></i>');
		
		for(var upgradeIndex in Monolith.CurrentFloor[floorItem].upgrades) {
			
			var upgrade = Monolith.CurrentFloor[floorItem].upgrades[upgradeIndex];
			
			jQuery(col).append('<i class="' + upgrade.name + defaultColumnClass + upgrade["ui-class"] + '"></i>');
		}
	}	
}

function currentFloorHasStairs() {
	
	return Monolith.Floors.length -1 > jQuery(Monolith.Floors).index(Monolith.CurrentFloor);
}

Monolith.IncreaseMaxFloorSize = function(cols, rows) {
	
	Monolith.MaxRows += rows;
	
	Monolith.MaxCols += cols;
	
	jQuery("#monolith").html(getFloorContent());
	
	resetFloorItemClasses();
}

Monolith.GetStructureCount = function(structure) {

	if(typeof structure != "string") structure = structure.name;
	
	return Monolith.StructureCount[structure] || 0;
}

Monolith.GetFloorEntryForElement = function(element) {	
	
	var parent = jQuery(element).parent();
	
	var col = parent.children().index(element);
	
	var row = parent.parent().children().index(parent);
	
	return Monolith.CurrentFloor[col+","+row];
}