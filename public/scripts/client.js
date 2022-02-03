// Escape function to limit XSS
const esc = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Render all tweets
const renderTweets = function (data) {
  $.each(data, function (tweet) {
    let indPost = createTweetElement(data[tweet]);
    $(".tweets-container").prepend(indPost);
  });
};

// Render ind tweet
const createTweetElement = function (tweet) {
  let $tweet = $(
    `<article class='tweet'>
      <header> <div> <img src="${tweet.user.avatars}"/>${
      tweet.user.name
    }</div><span> ${tweet.user.handle}</span></header>
    <body> ${esc(tweet.content.text)} </body>
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
  $(".nav-btn").on("click", () => {
    $(".new-tweet").slideToggle("slow", () => {
      $("#tweet-text").focus();
    });
  });

  // New tweet submission
  $("form").on("submit", function (event) {
    $("#error-one").slideUp("slow", () => {});
    $("#error-two").slideUp("slow", () => {});
    $("#tweet-text").focus();

    if (!$("textarea").val().length) {
      $("#error-one").slideDown("slow", () => {});
      return event.preventDefault();
    }

    if ($("textarea").val().length > 140) {
      $("#error-two").slideDown("slow", () => {});
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

  // Scroll btn functionality
  $("#scroll-btn").click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });

  // Scroll btn visibility
  $(window).scroll(function () {
    if ($(this).scrollTop()) {
      $("#scroll-btn").fadeIn();
    } else {
      $("#scroll-btn").fadeOut();
    }
  });

  loadTweets();
});
