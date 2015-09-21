var express = require("express"),
  app = express();

app.set("view engine", "ejs");

var bodyParser = require("body-parser");
var methodOverride = require('method-override');
var db = require("./models");
var request = require('request');
var session = require("cookie-session");
var loginMiddleware = require("./middleware/loginHelper");
var routeMiddleware = require("./middleware/routeHelper");
var session = require("cookie-session");

app.use(express.static(__dirname+"/public"));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  maxAge: 3600000,
  secret: 'illnevertell',
  name: "chocolate chip"
}));

var url = "https://www.googleapis.com/books/v1/volumes?q=";

app.get("/",function(req,res){
  db.Book.find({},function(err,books){
    if(err){
      res.render("404");
      // have an error page .ejs
    } else {
      res.render('index', {books:books});
    }
  });
  // var bookData = JSON.parse(body);
  // res.render("index",{books: arrBooks});
});


app.get("/search",function(req,res){
  request.get(url+ req.query.search, function(error,response,body){
    if(!error && response.statusCode === 200){
      var bookData = JSON.parse(body);
      console.log(bookData);
      console.log(results);
      var results = "Title: " +bookData.items[0].volumeInfo.title + "<br>" + "Author: " +bookData.items[0].volumeInfo.authors[0]+ "<br>"+ "Year: "+ bookData.items[0].volumeInfo.publishedDate+ "<br>"+ "ISBN: "+ bookData.items[0].volumeInfo.industryIdentifiers[0].identifier;
      res.render("search",{bookData:bookData.items});
    }
  });
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

app.get("/books/:id",function(req,res){
  db.Book.findById(req.params.id, function(err, foundBook){
    if(err){
      res.render("404");
    } else {
      res.render('show', {book:foundBook});
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

// app.post("/",function(req,res){
//   db.Book.create(req.body.,function(err,book){

//   });
// });

app.post("/library",function(req,res){
  db.Book.create(req.body.book,function(err,book){
    if(err){
      var errorText = "Title can't be blank";
      res.render("new", {error: errorText});
    } else {
      console.log(book);
      res.redirect("/");
    }
  });
});

app.get("/new",function(req,res){
  res.render("new");
});



app.listen(3000,function(){
  console.log("Got to localhost:3000/");
});