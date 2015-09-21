var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/book_app");

module.exports.User = require("./user");
module.exports.Book = require("./book");