'use strict';

// Angular App 
var angular;
var Game;
var Scoresheet;

var app = angular.module('angularGamesApp', []);

app.controller('mainController', ['$scope', function($scope){
    
    $scope.roll = function(){
        $scope.game.roll();
    };
    
    $scope.rollCondition = function(){
        return $scope.game.rollCondition();
    };
    
    $scope.endTurn = function(){
        $scope.game.endTurn();
    };
    
    $scope.endTurnCondition = function(){
        return $scope.game.endTurnCondition();
    };
    
    $scope.selectDice = function(index){
        $scope.game.selectDice(index);
    };
    
    $scope.newGame = function(){
        $scope.initializeGame();
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