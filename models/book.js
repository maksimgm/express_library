var mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
                   title: String,
                   author: String,
                   year: String
                  });


var Book = mongoose.model("Book", bookSchema);

module.exports = Book;