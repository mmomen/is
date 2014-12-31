Template.signIn.events({
  'submit #signInForm': function(e, t) {
    e.preventDefault();

    var signInForm = $(e.currentTarget);
    var email = trimInput(signInForm.find('.email').val().toLowerCase());
    var password = signInForm.find('.password').val();

    if (isNotEmpty(email) && isEmail(email) && isNotEmpty(password) && isValidPassword(password)) {
      Meteor.loginWithPassword(email, password, function(error) {
        if (error) {
          Session.set('alert', 'We\'re sorry but these credentials are not valid.');
        } else {
          Router.go('iserPage', {iser_id: Meteor.userId()})
        }
      });    
    }

  }

});

Template.signOut.events({
  'click #signOut': function(e, t) {
    Meteor.logout(function() {
      Session.set('alert', 'You are now logged out');
      Router.go('home')
    });
    return false;
  }
});