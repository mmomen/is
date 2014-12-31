Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {name: 'home'});  
Router.route('/signup', {name: 'signUp'})
Router.route('/user/:iser_id', {
  name: 'iserPage',
  data: function(){ return this.iser_id }
})