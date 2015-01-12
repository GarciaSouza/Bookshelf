
var books;

function popularViewBooks() {
  $.get('http://localhost:8182/book', function(data){
    books = data;

    books.forEach(function(t, i){
      var tr = '<tr>';
      tr += '<td>' + t.title + '</td>';
      tr += '<td>' + t.author + '</td>';
      tr += '<td>' + t.isbn + '</td>';
      tr += '<td>' + t.published_date + '</td>';
      tr += '<td>' + t.published_by + '</td>';
      tr += '<td>' + t.keywords + '</td>';
      tr += '</tr>';
      $('#view_books div.grid table tbody').append(tr);
    });
  }, 'json');
}

function saveBook() {
  var newbook = {};
  newbook.title = $('#view_books_form_title').val();
  newbook.author = $('#view_books_form_author').val();
  newbook.isbn = $('#view_books_form_isbn').val();
  newbook.published_date = $('#view_books_form_published_date').val();
  newbook.published_by = $('#view_books_form_published_by').val();
  newbook.keywords = $('#view_books_form_keywords').val();

  $.post('http://localhost:8182/book', newbook, function(data){ popularViewBooks() }, 'json');
}

$(document).ready(function(){
  popularViewBooks();
});