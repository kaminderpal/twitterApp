$(document).ready(function (){
  var socket = io();
  $("#sendTweet").click( function(){
    var content = $("#tweet").val();
    if(content.length){
      socket.emit("tweet",{content: content});
      $("#tweet").val('');
    }
  });
});
