$(".comment-input button").on("click", function () { //on click of button do this
var $new_comment = $("<p>"); //paragraph tags

var comment_text = $(".comment-input input").val(); //takes in the input text

$new_comment.text(comment_text); //adds the input text to the tag

$(".comments").append($new_comment); //adds it all to the .comments selector

});

