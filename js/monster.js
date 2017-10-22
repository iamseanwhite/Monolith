
Monolith.LivingMonsters = [];

Monolith.MonsterLoop = function() {

    for(var index in Monolith.LivingMonsters) {

        Monolith.LivingMonsters[index].think();
    }
}

setInterval(Monolith.MonsterLoop, 500);

// spawns ...

// TODO: namespace
Monolith.Monster = function() {

    this.nextLane = -1;

    this.findNextOpenLane = function() {

        // var laneCount = Monolith.MaxCols * Monolith.MaxRows;
        var laneCount = Monolith.MaxRows;   // later, x2 for the other side, and then we figure out the other sides ...

        if (this.nextLane++ >= laneCount) this.nextLane = 0;

        return this.nextLane;
    }

    this.initialDraw = function(monster) {

        var newEnemy = document.createElement("div");
        newEnemy.className = "enemy";
        newEnemy.innerHTML = '<i class="fa ' + Monolith.Monsters.Icon + '"></i>';

        jQuery("#monolith .row")[monster.lane].appendChild(newEnemy);
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
        movementInterval: 1500
    };

    monster.move = function() {

        if(new Date().getTime() - this.lastMovement < this.movementInterval) return;

        if(this.lanePosition < this.maxLanePosition) this.lanePosition++;

        this.lastMovement = new Date().getTime();
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
    }

    monster.think = function() {

        this.move();

        this.attack();

        this.draw();
    }

    Monolith.LivingMonsters.push(monster);

    this.initialDraw(monster);

    return monster;
}
