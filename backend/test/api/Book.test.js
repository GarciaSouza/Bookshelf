var assert = require("assert"),
    config = require('config'),
    mongoose = require('mongoose'),
    restify = require('restify'),
    client = restify.createJsonClient({url: 'http://localhost:' + config.port}),
    fork = require('child_process').fork,
    BookApi = require('../../api/Book'),
    BookModel = require('../../model/Book'),
    bookshelf_app = null,
    theDoc = null

mongoose.connect(config.db);

function cleanDb() {
  BookModel.remove({}, function(err){
    if (err) throw err;
  })
}

describe('Book Api', function(){
  before(function(){
    cleanDb();
    bookshelf_app = fork('./index');
  })

  after(function(){
    bookshelf_app.kill('SIGINT');
    //cleanDb();
  })

  describe('#server.get(\'/book\')', function(){
    it('should return empty array when there\'s no item', function(done){
      client.get('/book', function(err, req, res, obj){
        assert.ifError(err);
        assert.equal(res.body, "[]");
        done();
      })
    })
  })

  describe('#server.post(\'/book\')', function(){
    it('should return 201 code and the new doc when sucessfully created', function(done){
      var germanLearnBook = {
        title: 'Alemão Passo a Passo', 
        author: 'Charles Berlitz',
        isbn: '85-336-0996-5',
        published_date: 1998,
        published_by: 'Martins Fontes',
        keywords: ['Alemão', 'Berlitz']
      };

      client.post('/book', germanLearnBook, function(err, req, res, obj){
        theDoc = JSON.parse(res.body);
        assert.ifError(err);
        assert.equal(res.statusCode, 201);
        assert.equal(theDoc instanceof Object, true);
        done();
      })
    })
  })

  describe('#server.put(\'/book/:id\')', function(){
    it('should return updated doc when sucessfully updated', function(done){
      var updatedBook = {
        published_date: 2001,
        published_by: 'Abril',
      };

      client.put('/book/' + theDoc._id, updatedBook, function(err, req, res, obj){
        assert.ifError(err);
        theDoc = JSON.parse(res.body);
        assert.equal(theDoc.published_date, 2001);
        assert.equal(theDoc.published_by, 'Abril');
        done();
      })
    })
  })

  describe('#server.del(\'/book/:id\')', function(){
    it('should return 204 code when sucessfully deleted', function(done){
      client.del('/book/' + theDoc._id, function(err, req, res, obj){
        assert.ifError(err);
        assert.equal(res.statusCode, 204);
        done();
      })
    })
  })
})