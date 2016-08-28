Monolith.Floors = [];
Monolith.StructureCount = {};

Monolith.MaxRows = 3;
Monolith.MaxCols = 3;

// TODO: Function to increase floor size ...

var canChangeFloorsRightNow = true;
var defaultColumnClass = "fa fa-stack-1x";

if(localStorage.getItem("MonolithFloors") != null) Monolith.Floors = JSON.parse(localStorage.getItem('MonolithFloors'));

function setFloorTile(x, y, structure) {
	
	var structureCount = Monolith.StructureCount[structure.name] || 0;
	
	Monolith.StructureCount[structure.name] = structureCount + 1;
	
	 Monolith.CurrentFloor[x + "," + y] = {
		 "structure" : structure,
		 // "className" : tileClass,
		 "upgrades" : []
	 }
	 
	 // TODO: This. There's a lot of issues
	// localStorage.setItem('MonolithFloors', JSON.stringify(Monolith.Floors));
}

function upgradeFloorTile(x, y, upgrade) {
	
	if (Monolith.CurrentFloor[x + "," + y] == null) {
		console.log("NOT GOOD");
		return;
	}
	
	// TODO: Convert class to upgrade as with structure.
	 Monolith.CurrentFloor[x + "," + y].upgrades.push(upgrade["ui-class"]);
	 
	// localStorage.setItem('MonolithFloors', JSON.stringify(Monolith.Floors));
}

function addFloor() {
	
	Monolith.Floors.push({});
	
	jQuery("#ui-map").prepend('<div class="row"><i onclick="setCurrentFloor(getFloorIndex(this));" class="fa"></i></div>');
	
	if(Monolith.Floors.length > 1) jQuery("#ui-map").css("opacity", "1");
	else jQuery("#ui-map .fa").addClass("currentFloor");
}

function getFloorIndex(floorElement) {
	
	return jQuery("#ui-map .fa").length - 1 - jQuery("#ui-map .fa").index(floorElement);
}

// TODO: Floor menu doesn't appear until you've purchased stairs

function setCurrentFloor(floorIndex) {
	
	Monolith.UI.CloseMenus();
	
	if(Monolith.Floors[floorIndex] == Monolith.CurrentFloor) {
		
		// console.log("We're already on floor " + floorIndex);
		openMenu("#tower-upgrades");
		
		return;
	}
	if(!canChangeFloorsRightNow) return;
	canChangeFloorsRightNow = false;
	
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
	
	var transitionTime = 1500;
	
	jQuery("#wrapper")
		.css("transition", "all " + transitionTime + "ms")
		.prepend( '<div id="newFloor" class="monolith-floor">' + getFloorContent() + '</div>' );
		
	jQuery(".monolith-floor .col").css("transition", "opacity 2s");
	
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
			
			// floorContent += '<i class="fa col noise" aria-hidden="true"></i>';
			// floorContent += '<i class="fa col" onClick="monolithTileClicked(this)" aria-hidden="true"></i>';			
			floorContent += '<div class="col fa-stack fa-lg" onClick="monolithTileClicked(this)"><i class="' + defaultColumnClass + '" aria-hidden="true"></i></div>';			
		}
		
		floorContent += '</div>';
	}
	
	return floorContent;
}

function resetFloor() {
	
	jQuery("#monolith").hide();
	
	resetFloorItemClasses();
		
	jQuery(".monolith-floor .col").css("transition", "");
	
	jQuery("#wrapper")
		.css("transition", "")
		.css("padding-top", "0");
	
	jQuery("#monolith .col").css("opacity", "1");
	jQuery("#newFloor .col").css("opacity", "0");
	
	jQuery("#newFloor").remove();
	jQuery("#monolith").show();	
	
	canChangeFloorsRightNow = true;
}

function resetFloorItemClasses() {
	
	jQuery("#monolith .col .fa").attr("class", defaultColumnClass);
	
	for(var floorItem in Monolith.CurrentFloor) {
				
		var col = floorItem.split(",")[0];
		var row = floorItem.split(",")[1];
		row = jQuery("#monolith .row")[row];
		col = jQuery(row).children(".col")[col];
		
		jQuery(jQuery(col).children("i")[0]).addClass(Monolith.CurrentFloor[floorItem].structure["ui-class"]).addClass("buildStructure").addClass(structure.name);
		// TODO: Loopy ...
		// TODO: DEFECT: This can't get upgrade name so won't apply correctly ...
		jQuery(jQuery(col).children("i")[1]).addClass(Monolith.CurrentFloor[floorItem].upgrades[0]);
		
		// Aren't actually targeting correct items ...
		// TODO: How are we saving / restoring upgrades?
		// jQuery(col).children(".fa").addClass(Monolith.CurrentFloor[floorItem]);
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

Monolith.GetStructureCount = function(structureName) {
	
	return Monolith.StructureCount[structureName] || 0;
}

Monolith.GetFloorEntryForElement = function(element) {	
	
	var parent = jQuery(element).parent();
	
	var col = parent.children().index(element);
	
	var row = parent.parent().children().index(parent);
	
	return Monolith.CurrentFloor[col+","+row];
}