'use strict';

var app;

app.directive('newGame', function(){
    return {
        templateUrl: '/app/templates/newgame.html',
        replace: true,
    };
});