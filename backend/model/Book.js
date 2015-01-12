var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var bookSchema = new Schema({
  title: String,
  author: String,
  isbn: String,
  published_date: Object,
  published_by: String,
  keywords: Object
}, { collection: 'books' });

module.exports = mongoose.model('Book', bookSchema);