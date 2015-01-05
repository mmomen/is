Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.route('/', {name: 'home'});  

Router.route('/user/:iser_id', {
  name: 'iserPage',
  waitOn:function(){
    return Meteor.subscribe('isers', Meteor.userId());
  },
  data: function(){
    return this.iser_id
  }
})

Router.route('/logged_out', {name: 'loggedOut'});


var toLogOut = function(){
  if (!Meteor.user()){
    clearSearch();
    Session.set('searchField', "");
    Router.go('loggedOut')
  }else{
    this.next();
  }
}

var toIserPage = function(){
  if (Meteor.user()){
    Router.go('iserPage', {iser_id: Meteor.userId()});
  }else{
    this.next();
  }
}

var loadFriendRequests = function(){
  if (Meteor.user()){
    var friendRequests = Isers.findOne({iserId: Meteor.userId()}).friendRequests;
    friendRequests.forEach(function(request){
      Meteor.subscribe('requests', request.requesterId)
    });
    this.next();
  }else{
    this.next();
  }
}

var loadFriends = function(){
  if (Meteor.user()){
    var friendsArray = Isers.findOne({iserId: Meteor.userId()}).friends;
    friendsArray.forEach(function(friend){
      if (friend.validated === true){
        Meteor.subscribe('friends', friend.friendId)
      }
    });
    this.next();
  }else{
    this.next();
  }
}

var createIser = function(){
  if (Isers.findOne({iserId: Meteor.userId()}) === undefined){
    var date = formatTime();

    Isers.insert({
      email: Meteor.user().emails[0].address,
      iserId: Meteor.userId(),
      status: "hello world!",
      statusAt: date,
      friends:[],
      friendRequests:[],
      createdAt: date
    })
    this.next();
  } else {
    this.next()
  }
}

Router.onBeforeAction(toIserPage, {only: 'home'});
Router.onBeforeAction(toIserPage, {only: 'loggedOut'});
Router.onBeforeAction(toLogOut, {only: 'iserPage'});
Router.onBeforeAction(createIser, {only: 'iserPage'});
Router.onBeforeAction(loadFriends, {only: 'iserPage'});
Router.onBeforeAction(loadFriendRequests, {only: 'iserPage'});