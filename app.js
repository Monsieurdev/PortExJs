var express = require('express');
var app = express();


app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.send('This is the langind page');
});

app.listen(3000, () => console.log('Server is running!'))