/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

const renderTweets = function (data) {
  $(document).ready(function () {
    $.each(data, function (tweet) {
      let indPost = createTweetElement(data[tweet]);
      $(".container").append(indPost);
    });
  });
};

const createTweetElement = function (tweet) {
  let $tweet = $(`<article class='tweet'></article>`);
  $tweet.append(
    $(
      `<header> <div> <img src="` +
        tweet.user.avatars +
        `"/>` +
        tweet.user.name +
        `</div><span>` +
        tweet.user.handle +
        `</span></header>` +
        tweet.content.text +
        `<footer> 10 days ago <span>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </span>
      </footer>`
    )
  );
  return $tweet;
};

renderTweets(data);
