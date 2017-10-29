
Monolith.LivingMonsters = [];

Monolith.MonsterLoop = function() {

    for(var index in Monolith.LivingMonsters) {

        Monolith.LivingMonsters[index].think();
    }
}

setInterval(Monolith.MonsterLoop, 500);

Monolith.Monsters.nextLane = -1;

// spawns ...

// TODO: namespace
Monolith.Monster = function() {

    this.findNextOpenLane = function() {

        // var laneCount = Monolith.MaxCols * Monolith.MaxRows;
        var laneCount = Monolith.MaxRows;   // later, x2 for the other side, and then we figure out the other sides ...

        if (Monolith.Monsters.nextLane++ >= laneCount) Monolith.Monsters.nextLane = 0;

        return Monolith.Monsters.nextLane;
    }

    this.initialDraw = function(monster) {

        var newEnemy = document.createElement("div");
        newEnemy.className = "enemy";
        newEnemy.innerHTML = '<i class="fa ' + Monolith.Monsters.Icon + '"></i>';
        newEnemy.style.left = "100%";
        monster.domElement = newEnemy;
        
        // TODO if this keeps, recalculate on resize
        var position = jQuery(jQuery("#monolith .row")[monster.lane]).children().last().offset()
        var outerWidth = jQuery(jQuery("#monolith .row")[monster.lane]).children().last().outerWidth()
        monster.columnRight = Math.floor(position.left + outerWidth);

        monster.parentOuterWidth = jQuery(jQuery("#monolith .row")[monster.lane]).outerWidth();
        console.log(monster.columnRight)

        // insert after first child so that the "first" and "last" css selectors can still style correctly ...
        jQuery(jQuery("#monolith .row")[monster.lane]).children(":first-child").after(newEnemy);
    }

    var monster = {
        x: 0,
        y: 0,
        health: 100,
        damageDone: 1,

        lane: this.findNextOpenLane(),
        lanePosition: 0, 
        maxLanePosition: 5,  // we'll want to make this better at some point ...
        lastMovement: new Date().getTime(),
        movementInterval: 1150 
    };

    monster.move = function() {

        if(new Date().getTime() - this.lastMovement < this.movementInterval) return;

        if(this.lanePosition < this.maxLanePosition) this.lanePosition++;

        this.crappyPixelBasedMovement();

        this.lastMovement = new Date().getTime();
    }

    monster.crappyPixelBasedMovement = function() {

        // var monsterLeft = this.parentOuterWidth * (parseInt(this.domElement.style.left) / 100);
        var monsterLeft = parseInt(jQuery(this.domElement).offset().left);
        if(monsterLeft > this.columnRight)
            this.domElement.style.left = (parseInt(this.domElement.style.left) - 1) + "%";
    }

    monster.attack = function() {

        // later we can pick a specific tile to damage ...

        Monolith.damage(this.damageDone);
    }

    monster.damage = function(amount) {

        this.health -= amount;

        if(this.health < 1) {

            this.kill();
        }
    }

    monster.kill = function() {

        for(var i = 0; i < Monolith.LivingMonsters.length; i++) {

            if(Monolith.LivingMonsters[i] == this) {

                Monolith.LivingMonsters.splice(i, 1);
                break;
            }
        }
    }

    monster.draw = function() {

        // render, or fix the rendering of the monster
        // TODO: use "needsRenderUpdate" flag ...
    }

    monster.think = function() {

        this.move();

        this.attack();

        this.draw();
    }

    // TODO: refactor to use "this"? ...
    Monolith.LivingMonsters.push(monster);

    this.initialDraw(monster);

    return monster;
}
