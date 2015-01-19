Template.friendsList.helpers({
  friends: function(){
    var friendsArr = Isers.findOne({iserId: Meteor.userId()}).friends;
    var validatedFriendsArr = []
    friendsArr.forEach(function(friend){
      if (friend.validated === true){
        validatedFriendsArr.push(friend);
      }
    })

    validatedFriends = []
    validatedFriendsArr.forEach(function(friend){
      var iser = Isers.findOne({_id: friend.friendId})
      validatedFriends.push(iser);
    })

    return validatedFriends;
    
  }
});
