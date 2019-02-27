$(document).ready(function (){
  var socket = io();
  $("#sendTweet").submit( function(){
    var content = $("#tweet").val();
    if(content.length){
      socket.emit("tweet",{content: content});
      $("#tweet").val('');
    }
    return false;
  });


  socket.on("incomingTweets", function(tweet){
      var html = getTweetHtml(tweet.user,tweet.data); 
      $("#tweets").prepend(html);
  });
  function getTweetHtml(user,data){
    return "<div class='media mb-3'>"+
                "<a href='/user/"+ user._id+ "' class='media text-black'>"+
                "<img src="+ user.photo +" class='mr-3 align-self-center' width='64px' alt='user photo'>"+
                "<div class='media-body'>"+
                    "<h5 class='mt-0'>"+ user.name +"</h5>"+
                    "<p>"+data.content+"</p>"+
                "</div>" +
                "</a>"+
            "</div>";
  }
});
