'use strict';

/** 
 * @constructor Dice
 * @desc creates a new die object
 * @param {Number} sides number of sides for the die to have
 * 
 */
var Dice = function(sides){
    this.sides = sides;
    this.selected = false;
    this.value = this.roll();
};

/**
 * @memberof Dice
 * @function setSelected
 * @desc change the boolean value of the selected state
 * @static
 * 
 */
Dice.prototype.setSelected = function(){
    this.selected = !this.selected;
};

/**
 * @memberof Dice
 * @function getSelected
 * @desc get the die's selected value
 * @returns selected boolean
 * 
 */
Dice.prototype.getSelected = function(){
    return this.selected;
};

/**
 * @memberof Dice
 * @function roll
 * @desc roll the dice to receive a random number between the sides of the dice and 1
 * @returns a numeric value between 1 and the number of sides
 * 
 */
Dice.prototype.roll = function(){
    var max = this.sides;
    var min = 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * @memberof Dice
 * @function setValue
 * @desc sets the current value of the die
 * @static
 * 
 */
Dice.prototype.setValue = function(){
    this.value = this.roll();
};

/**
 * @memberof Dice
 * @function getValue
 * @desc gets the current value of the die
 * @static
 * 
 */
Dice.prototype.getValue = function(){
    return this.value;
};
