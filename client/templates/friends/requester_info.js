Template.requesterInfo.helpers({
  email: function(){
    if (Isers.findOne({_id: this.requesterId}) !== undefined){
      return Isers.findOne({_id: this.requesterId}).email;
    }
  },
  lastStatus: function(){
    if (Isers.findOne({_id: this.requesterId}) !== undefined){
      return Isers.findOne({_id: this.requesterId}).statusAt;
    }
  }
})