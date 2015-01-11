Template.iserPage.helpers({
  profile: function(field){
    return (Isers.findOne({iserId: Meteor.userId()}))[field];
  },
  showSearchField: function(){
    return !! Session.get('searchField');
  }
});

Template.iserPage.events({
  'click .fa-plus-square-o': function(){
    Session.set('searchField', "show");
  },
  'click .fa-minus-square-o': function(){
    clearSearch();
    Session.set('searchField', "");
  },
  'click .fa-trash': function(){
    var $eachFriend = $('.display-each-friend');

    if ($eachFriend.hasClass('shake')){
      $eachFriend.removeClass('shake');
      $('.fa-trash').removeAttr('style');
      $('.delete-friend-button').remove();
    }else{
      $eachFriend.addClass('shake');
      $('.fa-trash').css('color', 'rgba(40, 75, 130, 0.9)');
      $('.show-username-username').append("<span class='delete-friend-button'><a href='#' style='text-decoration: none'>&times;</a></span>");
    }
  },
  'click .delete-friend-button': function(){
    var iser = Isers.findOne({iserId: Meteor.userId()});
    var username;

    iser.friends.forEach(function(friend){
      if (friend.friendId === this._id){
        username = friend.username
      }
    }, this);

    var deleteFriend = confirm("Are you sure you want to delete "+ username + "?");

    var friendsFriendArr;
    if (deleteFriend === true){
      friendsFriendArr = this.friends.filter(function(friend){
        if(friend.friendId !== iser._id){
          return friend
        }
      }, this)
      Meteor.call('updateUsername', this._id, friendsFriendArr);
    }

    // DELETE FRIEND FROM CURRENT ISER'S FRIENDS LIST
    var iserFriendsArr;
    if (deleteFriend === true){
      friendsArr = iser.friends.filter(function(friend){
        if (friend.friendId !== this._id){
          return friend
        }
      }, this);

      Meteor.call('updateUsername', iser._id, iserFriendsArr);
    }
  }
})
