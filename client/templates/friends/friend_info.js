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
  'dblclick .username': function(e){
    var username;
    var friendsArr = Isers.findOne({iserId: Meteor.userId()}).friends;

    var friendId = this._id
    
    friendsArr.forEach(function(friend){
      if (friend.friendId === friendId && friend.validated === true){
        username = friend.username
      }
    })

    // REMOVE THE CURRENT DIV THAT CONTAINS THE USERNAME
    var idDiv = "#" + this._id;
    var $removeDiv = $(idDiv).find('.username');
    $removeDiv.empty();

    $removeDiv.append("<input type='text' class='change-username' value='" + username +"'>" ) 
  },
  'keypress input.change-username': function(e, template){
    if (e.which === 13){
      var currentIserId = (Isers.findOne({iserId: Meteor.userId()}))._id;

      var changedUsername = template.find('.change-username').value

      var friendsArr = Isers.findOne({iserId: Meteor.userId()}).friends;
      var friendId = this._id
      
      friendsArr.forEach(function(friend){
        if (friend.friendId === friendId && friend.validated === true){
          friend.username = changedUsername
        }
      })

      Isers.update({_id: currentIserId}, {$set:{friends: friendsArr}});
      var idDiv = "#" + this._id;
      var $removeDiv = $(idDiv).find('.username');
      $removeDiv.empty();

    }
  }
})

