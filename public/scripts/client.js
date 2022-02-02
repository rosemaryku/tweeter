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

const renderTweets = function (tweets) {
  // console.log(tweets);
  const article = $(`<article class='tweet'></article>`);
  $.each(tweets, (tweet) => {
    article.append(
      $(
        `<header> <div> <img src="` +
          tweets[tweet].user.avatars +
          `"/>` +
          tweets[tweet].user.name +
          `</div><span>` +
          tweets[tweet].user.handle +
          `</span></header>` +
          tweets[tweet].content.text +
          `<footer> 10 days ago <span>
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </span>
        </footer>`
      )
    );
  });

  $(document).ready(function () {
    $(".container").html(article);
  });

  // articles.append(section);

  // const tweetElements = $('<article class="tweet"></article>');

  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
};

// const createTweetElement = function (tweet) {
//   // let $tweet =

//   /* Your code for creating the tweet element */

//   return $tweet;
// };

renderTweets(data);
