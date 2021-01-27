/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1611541589199
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1611627989199
  }
]

// Take a tweet object and return a jQuery object holding the tweet HTML
const createTweetElement = function (tweet) {
  return $(`<article class="tweet">
  <header>
    <div class="left">
      <img src=${tweet.user.avatars} class="avatar">
      <span class="username">${tweet.user.name}</span>
    </div>
    <span class="handle">${tweet.user.handle}</span>
  </header>
  <p>
    <b>${tweet.content.text}</b>
  </p>
  <footer>
    <span class="post-time">${Math.floor((Date.now() - tweet.created_at)/(1000 * 60 * 60 * 24))} days ago</span>
    <div class="right">
      <i class="flag fab fa-font-awesome-flag"></i>
      <i class="retweet fas fa-retweet"></i>
      <i class="like fas fa-heart"></i>
    </div>
  </footer>
</article>`)
}

const renderTweets = function (tweets) {
  tweets.forEach((tweet) => {
    let $renderedTweet = createTweetElement(tweet);
    $(".tweets").prepend($renderedTweet);
  });
}

// Save a Tweet - AJAX Post Request

$(function() {
  $('#tweet-button').on('click', function(event) {
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: {text: $("#tweet-text").val()},
    })
    .then(function () {
      console.log("Saving Tweet!");
    });
  });
});

// Load Tweets - AJAX Get Request

const loadTweets = function () {
  $.ajax({
    method: 'GET',
    url: '/tweets'
  })
  .then(function (data) {
    renderTweets(data);
  });
}

$(function() {
  loadTweets();
});