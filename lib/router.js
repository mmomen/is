Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {name: 'home'});  

Router.route('/user/:iser_id', {
  name: 'iserPage',
  waitOn:function(){
    return Meteor.subscribe('isers', Meteor.userId())
  },
  data: function(){
    return this.iser_id
  }
})

var toHomePage = function(){
  if (!Meteor.user()){
    Router.go('home')
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

var createIser = function(){
  if (Isers.findOne({iserId: Meteor.userId()}) === undefined){
    Isers.insert({
      email: Meteor.user().emails[0].address,
      iserId: Meteor.userId(),
      status: "hello world!",
      statusAt: new Date(),
      friends:[],
      requests:[],
      createdAt: new Date()
    })
  } else {
    this.next()
  }
}


Router.onBeforeAction(toIserPage, {only: 'home'});
Router.onBeforeAction(toHomePage, {only: 'iserPage'});
Router.onBeforeAction(createIser, {only: 'iserPage'});