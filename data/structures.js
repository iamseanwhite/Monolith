// TODO: structure requires another structure
// TODO: No hyphens in property names (looking at you, ui-class)

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
	  /*
	 "ui-class":"fa-sort-amount-desc fa-flip-vertical",
	 */
	 "ui-class":"flaticon-stairs-1",
	 "description":"Unlock the next tower floor.",
	 "materials" : "350",
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
      "name" : "Kitchen",
	 "ui-class":"fa-cutlery",
	 "description":"Feeds up to 10 population.",
	 "materials" : "250",
   },
   {
      "name" : "Lab",
	 "ui-class":"fa-flask",
	 "description":"Generates research.",
	 "materials" : "225",
	 "population" : "10",
	 "unlockedOnFloor" : 2
   },
   {
      "name" : "Bank",
	 "ui-class":"fa-usd",
	 "description":"Provides interest on materials.",
	 "materials" : "275",
	 "research" : "10",
	 "unlockedOnFloor" : 6
   },
   {
      "name" : "Library",
	 "ui-class":"fa-book",
	 "description":"Boosts adjacent labs.",
	 "materials" : "275",
	 "research" : "30",
	 "unlockedOnFloor" : 8
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
	  "structureType" : "upgrade",
	 "ui-class":"fa-bed",
	 "description":"Habitat supports 10 more population.",
	 "materials" : "120",	 
	 "unlockedOnFloor" : 3
   }
]

var towerUpgrades = [
	{
		"name" : "McFattys",
		"structureType" : "tower-upgrade",
		"ui-class" : "mcfattys",
		"description" : "Install a McFattys in your Monolith to widen the tower!",
		"population" : "50",
		"unlockedOnFloor" : 5
	},	
	{
		"name" : "Struts",
		"structureType" : "tower-upgrade",
		"ui-class" : "struts",
		"description" : "Throw some supports under your tower to allow it to increase in size.",
		"population" : "150",
		"unlockedOnFloor" : 10
	},
	{
		"name" : "Anchors",
		"structureType" : "tower-upgrade",
		"ui-class" : "anchors fa-anchor",
		"description" : "Install cables to anchor your tower to allow stable growth to greater heights.",
		"population" : "500",
		"unlockedOnFloor" : 15
	}
]