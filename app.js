var express = require("express"),
  app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname+"/public"));

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

var methodOverride = require('method-override');
app.use(methodOverride('_method'));

var morgan = require("morgan");
app.use(morgan('dev'));

var arrBooks = [];

var counter = 0;

var BookList = function (title, author, id, img){
  this.title = title;
  this.author = author;
  this.id = id;
  this.img = img;
};

// renders page with existing books
app.get("/",function(req,res){

  res.render("index",{books: arrBooks});
});

app.get("/modify/:id",function(req,res){
  var bookId = parseInt(req.params.id);

  var specificBook = arrBooks[bookId];
  console.log("APP.GET", specificBook, bookId);
  res.render("modifyBook",{books:specificBook});
  // res.render("modifyBook");
});

app.put("/modify/:id",function(req,res){
    //remove req.param.id from array
    //return to "/"
  var bookTitle = req.body.title;
  var bookAuthor = req.body.author;
  var bookImg = req.body.img;
  arrBooks[parseInt(req.params.id)] = new BookList(bookTitle,bookAuthor,req.params.id, bookImg);
  // arrBooks.push(Book); 
  // console.log("should have", bookTitle,bookAuthor,bookImg);
  // console.log(req);

  // console.log("Shoulve modified:", req.params.id);
  res.redirect("/");
});

app.delete("/kill/:id",function(req,res){
  // var bookTitle = req.body.title;
  // var bookAuthor = req.body.author;
  // var bookImg = req.body.img;
  // Book = new BookList(bookTitle,bookAuthor,counter++, bookImg);
  arrBooks.forEach(function(book){
    if(book.id === Number(req.params.id)){
      arrBooks.splice(arrBooks.indexOf(book),1);
    }
  });
  console.log("ARRBOOKS",arrBooks);
  res.redirect("/");
});

// adds a new book to the array
app.post("/library",function(req,res){
  
  var bookTitle = req.body.title;
  var bookAuthor = req.body.author;
  var bookImg = req.body.img;
  Book = new BookList(bookTitle,bookAuthor,counter++, bookImg);
  arrBooks.push(Book);
  console.log("ARRBOOKS",arrBooks);
  res.redirect("/");
});

app.get("/new_books",function(req,res){
  res.render("new_books");
});

// look up individual books by their assigned id.
// id assignment uses a counter.
app.get("/books/:id",function(req,res){
  var bookId = parseInt(req.params.id);
  var specificBook = arrBooks[bookId];
  res.render("indiv_book",{books:specificBook});
});


app.listen(3000,function(){
  console.log("Got to localhost:3000/");
});