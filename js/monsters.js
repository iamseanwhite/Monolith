Monolith.Monsters = {};

// Randomly spawn monsters and have them move through the background (Aesthetic only)

Monolith.Monsters.Icon = "flaticon-skull";
Monolith.Monsters.MovementRate = 1;
Monolith.Monsters.Active = [];

Monolith.Monsters.CalculateMonsterSpawns = function() {
	
	if(Monolith.Resources.Get("population") > 11) Monolith.Monsters.SpawnMonster();
}

Monolith.Monsters.SpawnMonster = function() {
	
	// Pick a 'lane' on the tower to 'run at'
	var target = jQuery("#monolith .row .col")[3];
	// var targetLeftPercent = (jQuery(target).offset().left + (jQuery(target).outerWidth() / 2)) / jQuery(window).outerWidth();
	// var targetTopPercent = (jQuery(target).offset().top + (jQuery(target).outerHeight() / 3)) / jQuery(window).outerHeight();
	var targetLeftPercent = (jQuery(target).offset().left / jQuery(window).outerWidth()) * 100;
	var targetTopPercent = (jQuery(target).offset().top / jQuery(window).outerHeight()) * 100;
	// targetLeftPercent = targetLeftPercent * 100;
	// targetTopPercent = targetTopPercent * 100;
	
	var newEnemy = document.createElement("div");
	newEnemy.className = "enemy";
	newEnemy.innerHTML = '<i class="fa ' + Monolith.Monsters.Icon + '"></i>';
	document.body.appendChild(newEnemy);
	
	jQuery(newEnemy).css("left", "0%").css("top", "0%");
	if(targetLeftPercent > targetTopPercent) jQuery(newEnemy).css("left", targetLeftPercent - targetTopPercent + "%");
	else jQuery(newEnemy).css("top", targetTopPercent - targetLeftPercent + "%");
	
	Monolith.Monsters.Active.push({
		"element" : newEnemy,
		"targetLeftPercent" : targetLeftPercent,
		"targetTopPercent" : targetTopPercent,
	});
	
	if(!Monolith.Monsters.ActInterval) Monolith.Monsters.ActInterval = setInterval(Monolith.Monsters.Act, 80);
}

Monolith.Monsters.Act = function() {
	
	for(var monsterIndex in Monolith.Monsters.Active) {
		
		var monster = Monolith.Monsters.Active[monsterIndex];
		
		var monsterLeft = parseInt(monster.element.style.left);
		var monsterTop = parseInt(monster.element.style.top);
		
		if(monsterLeft < monster.targetLeftPercent) monster.element.style.left = (monsterLeft + Monolith.Monsters.MovementRate) + "%";
		if(monsterTop < monster.targetTopPercent) monster.element.style.top = (monsterTop + Monolith.Monsters.MovementRate) + "%";
		
		// if in range, attack
	}
}

// setInterval(Monolith.Monsters.CalculateMonsterSpawns, 7200);