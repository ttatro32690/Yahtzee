'use strict';

var Dice = function(sides){
    this.sides = sides;
    this.selected = false;
    this.value = 1;
};

Dice.prototype.setSides = function(sides){
    this.sides = sides;
};

Dice.prototype.getSides = function(){
    return this.sides;
};

Dice.prototype.setSelected = function(selected){
    this.selected = selected;
};

Dice.prototype.getSelected = function(){
    return this.selected;
};

Dice.prototype.setValue = function(value){
    this.value = value;
};

Dice.prototype.getValue = function(){
    return this.value;
};

Dice.prototype.roll = function(){
    var max = this.sides;
    var min = 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

