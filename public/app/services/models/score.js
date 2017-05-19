/**
 * @constructor Score
 * @desc creates a new score type
 * @param {String} name name of the score value
 * @param {Number} value value of the score type, some values are calculated and others are constant
 * @param {Number} score score to initialize the type with
 * @param {Function} scoreFunction function that is used to determine the scores type
 * 
 */
var Score = function(name, value, score, scoreFunction){
    this.name = name;
    this.value = value;
    this.score = score;
    this.available = true;
    this.scoreFunction = this[scoreFunction].bind(this);
    this.bonus = 0;
};

/**
 * @memberOf Score
 * @function setScore
 * @desc set the score value to the provided score value
 * @param {Number} score a score value that is calculated by Score.scoreFunction()
 * @static
 * 
 */
Score.prototype.setScore = function(score){
    this.score = score;
};

/**
 * @memberOf Score
 * @function setAvailable
 * @desc sets the availability of the score
 * @param {Boolean} available a flag to determine if the score has been used
 * @static
 * 
 */
Score.prototype.setAvailable = function(available){
    this.available = available;
};

/**
 * @memberOf Score
 * @function isSingleScoreValid
 * @desc checks to see if a score of a single value is present based on the current dice values
 * @param {Array} diceArray Array of Dice used for the game and to determine the score values
 * @returns a potential score value or the stored score value if the score is no longer available
 * 
 */
Score.prototype.isSingleScoreValid = function(diceArray){
    var scoreValue = 0;
    
    if(this.score > 0){
        return this.score;
    } else {
        for(var i = 0; i < diceArray.length; i++){
            if(diceArray[i].value == this.value){
                scoreValue += this.value;
            }
        }
        
        if(scoreValue){
            return scoreValue;
        } else {
            return 0;
        }
    }
};

/**
 * @memberOf Score
 * @function sameValues
 * @desc checks for 3, 4, or 5 of a kind
 * @param {Array} diceArray Array of Dice used for the game and to determine the score values
 * @returns a potential score value or the stored score value if the score is no longer available
 * 
 */
Score.prototype.sameValues = function(diceArray){
    // called by Yahtzee, 3 of Kind, 4 of Kind

    var valueArray = [];
    var number = this.getNumber();
    
    diceArray.forEach(function(dice){
        valueArray.push(dice.value);
    });
    
    var valueFunction = function(){
        return valueArray.sort().filter(function(value, index, array){
            if((array.lastIndexOf(value) - array.indexOf(value) + 1) >= number){
                return true;
            } else {
                return false;
            }
            
        });
    };
    
    if(valueFunction().length >= number){
        if(this.value === 'total'){
            return valueArray.reduce(function(a,b){
                return a + b;
            });   
        } else {
            return this.value;
        }
    } else {
        return 0;
    }

};

/**
 * @memberOf Score
 * @function getNumber
 * @desc determines how many like values are needed based on the score name. 
 * @returns the number of like values to find
 * 
 */
Score.prototype.getNumber = function(){
    
    var name = this.name;
    
    if('Three of a Kind' == name){
        return 3;
    } else if('Four of a Kind' == name){
        return 4;
    } else {
        return 5;
    }
};

/**
 * @memberOf Score
 * @function fullHouse
 * @desc determines if there are two distinct values with 3 of one type and 2 of another
 * @param {Array} diceArray Array of Dice used for the game and to determine the score values
 * @returns a potential score value or the stored score value if the score is no longer available
 * 
 */
Score.prototype.fullHouse = function(diceArray){
    var valueArray = [];
    
    diceArray.forEach(function(dice){
        valueArray.push(dice.value);
    });
    
    var isFullHouse = function(){
        return valueArray.sort().filter(function(value, index, array){
            
            var likeValues = (array.lastIndexOf(value) - array.indexOf(value) + 1);
            
            if(likeValues >= 2 & likeValues <= 3){
                return true;
            } else {
                return false;
            }
        });
    };
    
    if(isFullHouse().length === 5){
        return this.value;
    } else {
        return 0;
    }
};

/**
 * @memberOf Score
 * @function inFourSequence
 * @desc determines if 4 consecutive numbers are in sequence
 * @param {Array} diceArray Array of Dice used for the game and to determine the score values
 * @returns a potential score value or the stored score value if the score is no longer available
 * 
 */
Score.prototype.inFourSequence = function(diceArray){
    
    var valueArray = [];
    
    diceArray.forEach(function(dice, index){
        if(valueArray.indexOf(dice.value) === -1){
            valueArray.push(dice.value);
        }
    });
    
    var isSequenced = function(){
        var combinations = [[1,2,3,4],[2,3,4,5],[3,4,5,6]];

        return combinations.filter(function(value, index, array){
            return valueArray.sort().toString().includes(value.sort().toString());
        });
    };
    
    if(isSequenced().length > 0){
        return this.value;
    } else {
        return 0;
    }
    
};

/**
 * @memberOf Score
 * @function inFiveSequence
 * @desc determines if 5 consecutive numbers are in sequence
 * @param {Array} diceArray Array of Dice used for the game and to determine the score values
 * @returns a potential score value or the stored score value if the score is no longer available
 * 
 */
Score.prototype.inFiveSequence = function(diceArray){
    
    var valueArray = [];
    diceArray.forEach(function(dice, index){
        valueArray.push(dice.value);
    });
    
    var isSequenced = function(){
        var combinations = [[1,2,3,4,5],[2,3,4,5,6]];

        return combinations.filter(function(value, index, array){
            return value.toString().includes(valueArray.sort().toString());
        });
    };

    if(isSequenced().length > 0){
        return this.value;
    } else {
        return 0;
    }
    
};

/**
 * @memberOf Score
 * @function chance
 * @desc calculates the sum of all dice in play or if the score is no longer available, retrieves the current score
 * @param {Array} diceArray Array of Dice used for the game and to determine the score values
 * @returns a potential score value or the stored score value if the score is no longer available
 * 
 */
Score.prototype.chance = function(diceArray){
    var valueArray = [];
    
    diceArray.forEach(function(dice){
        valueArray.push(dice.value);
    });
    
    return valueArray.reduce(function(a,b){
        return a + b;
    });
};



