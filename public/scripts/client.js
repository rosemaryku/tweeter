/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = function (data) {
  $.each(data, function (tweet) {
    let indPost = createTweetElement(data[tweet]);
    $(".tweets-container").prepend(indPost);
  });
};

const createTweetElement = function (tweet) {
  let $tweet = $(
    `<article class='tweet'>
      <header> <div> <img src="${tweet.user.avatars}"/>${
      tweet.user.name
    }</div><span> ${tweet.user.handle}</span></header>
    <body> ${escape(tweet.content.text)} </body>
    <footer>${timeago.format(tweet.created_at)}<span>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </span>
      </footer></article>`
  );
  return $tweet;
};

$(document).ready(function () {
  // Toggle new tweet section on click
  $(".compose").on("click", () => {
    $(".new-tweet").slideToggle("slow", () => {
      $("#tweet-text").focus();
    });
  });

  // New tweet submission
  $("form").on("submit", function (event) {
    $("#errorOne").slideUp("slow", () => {});
    $("#errorTwo").slideUp("slow", () => {});

    if (!$("textarea").val().length) {
      $("#errorOne").slideDown("slow", () => {});
      return event.preventDefault();
    }

    if ($("textarea").val().length > 140) {
      $("#errorTwo").slideDown("slow", () => {});
      return event.preventDefault();
    }

    event.preventDefault();

    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $(this).serialize(),
    }).then(() => {
      $(".tweets-container").empty();
      loadTweets();
      $("textarea").val("");
      $(".counter").html("140");
    });
  });

  function loadTweets() {
    $.get("/tweets", function (data) {
      renderTweets(data);
    });
  }

  loadTweets();
});
