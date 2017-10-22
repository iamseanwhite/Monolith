
Monolith.health = 100;

var sentDamageWarning = 0;

Monolith.damage = function(amount) {

    Monolith.health -= amount;

    if(Monolith.health < 90 && sentDamageWarning < 1) {

        Monolith.UI.Hint("Your Monolith is taking damage! Build some turrets to fight the monsters.");
        sentDamageWarning++;    // So technically this isn't thread safe but JS doesn't really do threads so instead we'll write it this way to make reordering easier
    }

    else if(Monolith.health < 85 && sentDamageWarning < 2) {

        Monolith.UI.Hint("You should probably figure out a way to repair your tower.");
        sentDamageWarning++;
    }

    else if(Monolith.health < 50 && sentDamageWarning < 3) {

        Monolith.UI.Hint("If your tower dies, it's game over, man!");
        sentDamageWarning++;
    }

    if(Monolith.health < 1) {
        Monolith.GameOver();
    }
}

Monolith.GameOver = function() {

    // alert('Your Monolith has died. Game over!');
}

