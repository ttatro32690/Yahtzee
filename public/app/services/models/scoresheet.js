'use strict';

// Scoresheet Constructor

var Scoresheet = function(playerName){
    this.playerName = playerName;
    this.selection = "";
    
    // Upper Section
    this.aces = new Score("Aces", 1, 0, "isSingleScoreValid");
    this.twos = new Score("Twos", 2, 0, "isSingleScoreValid");
    this.threes = new Score("Threes", 3, 0, "isSingleScoreValid");
    this.fours = new Score("Fours", 4, 0, "isSingleScoreValid");
    this.fives = new Score("Fives", 5, 0, "isSingleScoreValid");
    this.sixes = new Score("Sixes", 6, 0, "isSingleScoreValid");
    
    // Lower Section
    this.threeOfKind = new Score('Three of a Kind', 'total', 0, "sameValues");
    this.fourOfKind = new Score('Four of a Kind', 'total', 0, "sameValues");
    this.fullHouse = new Score('Full House', 25, 0, "fullHouse");
    this.smallStraight = new Score('Small Straight', 30, 0, "inSequence");
    this.largeStraight = new Score('Large Straight', 40, 0, "inSequence");
    this.chance = new Score('Chance', 'total', 0, "chance");
    this.yahtzee = new Score('Yahtzee', 50, 0, "sameValues", 0);
    

};

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

Scoresheet.prototype.bonusScore = function(){
    if(this.upperScore() >= 63){
        return 35;
    } else {
        return 0;
    }
};

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

Scoresheet.prototype.upperTotal = function(){
    var value = 0;
    
    value += this.upperScore();
    value += this.bonusScore();
    
    return value;
};

Scoresheet.prototype.grandTotal = function(){
    var value = 0;
    
    value += this.upperTotal();
    value += this.lowerTotal();
    
    return value;
};

// Score Constructor

var Score = function(name, value, score, scoreFunction, selectable){
    this.name = name;
    this.value = value;
    this.score = score;
    this.available = true;
    this.scoreFunction = this[scoreFunction].bind(this);
    this.bonus = 0;
};

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

Score.prototype.inSequence = function(diceArray){
    
    var sequence = this.getSequenceNumber();
    
    var valueArray = [];
    diceArray.forEach(function(dice){
        valueArray.push(dice.value);
    });
    
    var isSequenced = function(){
        var prevValue = 0;
        return valueArray.sort().filter(function(value, index, array){
            if(prevValue + 1 === value){
                prevValue = value;
                return true;
            } else {
                prevValue = value;
                return false;
            }
            
        });
    };
    
    if(isSequenced().length >= sequence){
        return this.value;
    } else {
        return 0;
    }
    
};

Score.prototype.getSequenceNumber = function(){
    var name = this.name;
    
    if('Small Straight' === name){
        return 4;
    } else {
        return 5;
    }
};

Score.prototype.chance = function(diceArray){
    var valueArray = [];
    
    diceArray.forEach(function(dice){
        valueArray.push(dice.value);
    });
    
    return valueArray.reduce(function(a,b){
        return a + b;
    });
};

Score.prototype.bonusCondition = function(){
    if(this.name == "yahtzee" && this.score > 0){
        return this.bonus++;
    }
};



