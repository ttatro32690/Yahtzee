'use strict';

/** 
 * @constructor Game
 * @desc dictates the flow of the yahtzee game.
 * @param {Array} players list of players that will take part in the game
 * @param {Object} player that will start the game
 * 
 */
var Game = function(players, player){
    this.players = players;
    this.playerTurn = player;
    this.turns = 13 * this.totalPlayers();
    this.rolls = 3;
    this.diceArray = this.initializeDiceArray();
    this.warning = "";
};

/** 
 * @memberof Game
 * @function setPlayerTurn 
 * @desc Set the player turn to the next players turn.
 * @static 
 * 
 */
Game.prototype.setPlayerTurn = function(){
    var index = this.players.indexOf(this.playerTurn);
    if(index+1 === this.players.length){
        this.playerTurn = this.players[0];
    } else {
        this.playerTurn = this.players[index+1];
    }
};


/**
 * @memberof Game
 * @function getRolls
 * @desc get the current number of rolls
 * @returns number of rolls
 * 
 */
Game.prototype.getRolls = function(){
    return this.rolls;
};

/**
 * @memberof Game
 * @function setRolls 
 * @desc set the number of rolls for the current turn(should always be 3);
 * @param {Number} rolls instantiates the number of rolls for the next turn
 * @static
 * 
 */
Game.prototype.setRolls = function(rolls){
    this.rolls = rolls;
};

/**
 * @memberof Game
 * @method setScore
 * @desc set the score for the selected score value
 * @static
 * 
 */
Game.prototype.setScore = function(){
    this.playerTurn.selection.setScore(this.playerTurn.selection.scoreFunction(this.diceArray));
    this.playerTurn.selection.setAvailable(false);
    this.playerTurn.setSelection("");
}; 

/**
 * @memberof Game
 * @function getTurns
 * @desc get the number of remaining turns in the game
 * @static
 * 
 */
Game.prototype.getTurns = function(){
    return this.turns;
};

/**
 * @memberof Game
 * @function setWarning
 * @param {String} warning value to display to the user, if "" remove from the users view
 * @desc set the warning value to be displayed to the players
 * @static
 * 
 */
Game.prototype.setWarning = function(warning){
    this.warning = warning;
};
 
/**
 * @memberof Game
 * @function roll
 * @desc roll the dice for the next roll for any die that isn't selected
 * @static
 * 
 */
Game.prototype.roll = function(){
    this.setWarning("");
    this.decrementRolls();
    this.rollUnselected();
};

/**
 * @memberof Game
 * @function decrementRolls
 * @desc decrease the number of rolls left in the turn
 * @static
 * 
 */
Game.prototype.decrementRolls = function(){
    this.rolls --;
};

/**
 * @memberof Game
 * @function rollUnselected
 * @desc roll any unselected die in the diceArray by checking if it's selected value is true
 * @static
 * 
 */
Game.prototype.rollUnselected = function(){
    for(var i = 0; i < 5; i++){
        if(!this.diceArray[i].getSelected()){
            this.diceArray[i].setValue();
        }   
    }
};

/**
 * @memberof Game
 * @function rollCondition
 * @desc determines if a roll can be performed
 * @returns true if the game is not over and the turn has more than 0 rolls left
 * 
 */
Game.prototype.rollCondition = function(){
    return !this.isGameOver() && this.getRolls() > 0;
};

/**
 * @memberof Game
 * @function decrementTurns
 * @desc decrease the number of turns for the game by 1
 * @static
 * 
 */
Game.prototype.decrementTurns = function(){
    this.turns --;
};

/**
 * @memberof Game
 * @function isGameOver
 * @desc determines if the game has any remaining turns
 * @returns true if the game is over, otherwise false
 * 
 */
Game.prototype.isGameOver = function(){
    if(this.getTurns() === 0){
        return true;
    } else {
        return false;
    }
};

/**
 * @memberof Game
 * @function selectDice
 * @param {Number} index location of the selected die in the diceArray
 * @desc highlight the dice to keep it from being rolled next time
 * @static
 * 
 */
Game.prototype.selectDice = function(index){
    if(this.getRolls() < 3){
        this.diceArray[index].setSelected();
    } else {
        this.setWarning("Cannot Select Dice Before First Roll!");
    }
};

/**
 * @memberof Game
 * @function gameOver
 * @desc determine the winner of the game and display to the user
 * @static
 * 
 */
Game.prototype.gameOver = function(){
    if(this.players[0].grandTotal() > this.players[1].grandTotal()){
        this.setWarning(this.players[0].playerName + " Wins!");
    } else {
        this.setWarning(this.players[1].playerName + " Wins!");
    }
};

/**
 * @memberof Game
 * @function endTurn
 * @desc perform the necessary logic to end the turn and start the next
 * @static
 * 
 */
Game.prototype.endTurn = function(){
    if(this.playerTurn.getSelection()){
        this.setScore();
        this.decrementTurns();
        if(!this.isGameOver()){
            this.setPlayerTurn();
            this.setRolls(3);
            this.diceArray = this.initializeDiceArray();
            this.setWarning("");
        } else {
            this.gameOver();
        }
    } else {
        this.setWarning("Please Select a Score!");
    }
};

/**
 * @memberof Game
 * @function endTurnCondition
 * @desc determines if the game is over, no more rolls are left, or if the player has selected a score to keep
 * @returns true if the turn can be completed or false if it can not
 * 
 */
Game.prototype.endTurnCondition = function(){
    return (!this.isGameOver() && this.getRolls() === 0) || (this.playerTurn.selection && this.getRolls() < 3);
};

/**
 * @memberof Game
 * @function totalPlayers
 * @desc determines how many players are setup to play in order to default the number of turns(13 per player)
 * @returns total number of players in the players array
 */
Game.prototype.totalPlayers = function(){
    return this.players.length;
};

/**
 * @memberof Game
 * @function initializeDiceArray
 * @desc setup 5 new Dice object within the diceArray for each turn
 * @returns a newly created diceArray
 */
Game.prototype.initializeDiceArray = function(){
        var diceArray = [];
        for(var i = 0; i < 5; i++){
            diceArray.push(new Dice(6));
        }
        return diceArray;
};

