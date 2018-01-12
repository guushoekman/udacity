/* Object model of any enemy that the game has. We are using inheritance to handle common operations. */
var Enemy = function() {
    GameEntity.call(this, 'images/enemy-bug.png');
    this.width = 101;
    this.height = 171;
    this.gridY = Math.floor((Math.random() * 1000) % 3);
    this.offsetY = 60;
    this.positionFactorY = 82.5;
    this.y = this.offsetY + (this.gridY * this.positionFactorY);
    this.x = 0;
    this.speedX = (Math.random() * 1000) % 3;
};

Enemy.prototype = Object.create(GameEntity.prototype);
Enemy.prototype.constructor = Enemy;

/* Overriding the reset function to calculate the correct position of X and Y */
Enemy.prototype.reset = function () {
    this.gridY = Math.floor((Math.random() * 1000) % 3);
    this.y = this.offsetY + (this.gridY * this.positionFactorY);
    this.x = 0;
    this.speedX = (Math.random() * 1000) % 3;
};

/* Overriding the update function for the enemy since it needs to move independently from the player. */
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speedX;
    if (this.x > 500) {
        this.reset();
    }
};
