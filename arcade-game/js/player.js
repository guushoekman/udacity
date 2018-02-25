/**
 * @description Represents a Player. Using a grid based system, we will move the player along the game board.
 * We are using inheritance to handle common operations.
 * @constructor
 * @param {string} sprite - The sprite of player
 */
var Player = function(sprite) {
  GameEntity.call(this, sprite);
  this.initialGridX = 2;
  this.initialGridY = 4;
  this.offsetY = -35;               // Using this offset to centralize the sprite
  this.positionFactorX = 100;       // Using this values because works better the algorithm that centralize the object
  this.positionFactorY = 82.5;      // Using this values because works better the algorithm that centralize the object
  this.gridY = this.initialGridY;
  this.gridX = this.initialGridX;
  this.width = 101;                 // Dimensions of the object
  this.height = 171;                // Dimensions of the object
  this.y = this.gridY * this.positionFactorY - this.offsetY;
  this.x = this.gridX * this.positionFactorX;
};

Player.prototype = Object.create(GameEntity.prototype);
Player.prototype.constructor = Player;

/**
 * @description Overriding the reset method that put the initial position of player
 */
Player.prototype.reset = function() {
  this.gridY = this.initialGridY;
  this.gridX = this.initialGridX;
  this.x = this.initialGridX * this.positionFactorX;
  this.y = this.initialGridY * this.positionFactorY - this.offsetY;
};

/**
 * @param {string} direction direction that player are moving. The only restriction
 * that we use is the player does not to move outside of board game.
 * @description Moves the player sprite along the game board based on direction
 */
Player.prototype.handleInput = function(direction) {
  if (direction === "left" && this.gridX > 0) {
    this.gridX--;
  } else if (direction === "right" && this.gridX < 4) {
    this.gridX++;
  } else if (direction === "up" && this.gridY > 0) {
    this.gridY--;
  } else if (direction === "down" && this.gridY < 4) {
    this.gridY++;
  }
  this.y = this.gridY * this.positionFactorY - this.offsetY;
  this.x = this.gridX * this.positionFactorX;
  ctx.drawImage(Resources.get(this.sprite), this.y, this.x);
};