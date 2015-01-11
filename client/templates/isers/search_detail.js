Template.searchDetail.events({
  'click .make-friend-request': function(e){
    e.preventDefault();

    var currentIser = Isers.findOne({iserId: Meteor.userId()});

    var friend = {
      friendId: this._id,
      username: this.email,
      validated: false
    };

    var friendsList = currentIser.friends

    var notFriendAlready = function(){
      // Used 'f' instead of friends to avoid confusion since we have a friend variable already.  
      return !(friendsList
        .some(function(f){ return f.friendId === friend.friendId; })
      ); 
    };

    if (notFriendAlready()){ Meteor.call('updateFriendRequests', currentIser, friend); }

  },

});

Template.searchDetail.helpers({
  requestedAlready: function(){

    var requestedFriendId = this._id
    var currentIserFriends = Isers.findOne({iserId: Meteor.userId()}).friends

    // IF I HAVE ALREADY FRIEND REQUESTED THIS ISER, IT WILL RETURN TRUE 
    return (currentIserFriends
      .some(function(friend){ return (friend.friendId === requestedFriendId && friend.validated === false)})
    );
  },
  friendsAlready: function(){
    var requestedFriendId = this._id
    var currentIserFriends = Isers.findOne({iserId: Meteor.userId()}).friends

    // IF I HAVE ALREADY FRIEND REQUESTED THIS ISER, IT WILL RETURN TRUE 
    return (currentIserFriends
      .some(function(friend){ return (friend.friendId === requestedFriendId && friend.validated === true)})
    );
  }
})