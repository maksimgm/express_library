var express = require("express"),
  app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname+"/public"));

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

var methodOverride = require('method-override');
app.use(methodOverride('_method'));

var arrBooks = [];

var counter = 0;

function BookList(name, author, id, img){
  this.name = name;
  this.author = author;
  this.id = id;
  this.img = img;
}

// renders page with existing books
app.get("/",function(req,res){

  res.render("index",{books: arrBooks});
});

// adds a new book to the array
app.post("/library",function(req,res){
  var newBookName = req.body.name;
  var newBookAuthor = req.body.author;
  var newBookImg = req.body.img;
  Book = new BookList(newBookName,newBookAuthor,counter++, newBookImg);
  arrBooks.push(Book);
  res.redirect("/");
});

// look up individual books by their assigned id.
// id assignment uses a counter.
app.get("/books/:id",function(req,res){
  var pupId = parseInt(req.params.id);
  var specificBook = arrBooks[pupId];
  res.render("indiv_book",{books:arrBooks});
});


app.get("/new_books",function(req,res){
  res.render("new_books");
});

app.listen(3000,function(){
  console.log("Got to localhost:3000/");
});