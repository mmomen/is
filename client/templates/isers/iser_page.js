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

    if ($eachFriend.hasClass('shake') || $('.fa-trash').attr('style')){
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

    var friendsFriendArr, iserFriendsArr;
    if (deleteFriend === true){
      friendsFriendArr = this.friends.filter(function(friend){
        if(friend.friendId !== iser._id){
          return friend
        }
      }, this)
      Meteor.call('updateUsername', this._id, friendsFriendArr);
    }

    // DELETE FRIEND FROM CURRENT ISER'S FRIENDS LIST
    if (deleteFriend === true){
      iserFriendsArr = iser.friends.filter(function(friend){
        if (friend.friendId !== this._id){
          return friend
        }
      }, this);
      Meteor.call('updateUsername', iser._id, iserFriendsArr);
    }
  },
  'click .fa-arrows': function(){
    var $drag = $('.fa-arrows');

    if ($drag.hasClass('drag-on')){
        $drag.removeClass('drag-on');
        $drag.removeAttr('style')
        $('.panel-heading').css('background-color', 'rgba(0, 107, 107, 0.2)');
        $('.testest').sortable( "destroy" ) 
    }else{
      $('.fa-arrows').addClass('drag-on');
      $('.fa-arrows').css('color', 'color: rgba(40, 75, 130, 0.9)')
      $('.panel-heading').css('background-color', 'rgba(40, 75, 130, 0.2)');
      
      $(".testest").sortable({
        connectWith: '.display-each-friend',
        tolerance: "pointer",
        cursor: 'pointer',
        revert: true,
        opacity: 0.7,
        forcePlaceholderSize: true,
        helper: "clone"
      });
    }

  }
})
