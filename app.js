var express = require('express');
var app = express();


app.set("view engine", "ejs");
app.use(express.static('public'));

app.get('/', function(req, res){
	res.render('landing');
});

app.get('/about', function(req, res){
	res.render('about');
})

app.get('/blog', function(req, res){
	res.render('blog');
})

app.get('/blog/new', function(req, res){
	res.render('new');
})


app.listen(3000, () => console.log('Server is running!'))