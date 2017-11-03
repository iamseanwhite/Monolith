
Monolith.Bullets = [];

Monolith.TurretLoop = function() {

    if(Monolith.LivingMonsters.length == 0) return;
    
    // this is a hack for now ...
    jQuery("#monolith .row .col .Turret").each( function(index, element) {
        
        console.log(this);

        // refire rate ...
        // get closest monster (in range)
        // shoot it
        
        for(var index in Monolith.LivingMonsters) {
    
            new Monolith.Bullet(this, Monolith.LivingMonsters[index]);
        }
    });
}
    
setInterval(Monolith.TurretLoop, 2500);

Monolith.BulletLoop = function() {

    for(var index in Monolith.Bullets) {

        Monolith.Bullets[index].move();
    }
};

setInterval(Monolith.BulletLoop, 25);

// later maybe bullets dont "target seek" by default but for now just do this
Monolith.Bullet = function(spawnElement, target) {

    // if "new" wasn't called, leave
    if(this == Monolith) {
        console.log("Didn't properly 'new' bullet!");
        return;
    }

    this.target = target;
    this.movementAmount = 25;
    this.damage = 35;

    this.domElement = document.createElement("div");
    document.body.appendChild(this.domElement);
    this.domElement.className = "bullet";
    this.domElement.style.left = jQuery(spawnElement).offset().left + "px";
    this.domElement.style.top = jQuery(spawnElement).offset().top + "px";

    this.move = function() {

        var thisOffset = jQuery(this.domElement).offset();
        var targetOffset = jQuery(target.domElement).offset();
        var yDiff = Math.abs(thisOffset.top - targetOffset.top);
        var xDiff = Math.abs(thisOffset.left - targetOffset.left);        
        var slope = yDiff / xDiff;

        var ySpeed = this.movementAmount * slope;
        var xSpeed = this.movementAmount - ySpeed;

        jQuery(this.domElement).offset({
            "left": thisOffset.left + xSpeed,
            "top": thisOffset.top + ySpeed,
        });

        this.checkCollision(thisOffset, yDiff, xDiff);
    }

    this.checkCollision = function(thisOffset, yDiff, xDiff) {

        if(thisOffset.left > window.inenrWidth 
            || thisOffset.top > window.innerHeight
            || thisOffset.left < 0
            || thisOffset.top < 0) {

                this.kill();
            }

        if(xDiff + yDiff < 10) {

            this.target.damage(this.damage);
            this.kill();
        }
    }

    this.kill = function() {
        
        for(var i = 0; i < Monolith.Bullets.length; i++) {

            if(Monolith.Bullets[i] == this) {

                Monolith.Bullets.splice(i, 1);
                break;
            }
        }

        jQuery(this.domElement).remove();
    }

    Monolith.Bullets.push(this);

    return this;
}
