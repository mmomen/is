Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});


// ROUTES:

Router.route('/', {name: 'home', fastRender: true});  

Router.route('/user/:iser_id', {
  name: 'iserPage',
  waitOn:function(){
    return Meteor.subscribe('isers', Meteor.userId());
  },
  data: function(){
    return Isers.findOne({iserId: this.params.iser_id});
  },
  fastRender: true
})

Router.route('/logged_out', {name: 'loggedOut'});



// ROUTE FUNCTIONS:

var toLogOut = function(){
  if (!Meteor.user()){
    clearSearch();
    Session.set('searchField', "");
    Router.go('loggedOut')
  }else{
    this.next();
  }
};

var toIserPage = function(){
  if (Meteor.user()){
    Router.go('iserPage', {iser_id: Meteor.userId()});
  }else{
    this.next();
  }
};

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
};

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
};

var createIser = function(){
  if (Isers.findOne({iserId: Meteor.userId()}) === undefined){
    Meteor.call('createNewIser', function(error, result) {
      if (error){ return alert(error.reason); }
    });
    this.next();
  } else {
    this.next()
  }
};


// ON BEFORE ACTION FOR CONTROL: 
Router.onBeforeAction(toIserPage, {only: 'home'});
Router.onBeforeAction(toIserPage, {only: 'loggedOut'});
Router.onBeforeAction(toLogOut, {only: 'iserPage'});
Router.onBeforeAction(createIser, {only: 'iserPage'});
Router.onBeforeAction(loadFriends, {only: 'iserPage'});
Router.onBeforeAction(loadFriendRequests, {only: 'iserPage'});
Router.onBeforeAction('dataNotFound', {only: 'iserPage'});