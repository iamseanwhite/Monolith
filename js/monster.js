
Monolith.LivingMonsters = [];

Monolith.MonsterLoop = function() {

    Monolith.Monsters.CalculateMonsterSpawns();

    for(var index in Monolith.LivingMonsters) {

        Monolith.LivingMonsters[index].think();
    }
}

setInterval(Monolith.MonsterLoop, 250);

Monolith.Monsters.nextLane = -1;
Monolith.Monsters.SpawnDelay = 25000;
Monolith.Monsters.LastSpawn = new Date().getTime();

// Spawn based on the number of population, last spawn time
Monolith.Monsters.CalculateMonsterSpawns = function() {

    if(Monolith.Resources.Get("population") < 50) return;
    
    if(new Date().getTime() - Monolith.Monsters.LastSpawn < Monolith.Monsters.SpawnDelay) return;
	
	Monolith.Monster();
}

Monolith.Monster = function() {

    Monolith.Monsters.LastSpawn = new Date().getTime();

    this.findNextOpenLane = function() {

        // var laneCount = Monolith.MaxCols * Monolith.MaxRows;
        var laneCount = Monolith.MaxRows;   // later, x2 for the other side, and then we figure out the other sides ...

        if (Monolith.Monsters.nextLane++ >= laneCount) Monolith.Monsters.nextLane = 0;

        return Monolith.Monsters.nextLane;
    }

    this.initialDraw = function() {

        var newEnemy = document.createElement("div");
        newEnemy.className = "enemy";
        newEnemy.innerHTML = '<i class="fa ' + Monolith.Monsters.Icon + '"></i>';
        newEnemy.style.left = "100%";
        this.domElement = newEnemy;
        
        // TODO if this keeps, recalculate on resize
        var position = jQuery(jQuery("#monolith .row")[this.lane]).children().last().offset()
        var outerWidth = jQuery(jQuery("#monolith .row")[this.lane]).children().last().outerWidth()
        this.columnRight = Math.floor(position.left + outerWidth);

        this.parentOuterWidth = jQuery(jQuery("#monolith .row")[this.lane]).outerWidth();
        console.log(this.columnRight)

        // insert after first child so that the "first" and "last" css selectors can still style correctly ...
        jQuery(jQuery("#monolith .row")[this.lane]).children(":first-child").after(newEnemy);
    }

    this.x = 0;
    this.y = 0;
    this.health = 100;
    this.damageDone = 1;

    this.lane = this.findNextOpenLane();
    this.lanePosition = 0; 
    this.maxLanePosition = 5;  // we'll want to make this better at some point ...
    this.lastMovement = new Date().getTime();
    this.movementInterval = 600;

    this.move = function() {

        if(new Date().getTime() - this.lastMovement < this.movementInterval) return;

        if(this.lanePosition < this.maxLanePosition) this.lanePosition++;

        this.crappyPixelBasedMovement();

        this.lastMovement = new Date().getTime();
    }

    this.crappyPixelBasedMovement = function() {

        // var monsterLeft = this.parentOuterWidth * (parseInt(this.domElement.style.left) / 100);
        var monsterLeft = parseInt(jQuery(this.domElement).offset().left);
        if(monsterLeft > this.columnRight)
            this.domElement.style.left = (parseInt(this.domElement.style.left) - 1) + "%";
    }

    this.attack = function() {

        // later we can pick a specific tile to damage ...

        Monolith.damage(this.damageDone);
    }

    this.damage = function(amount) {

        this.health -= amount;

        if(this.health < 1) {

            this.kill();
        }
    }

    this.kill = function() {

        for(var i = 0; i < Monolith.LivingMonsters.length; i++) {

            if(Monolith.LivingMonsters[i] == this) {

                Monolith.LivingMonsters.splice(i, 1);
                break;
            }
        }

        jQuery(this.domElement).remove();
    }

    this.draw = function() {

        // render, or fix the rendering of the monster
        // TODO: use "needsRenderUpdate" flag ...
    }

    this.think = function() {

        this.move();

        this.attack();

        this.draw();
    }

    Monolith.LivingMonsters.push(this);

    this.initialDraw();

    return this;
}
