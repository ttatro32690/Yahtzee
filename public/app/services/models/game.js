'use strict';

var Dice;

var Game = function(players, player){
    this.players = players;
    this.playerTurn = player;
    this.turns = 13 * this.totalPlayers();
    this.rolls = 3;
    this.diceArray = this.initializeDiceArray();
    this.message = "";
    this.warning = "";
};

Game.prototype.getPlayers = function(){
    return this.players;
};

Game.prototype.setPlayerTurn = function(){
    var index = this.players.indexOf(this.playerTurn);
    if(index+1 === this.players.length){
        this.playerTurn = this.players[0];
    } else {
        this.playerTurn = this.players[index+1];
    }
};

Game.prototype.getPlayerTurn = function(){
    return this.playerTurn;
};

Game.prototype.getTurns = function(){
    return this.turns;
};

Game.prototype.getRolls = function(){
    return this.rolls;
};

Game.prototype.setDiceArray = function(){
    //
};

Game.prototype.initializeDiceArray = function(){
        var diceArray = [];
        for(var i = 0; i < 5; i++){
            diceArray.push(new Dice(6));
        }
        return diceArray;
};

Game.prototype.getDiceArray = function(){
    return this.diceArray;
};

Game.prototype.setMessage = function(message){
    this.message = message;
};

Game.prototype.getMessage = function(){
    return this.message;
};

Game.prototype.setWarning = function(warning){
    this.warning = warning;
};

Game.prototype.getWarning = function(){
    return this.warning;
};

Game.prototype.totalPlayers = function(){
    return this.players.length;
};

Game.prototype.decrementTurn = function(){
    this.turns --;
};

Game.prototype.decrementRolls = function(){
    this.rolls --;
};

Game.prototype.setRolls = function(){
    this.rolls = 3;
};

Game.prototype.isTurnOver = function(){
    if(this.rolls === 0){
        return true;
    } else {
        return false;
    }
};

Game.prototype.isGameOver = function(){
    if(this.turns === 0){
        return true;
    } else {
        return false;
    }
};

Game.prototype.rollUnselected = function(){
    for(var i = 0; i < 5; i++){
        if(!this.diceArray[i].selected){
            this.diceArray[i].value = this.diceArray[i].roll();
        }   
    }
};

Game.prototype.deselectDice = function(){
    for(var i = 0; i < this.diceArray.length; i++){
        this.diceArray[i].selected = false;
    }
};

Game.prototype.endTurn = function(){
    if(this.playerTurn.selection){
        this.playerTurn.selection.score = this.playerTurn.selection.scoreFunction(this.diceArray);
        this.playerTurn.selection.available = false;
        this.playerTurn.selection = "";
        this.decrementTurn();
        if(!this.isGameOver()){
            this.setPlayerTurn();
            this.setRolls();
            this.deselectDice();
            this.setWarning("");
        } else {
            if(this.players[0].grandTotal() > this.players[1].grandTotal()){
                this.setWarning(this.players[0].playerName + " Wins!");
            } else {
                this.setWarning(this.players[1].playerName + " Wins!");
            }
        }
    } else {
        this.setWarning("Please Select a Score!");
    }
};

Game.prototype.selectDice = function(index){
    if(this.rolls < 3){
        this.diceArray[index].selected = !this.diceArray[index].selected;
    } else {
        this.setWarning("Cannot Select Dice Before First Roll!");
    }
};