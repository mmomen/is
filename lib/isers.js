// isers = is users

Isers = new Mongo.Collection('isers');

Isers.allow({
  insert: function(userId, doc) {
    // only allow creation if you are logged in
    return !! userId;
  },
  update: function(userId, doc) {
    return !! userId;
  }
});

