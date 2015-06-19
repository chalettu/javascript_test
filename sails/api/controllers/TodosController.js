/**
 * TodosController
 *
 * @description :: Server-side logic for managing todos
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var db=require ('../../fake_db/fake_db.js');

module.exports = {
	create:function(req,res){
    var params=req.params.all();
    db.upsert(params, function(err,record){

      return res.json(record);
    });

  },
  find:function(req,res){
    db.list(10, function(err, records) {
      return res.json(records);
    });
  },
  findOne: function(req,res){
    var id=req.params.id;
    db.get(id, function(err,record){

      return res.json(record);
    });

  },
  update:function(req,res){
    var params=req.params.all();
    db.upsert(params, function(err,record){

      return res.json(record);
    });

  },
  destroy:function(req,res){
    var params=req.params.all();

   var id=params.id;

    db.destroy(id, function(err,record){

      return res.json({"status":"success"});
    });

  }



};

