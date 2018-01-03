var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express.static('public'));

mongoose.connect("mongodb://localhost/blog_db");
app.use(bodyParser.urlencoded({extended: true}));
var PostSchema = new mongoose.Schema({
	title: String,
	image: String,
	content: String
});

var Post = mongoose.model("Post", PostSchema);

app.get('/', function(req, res){
	res.render('landing');
});

app.get('/about', function(req, res){
	res.render('about');
})

app.get('/blog', function(req, res){
	Post.find({}, function(err, allPosts){
		if(err){
			console.log(err)
		} else {
			res.render("blog", {posts:allPosts});
		}
	});
});


app.post("/blog", function(req, res){
	var title = req.body.title;
	var image = req.body.image;
	var content = req.body.content;
	var newPost = {title: title, image: image, content: content};
	Post.create(newPost, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect("/blog");
		}
	});
});

app.get('/blog/new', function(req, res){
	res.render('new');
})

app.get("/blog/:id", function(req, res){
	Post.findById(req.params.id, function(err, foundPost){
		if(err){
			console.log(err);
		} else {
			res.render("show", {post: foundPost});
		}
	});
});


app.listen(3000, () => console.log('Server is running!'))