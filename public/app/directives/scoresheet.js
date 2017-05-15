'use strict';

var app;

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
