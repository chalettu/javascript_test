

var objects = {};
var foreignKey = 1;

var fakeDb = {
  destroy: async(immutabled(destroy)),
  upsert: async(immutabled(upsert)),
  list: async(immutabled(list)),
  get: async(immutabled(get))
};

function immutabled(func) {
  return function(obj) {
    return clone(func(clone(obj)));
  };
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function async(func) {
  return function(arg, callback) {
    var latency = Math.random() * 100;
    var result;
    try {
      result = func(arg);
      setTimeout(function() {
        callback(null, result);
      }, latency);
      return;
    } catch (err) {
      setTimeout(function() {
        callback(err.toString(), null);
      }, latency);
      return;
    }
  };
}

function list(length) {
  return Object.keys(objects).slice(0, length).map(get);
}

function get(id) {
  if (!objects[id]) {
    throw 'Object does not exist.';
  } else {
    return objects[id];
  }
}

function upsert(obj) {
  if (Object.prototype.toString.call(obj) !== '[object Object]') {
    throw 'You can only create plain objects.'
  } else {
    obj.id = obj.id || foreignKey++;
    objects[obj.id] = obj;
    return obj;
  }
}

function destroy(id) {
  var obj = get(id);
  delete objects[id];
  return obj;
}

module.exports = fakeDb;

