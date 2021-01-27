/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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

const validateTweet = function (text) {
  if (text) {
    if (text.length <= 140) {
      return true;
    }
    return false;
  } 
  return null;
};

$(function() {
  $('#tweet-button').on('click', function(event) {
    event.preventDefault();
    let tweetText = $("#tweet-text").val();
    tweetText = $("#tweet-text").text(tweetText).html();
    let validation = validateTweet(tweetText);
    if (validation === null) return alert("Your tweet is not present!");
    if (validation === false) return alert("Your tweet is too long!");
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: {text: tweetText},
    })
    .then(function (tweet) {
      renderTweets(tweet);
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