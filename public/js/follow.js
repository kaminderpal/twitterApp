$(function(){

  $(document).on("click","#follow", function(e){
    e.preventDefault();

    var userID = $("#userId").val();

    $.ajax({
      url: "/follow/" + userID,
      method: "POST",
      success : function(data){
        $("#follow").removeClass("btn-dark").addClass("btn-primary").html("Following").attr("id","unFollow");
      },
      fail : function(data){
        console.log(data);
      },
    });
});
});