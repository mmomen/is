Template.forgotPassword.events({
  'submit #forgotPasswordForm': function(e, t) {
    e.preventDefault();

    var forgotPasswordForm = $(e.currentTarget);
    var email = trimInput(forgotPasswordForm.find('#forgotPasswordEmail').val().toLowerCase());

    if (isNotEmpty(email) && isEmail(email)) {
      Accounts.forgotPassword({email: email}, function(err) {
        if (err) {
          if (err.message === 'User not found [403]') {
            Session.set('alert', 'This email does not exist.');
          } else {
            Session.set('alert', 'We\'re sorry but something went wrong.');
          }
        } else {
          Session.set('alert', 'Email Sent. Please check your mailbox to reset your password.');
        }
      });
    }
    return false;
  },

  'click #returnToSignIn': function(e, t) {
      Session.set('showForgotPassword', null);
      return false;
  },
});


Template.resetPassword.events({
    'submit #resetPasswordForm': function(e, t) {
        e.preventDefault();
        
        var resetPasswordForm = $(e.currentTarget),
            password = resetPasswordForm.find('#resetPasswordPassword').val(),
            passwordConfirm = resetPasswordForm.find('#resetPasswordPasswordConfirm').val();

        if (isNotEmpty(password) && areValidPasswords(password, passwordConfirm)) {
            Accounts.resetPassword(Session.get('resetPassword'), password, function(err) {
                if (err) {
                    Session.set('alert', {type: 'error', message: 'We\'re sorry but something went wrong.'});
                }
                else {
                    Session.set('alert', 'Your password has been changed. Welcome back!');
                    Session.set('resetPassword', null);
                }
            });
        }
        return false;
    }
});