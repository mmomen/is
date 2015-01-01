Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {name: 'home'});  
Router.route('/user/:iser_id', {
  name: 'iserPage',
  data: function(){ return this.iser_id }
})

var toHomePage = function(){
  if (!Meteor.user()){
    Router.go('home')
  }else{
    this.next();
  }
}

var toUserPage = function(){
  if (Meteor.user()){
    Router.go('iserPage', {iser_id: Meteor.userId()});
  }else{
    this.next();
  }
}

var createIser = function(){
  if (Isers.find({iserId: Meteor.userId()}) === null){
    Isers.insert({
      iserId: Meteor.userId(),
      status: "hello world!",
      statusAt: new Date(),
      createdAt: new Date()
    })
  }else{
    this.next();
  }
}


Router.onBeforeAction(createIser, {only:['iserPage']})
Router.onBeforeAction(toUserPage, {only:['home']});
Router.onBeforeAction(toHomePage, {only:['iserPage']});