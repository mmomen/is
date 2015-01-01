Meteor.publish('isers', function(iserId) {
  check(iserId, String);
  return Isers.find({iserId: iserId});
});