var mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
                   title: String,
                   author: String,
                   year: Number
                  });


var Book = mongoose.model("Book", bookSchema);

module.exports = Book;