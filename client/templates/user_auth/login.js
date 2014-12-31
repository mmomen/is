Template.signIn.events({
  'submit #signInForm': function(e, t) {
    e.preventDefault();

    var signInForm = $(e.currentTarget);
    var email = trimInput(signInForm.find('.email').val().toLowerCase());
    var password = signInForm.find('.password').val();

    if (isNotEmpty(email) && isEmail(email) && isNotEmpty(password) && isValidPassword(password)) {
      Meteor.loginWithPassword(email, password, function(err) {
        if (err) {
          Session.set('alert', 'We\'re sorry but these credentials are not valid.');
        } else {
          Sesson.set('alert', 'Welcome back New Meteorite!');
        }
      });
    }
    return false;
  },

  'click #showForgotPassword': function(e, t) {
      Session.set('showForgotPassword', true);
      return false;
  },

});

Template.signOut.events({
  'click #signOut': function(e, t) {
    Meteor.logout(function() {
      Session.set('alert', 'Bye Meteorite! Come back whenever you want!');
    });
    return false;
  }
});