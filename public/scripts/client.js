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
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

// Return the HTML for a tweet article, given the object

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
    let renderedTweet = createTweetElement(tweet);
    $(".tweets").prepend(renderedTweet);
  });
}


$(function() {
  renderTweets(data);
});
