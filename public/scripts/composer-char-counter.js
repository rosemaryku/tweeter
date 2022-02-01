$(document).ready(function () {
  $("textarea").on("input", function () {
    $(this)
      .parent()
      .find("output")
      .text(140 - this.value.length)
      .toggleClass("red", 140 - this.value.length < 0);
  });
});
