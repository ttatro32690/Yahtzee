'use strict';

var Dice = function(sides){
    this.sides = sides;
    this.selected = false;
    this.value = 1;
};

Dice.prototype.roll = function(){
    var max = this.sides;
    var min = 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

