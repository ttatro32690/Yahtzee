'use strict';

/** 
 * @constructor
 * @desc creates a new scoresheet for the player
 * @param {String} playerName literal string of the player's score sheet to instantiate
 * 
 */
var Scoresheet = function(playerName){
    this.playerName = playerName;
    this.selection = "";

    this.aces = new Score("Aces", 1, 0, "isSingleScoreValid");
    this.twos = new Score("Twos", 2, 0, "isSingleScoreValid");
    this.threes = new Score("Threes", 3, 0, "isSingleScoreValid");
    this.fours = new Score("Fours", 4, 0, "isSingleScoreValid");
    this.fives = new Score("Fives", 5, 0, "isSingleScoreValid");
    this.sixes = new Score("Sixes", 6, 0, "isSingleScoreValid");
    
    this.threeOfKind = new Score('Three of a Kind', 'total', 0, "sameValues");
    this.fourOfKind = new Score('Four of a Kind', 'total', 0, "sameValues");
    this.fullHouse = new Score('Full House', 25, 0, "fullHouse");
    this.smallStraight = new Score('Small Straight', 30, 0, "inFourSequence");
    this.largeStraight = new Score('Large Straight', 40, 0, "inFiveSequence");
    this.chance = new Score('Chance', 'total', 0, "chance");
    this.yahtzee = new Score('Yahtzee', 50, 0, "sameValues", 0);

};

/**
 * @memberOf Scoresheet
 * @function getSelection
 * @desc get the current score that is selected
 */
Scoresheet.prototype.getSelection = function(){
    return this.selection;
};

/**
 * @memberOf Scoresheet
 * @function setSelection
 * @desc set the current selection
 * @param {Object} selection
 * @static
 * 
 */
 Scoresheet.prototype.setSelection = function(selection){
     this.selection = selection;
 };

/**
 * @memberOf Scoresheet
 * @function setScore
 * @param {Array} diceArray array of dice
 * @static
 * 
 */
Scoresheet.prototype.setScore = function(diceArray){
        this.selection.setScore(diceArray);
        this.available = false;
        this.selection = "";
};


/**
 * @memberOf Scoresheet
 * @function upperScore
 * @desc calculates the upper region score
 * @static
 * 
 */
Scoresheet.prototype.upperScore = function(){
    var value = 0;
    
    value += this.aces.score;
    value += this.twos.score;
    value += this.threes.score;
    value += this.fours.score;
    value += this.fives.score;
    value += this.sixes.score;
    
    return value;
};

/**
 * @memberOf Scoresheet
 * @function bonusScore
 * @desc determine if the upper total warrants a bonus score
 * @returns 35 if the score is 63 or over or 0
 * 
 */
Scoresheet.prototype.bonusScore = function(){
    if(this.upperScore() >= 63){
        return 35;
    } else {
        return 0;
    }
};

/**
 * @memberOf Scoresheet
 * @function lowerTotal
 * @desc calculates the lower total
 * @returns total value of lower section
 * 
 */
Scoresheet.prototype.lowerTotal = function(){
    var value = 0;
    
    value += this.threeOfKind.score;
    value += this.fourOfKind.score;
    value += this.fullHouse.score;
    value += this.smallStraight.score;
    value += this.largeStraight.score;
    value += this.chance.score;
    value += this.yahtzee.score;
    
    return value;
};

/**
 * @memberOf Scoresheet
 * @function upperTotal
 * @desc determines the upper total with or without the bonus
 * @returns total value of the upper section
 * 
 */
Scoresheet.prototype.upperTotal = function(){
    var value = 0;
    
    value += this.upperScore();
    value += this.bonusScore();
    
    return value;
};

/**
 * @memberOf Scoresheet
 * @function grandTotal
 * @desc determines the total score of the score sheet(upper and lower)
 * @returns total score
 * 
 */
Scoresheet.prototype.grandTotal = function(){
    var value = 0;
    
    value += this.upperTotal();
    value += this.lowerTotal();
    
    return value;
};