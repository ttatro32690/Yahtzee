var express = require('express'),
app = express();

app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get('/', function(req, res){
    res.sendFile('/index.html');
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server is listening");
});