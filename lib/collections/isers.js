// ISERS = IS USERS
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



// Meteor.methods({
//   updateFriendsList: function(iserAttributes){
//     var requesterId = iserAttributes.requesterId;
//     var currentIserId = iserAttributes.currentIserId;
//     console.log(requesterId, currentIserId);
//     Isers.update({
//       '_id': 'requesterId',
//       'friends.friendId': 'currentIserId'
//     },{
//       $set:{
//         'friends.$':{
//           'validated': true
//         }
//       }
//     })

//   }
// })

