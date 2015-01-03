Template.searchDetail.events({
  'submit #add-iser': function(e){
    e.preventDefault();

    var currentIser = Isers.findOne({iserId: Meteor.userId()});

    var friend = {
      friendId: this._id,
      validated: false
    };

    var friendsList = currentIser.friends

    var notFriendAlready = function(){

      // Used 'f' instead of friends to avoid confusion since we have a friend variable already.  
      return !(friendsList
        .some(function(f){ return f.friendId === friend.friendId; })
      ); 

    }

    if (notFriendAlready()){
      // ADDS FRIEND TO THIS USER'S FRIENDS ARRAY
      Isers.update({_id: currentIser._id}, {$push: {friends: friend}});
      // ADDS THIS USER TO THE FRIEND'S FRIEND REQUEST ARRAY
      Isers.update({_id: this._id}, {$push:{friendRequests: {requesterId: currentIser._id}}}  );
    }

  }

});
