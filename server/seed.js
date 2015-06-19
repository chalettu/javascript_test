

/*
  All requests follow this format...:

  db.ACTION(param, function(err, data) {
    // err will be null if no error.
    // data will be null if error.
  });

  Actions:
  list(count, callback) => sends array objects.
    count sets max number of returned objects.

  upsert(hash, callback) => Upserts and sends upserted object.
    The "id" field will have an integer value.
    If you provided an ID for an existing object, it is an update operation.
    If you do not provide an ID, it is a create operation.

  destroy(id, callback) => Destroys and sends the destroyed object. 
    The "id" is the generated "id" property on the object to destroy.

  get(id, callback) => Gets/sends an object.
    The "id" is the generated "id" property on the object to get.


  Error conditions:
  "get" and "destroy" will send errors if the object with that "id" has been
  destroyed, or was never created.

  "upsert" will send errors if the passed "hash" is not a plain Object.

*/


var db = require('./fake_db');



// Create an object.
db.upsert({
  name: 'Walk Dog',
  // Due in one hour from now
  due: Date.now() + 1000 * 60 * 60,
  description: 'Fido needs to blow off some steam.'
}, function(err, data) {
  // Noop this time, but data holds the upserted object.

  db.upsert({
    name: 'Work Out'
  }, function(err, data) {

    db.upsert({
      name: 'Sleeeeep.',
      description: 'DFSDFKGJSDFGDLFGJ'
    }, function(err, data) {

      db.list(100, function(err, list) {

        // destroy a random to-do
        var randomIndex = Math.floor(Math.random() * list.length);
        var randomId = list[randomIndex].id;
        db.destroy(randomId, function(err, data) {

          // Now we see get fails
          db.get(randomId, function(err, data) {

            // This is true, we tried to get the deleted object.
            if (err) {
              console.log('Sample seed for DB is done.');
              db.list(100, function(err, data) {
                console.log(data);
              });
            }
  
          });

        });

      });

    });

  });

});








