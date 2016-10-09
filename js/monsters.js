Monolith.Monsters = {};

// Randomly spawn monsters and have them move through the background (Aesthetic only)

Monolith.Monsters.MovementRate = 1;
Monolith.Monsters.Active = [];

Monolith.Monsters.CalculateMonsterSpawns = function() {
	
	if(Monolith.Player.Resources.population > 11) Monolith.Monsters.SpawnMonster();
}

Monolith.Monsters.SpawnMonster = function() {
	
	var monster = {};
	
	// For now have a 'from' and a 'to' and just move the monster towards the 'to' ...
	
	// Pick a 'lane' on the tower to 'run at'
	var target = jQuery("#monolith .row .col")[3];
	var targetLeftPercent = (jQuery(target).offset().left + (jQuery(target).outerWidth() / 2)) / jQuery(window).outerWidth();
	var targetTopPercent = (jQuery(target).offset().top + (jQuery(target).outerHeight() / 3)) / jQuery(window).outerHeight();
	targetLeftPercent = targetLeftPercent * 100;
	targetTopPercent = targetTopPercent * 100;
	// console.log(targetLeftPercent);
	
	// Make monster a complex object with target before storing in array
	
	var newEnemy = document.createElement("div");
	newEnemy.className = "enemy";
	newEnemy.innerHTML = '<i class="fa fa-exclamation-circle"></i>';
	document.body.appendChild(newEnemy);
	
	jQuery(newEnemy).css("left", "0%")
		.css("top", "0%");
		
	monster.element = newEnemy;
	monster.targetLeftPercent = targetLeftPercent;
	monster.targetTopPercent = targetTopPercent;
	Monolith.Monsters.Active.push(monster);
	
	// Spawn as far away as possible
	
	// Start moving towards it
	
	if(!Monolith.Monsters.ActInterval) Monolith.Monsters.ActInterval = setInterval(Monolith.Monsters.Act, 500);
}

Monolith.Monsters.Act = function() {
	
	for(var monster in Monolith.Monsters.Active) {
		
		// jQuery(monster.element).css("left")
	}
}

setInterval(Monolith.Monsters.CalculateMonsterSpawns, 7200);

// Interval for calculating monster damage to tower