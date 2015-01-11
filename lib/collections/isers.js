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


Meteor.methods({
  createNewIser: function(){
    var date = formatTime();

    Isers.insert({
      email: Meteor.user().emails[0].address,
      iserId: Meteor.userId(),
      status: "hello world!",
      statusAt: date,
      friends:[],
      friendRequests:[],
      createdAt: date
    });

  },
  updateStatus: function(id, status){
    var date = formatTime();

    var properties = {
      status: status,
      statusAt: date
    };

    Isers.update(id, {$set: properties});
  },
  updateFriendRequests: function(currentIser, friend){
    // ADDS FRIEND TO THIS USER'S FRIENDS ARRAY
    Isers.update({_id: currentIser._id}, {$push: {friends: friend}});
    // ADDS THIS USER TO THE FRIEND'S FRIEND REQUEST ARRAY
    Isers.update({_id: friend.friendId}, {$push:{friendRequests: {requesterId: currentIser._id}}}  );
  },
  updateAcceptedFriends: function(current, requester){
  // STEP 1:
    // VALIDATE CURRENT ISER IN REQUESTER'S FRIENDS LIST
    requester.friends.forEach(function(v,i){
      if(v.friendId == current.iserId){
        v.validated = true;
      }
    });

    Isers.update({_id: requester.id}, {$set:{friends: requester.friends}});
  // STEP 2:
    // REMOVE FRIEND REQUEST FROM CURRENT ISER'S REQUEST LIST
    Isers.update({_id: current.iserId}, {$pull: {friendRequests: {requesterId: requester.id}}});

  // STEP 3:
    // ADD REQUESTER TO CURRENT ISER'S FRIENDS LIST:
    var currentIserRequested;
    current.friends.forEach(function(friend){
      if(friend.friendId === requester.id && friend.validated === false){
        friend.validated = true;
        currentIserRequested = true;
      }
    })

    // CHECK IF CURRENT ISER ALREADY MADE REQUEST BUT GOT DECLINED (REQUESTER IN FRIEND'S LIST BUT VALIDATION=FALSE)
    if (currentIserRequested){
      Isers.update({_id: current.iserId}, {$set:{friends: current.friends}});
    }else{
      var friend = {
        friendId: requester.id,
        username: requester.email,
        validated: true
      }

      Isers.update({_id: current.iserId}, {$push: {friends: friend}});
    }
  },
  updateDeclinedFriends: function(requesterId, currentIserId){
     Isers.update({_id: currentIserId}, {$pull: {friendRequests: {requesterId: requesterId}}});
  },
  updateUsername: function(currentIserId, friendsArr){
    Isers.update({_id: currentIserId}, {$set:{friends: friendsArr}});
  }

})

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

