var express = require("express"),
  app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname+"/public"));

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

var methodOverride = require('method-override');
app.use(methodOverride('_method'));

var db = require("./models");


app.get("/",function(req,res){
  db.Book.find({},function(err,books){
    if(err){
      res.render("404");
      // have an error page .ejs
    } else {
      res.render('index', {books:books});
    }
  });
  // res.render("index",{books: arrBooks});
});

app.get("/books/:id/edit/",function(req,res){
  db.Book.findById(req.params.id, function(err, book){
    if(err){
      res.render("404");
    } else {
      res.render('edit', {book:book});
    }
  });
});

app.put("/books/:id",function(req,res){
  db.Book.findByIdAndUpdate(req.params.id,req.body.book,function(err,book){
    if (err) {
      res.render("404");
    }else {
      res.redirect("/");
    }
  });
});

app.delete("/kill/:id",function(req,res){
  db.Book.findByIdAndRemove(req.params.id, function(err,book){
    if(err){
      res.render("404");
    }else{
      res.redirect("/");
    }
  });
});

app.post("/library",function(req,res){
  db.Book.create(req.body.book,function(err,book){
    if(err){
      var errorText = "Title can't be blank";
      res.render("new", {error: errorText});
    } else {
      res.redirect("/");
    }
  });
});

app.get("/new",function(req,res){
  res.render("new");
});

app.get("/books/:id",function(req,res){
  db.Book.findById(req.params.id, function(err, foundBook){
    if(err){
      res.render("404");
    } else {
      res.render('show', {book:foundBook});
    }
  });
});


app.listen(3000,function(){
  console.log("Got to localhost:3000/");
});