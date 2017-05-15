'use strict';

var app;

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