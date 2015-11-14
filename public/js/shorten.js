$(document).ready(function() {
  $("#btn-submit").click(function(e) {
    e.preventDefault();

    $.ajax({
      type: "POST",
      url: "/shorten",
      data: $("#form-shortern").serialize()
    })
    .done(function(data, textStatus) {
      console.info(textStatus);
      console.dir(data);
      $(".short-url").html(
        "<p>Short URL: " +
        "<a href=\"/" + data.short_id + "\">" +
        window.location.origin + "/" + data.short_id +
        "</a>" +
        "</p>"
      );
    })
    .fail(function() {
      $(".short-url").html(
        "<p style=\"color: red;\">Something went wrong. Please refresh the page.<br>" +
        "If that does not work, please report to developer.</p>"
      );
    });
  });
});
