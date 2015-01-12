var bookModel = require('../model/Book');

module.exports.createApi = function BookCreateApi(server) {
  server.get('/book', function(req, res, next){
    bookModel.find(function(err, data){
      if (err)
        res.send(err);
      else
        res.send(data);
      next();
    });
  });

  server.post('/book', function(req, res, next){
    var newbook = new bookModel(req.body);
    newbook.save(function(err, newDoc){
      if (err)
        res.send(err);
      else if (!newDoc)
        res.send(400);
      else
        res.send(201, newDoc);
      next();
    });
  });

  server.get('/book/:id', function(req, res, next){
    bookModel.findById(req.params.id, function(err, doc){
      if (err)
        res.send(err);
      else if (!doc)
        res.send(404);
      else
        res.send(doc);
      next();
    });
  });

  server.put('/book/:id', function(req, res, next){
    bookModel.findByIdAndUpdate(req.params.id, req.body, function(err, updatedDoc){
      if (err)
        res.send(err);
      else if (!updatedDoc)
        res.send(404);
      else
        res.send(updatedDoc);
      next();
    });
    next();
  });

  server.del('/book/:id', function(req, res, next){
    bookModel.findByIdAndRemove(req.params.id, function(err){
      if (err)
        res.send(err);
      else
        res.send(204);
      next();
    });
    next();
  });
};