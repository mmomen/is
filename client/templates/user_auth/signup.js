Template.signupForm.events({
  'submit #signup-form': function(e,t){
    e.preventDeafult();

    Accounts.createUser({
      username: t.find('#signup-username').value,
      password: t.find('#signup-password').value,
      email: t.find('#signup-email').value
    }), function(error){
      if (error) {
        alert("SIGN UP ERROR: Please try again")
      }
    }
  }
})