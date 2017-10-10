$(".comment-input button").on("click", function () { //on click of button do this

var $comment_text = $(".comment-input input");

if ($comment_text.val() !== "") {
    var $new_comment = $("<p>"); //paragraph tags

    $new_comment.text($comment_text.val()); //adds the input text to the tag
    $new_comment.fadeIn();
    $(".comments").append($new_comment); //adds it all to the .comments selector 
    $comment_text.val(""); //value in input is cleared out. 
}
});

