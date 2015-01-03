Template.friendInfo.helpers({
  username: function(){
    var username;
    var friendsArr = Isers.findOne({iserId: Meteor.userId()}).friends;

    var friendId = this._id
    
    friendsArr.forEach(function(friend){
      if (friend.friendId === friendId && friend.validated === true){
        username = friend.username
      }
    })
    return username;
  }
})

Template.friendInfo.events({
  'dblclick .click-username': function(){

    // REMOVE THE CURRENT DIV THAT CONTAINS THE USERNAME
    var idDiv = "#" + this._id;
    var $hideDiv = $(idDiv).find('.show-username');
    var $showDiv = $(idDiv).find('.edit-username');

    $hideDiv.hide();
    $showDiv.show();

  
  },
  'keypress input.change-username': function(e, template){
    if (e.which === 13){
      // VALUE OF THE INPUT FIELD
      var changedUsername = template.find('.change-username').value
 

    // MAKE CHANGES TO THE FRIENDS ARRAY OF USER AND UPDATE IT:
      var currentIserId = (Isers.findOne({iserId: Meteor.userId()}))._id;
      var friendsArr = Isers.findOne({iserId: Meteor.userId()}).friends;
      var thisFriendId = this._id
      
      friendsArr.forEach(function(friend){
        if (friend.friendId === thisFriendId && friend.validated === true){
          friend.username = changedUsername;
        }
      })

      Isers.update({_id: currentIserId}, {$set:{friends: friendsArr}});

      var idDiv = "#" + this._id;
      var $showDiv = $(idDiv).find('.show-username');
      var $hideDiv = $(idDiv).find('.edit-username');

      $hideDiv.hide();
      $showDiv.show();

    }
  }
})

