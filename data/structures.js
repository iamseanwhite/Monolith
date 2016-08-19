// TODO: structure requires another structure
// TODO: No hyphens in prioerty names (looking at you, ui-class)

var structures = [
/*
   {
      "name" : "Turret",
	 "ui-class":"fa-crosshairs",
	 "description":"Shoots stuff.",
	 "upgrades":[
		"Range",
		"Firing Speed"
	 ]
   },
*/
   {
      "name" : "Stairs",
	 "ui-class":"fa-sort-amount-desc fa-flip-vertical",
	 "description":"Unlock the next tower floor.",
	 "materials" : "500",
	 "research" : "10",
	 "isStairs" : "true"
   },
   {
      "name" : "Habitat",
	 "ui-class":"fa-bed",
	 "description":"Supports up to 10 population.",
	 "materials" : "100",
	 "upgrades":[
		{
			"name" : "Bunk Beds"
		}
	 ]
   },
   {
      "name" : "Lab",
	 "ui-class":"fa-flask",
	 "description":"Generates research.",
	 "materials" : "225",
	 "population" : "10",
   },
   {
      "name" : "Library",
	 "ui-class":"fa-book",
	 "description":"Boosts adjacent labs.",
	 "materials" : "275",
	 "research" : "30"
   }
]

var upgrades = [
/*
   {
      "name" : "Range",
	 "ui-class":"fa-crosshairs",
	 "description":"Decrease time between shots."
   }
*/
   {
      "name" : "Bunk Beds",
	 "ui-class":"fa-bed",
	 "description":"Habitat supports 10 more population.",
	 "materials" : "120",
   }
]

var towerUpgrades = [
	{
		"name" : "McFattys",
		"ui-class" : "mcfattys",
		"description" : "Install a McFattys in your Monolith to widen the tower!",
		"research" : "50"
	},	
	{
		"name" : "Struts",
		"ui-class" : "struts",
		"description" : "Throw some supports under your tower to allow it to increase in size.",
		"research" : "50"
	},
	{
		"name" : "Anchors",
		"ui-class" : "anchors fa-anchor",
		"description" : "Install cables to anchor your tower to allow stable growth to greater heights.",
		"research" : "100"
	}
]