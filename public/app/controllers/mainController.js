app.controller('mainController', ['$scope', function($scope){
    
    /**
     * @memberOf Yahtzee
     * @function endTurn
     * @desc end turn button functionality
     * @static
     * 
     */
    $scope.endTurn = function(){
        $scope.game.endTurn();
    };
    
    /**
     * @memberOf Yahtzee
     * @function endTurnCondition
     * @desc determines if the end turn button is available
     * @returns true if the user has chosen a score, or if the user doesn't have any more rolls left
     * 
     */
    $scope.endTurnCondition = function(){
        return $scope.game.endTurnCondition();
    };
    
    /**
     * @function initializeGame
     * @desc start a new game by reseting the state
     * @static
     * 
     */
    $scope.initializeGame = function(){
        $scope.players = [];
        
        $scope.players.push(new Scoresheet("Player 1"));
        $scope.players.push(new Scoresheet("Player 2"));
        
        $scope.game = new Game($scope.players, $scope.players[0]);
    };
    
    /**
     * @function newGame
     * @desc functionality for the new game button
     * @static
     * 
     */
    $scope.newGame = function(){
        $scope.initializeGame();
    };
    
    /**
     * @function roll
     * @desc rolls the dice and randomizes their values
     * @static
     * 
     */
    $scope.roll = function(){
        $scope.game.roll();
    };
    
    /**
     * @function rollCondition
     * @desc determines if the dice can be rolled.
     * @returns true if the turn has rolls remaining
     * 
     */
    $scope.rollCondition = function(){
        return $scope.game.rollCondition();
    };
    
    /**
     * @function selectDice
     * @desc allows the user to select or deselect dice giving them the ability to keep certain values
     * @static
     * 
     */
    $scope.selectDice = function(index){
        $scope.game.selectDice(index);
    };
    
    $scope.initializeGame();
    
}]);