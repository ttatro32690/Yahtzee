'use strict';

// Angular App 
var angular;
var Game;
var Scoresheet;

var app = angular.module('angularGamesApp', []);

app.controller('mainController', ['$scope', function($scope){
    
    $scope.roll = function(){
        $scope.game.setWarning("");
        $scope.game.decrementRolls();
        $scope.game.rollUnselected();
    };
    
    $scope.endTurn = function(){
        $scope.game.endTurn();
    };
    
    $scope.selectDice = function(index){
        $scope.game.selectDice(index);
    };
    
    $scope.newGame = function(){
        $scope.initializeGame();
    };
    
    $scope.rollCondition = function(){
        return !$scope.game.isGameOver() && $scope.game.rolls > 0;
    };
    
    $scope.endTurnCondition = function(){
        return (!$scope.game.isGameOver() && $scope.game.rolls === 0) || ($scope.game.playerTurn.selection && $scope.game.rolls < 3) ;
    };
    
    $scope.initializeGame = function(){

        $scope.players = [];
        $scope.player1 = new Scoresheet("Player 1");
        $scope.player2 = new Scoresheet("Player 2");
        
        $scope.players.push($scope.player1);
        $scope.players.push($scope.player2);
        
        $scope.game = new Game($scope.players, $scope.players[0]);
    };
    
    $scope.initializeGame();
    
}]);

app.directive('newGame', function(){
    return {
        templateUrl: '/app/templates/newgame.html',
        replace: true,
    };
});

app.directive('scoreSheet', function(){
    return {
        templateUrl: '/app/templates/scoresheet.html',
        replace: true,
        scope: {
            sheet: '=',
            diceArray: '='
        }
    };
});

app.directive('score', function(){
    return {
        templateUrl: '/app/templates/score.html',
        replace: true,
        restrict: 'A',
        scope: {
            selection: "=",
            score: '=',
            diceArray: '='
        },
        link: function(scope, element, attrs){
            element.on('click', function(){
                if(scope.score.available){
                    if(scope.selection){
                        scope.selection = "";
                    }  else {
                        scope.selection = scope.score;
                    }   
                }
                scope.$apply();
            });
        }
    };
});
