/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Render tweet object as a jQuery HTML object
const createTweetElement = function (tweet) {
  return $(
  `<article class="tweet">
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
      <time class="timeago" datetime="${new Date(tweet.created_at).toISOString()}"></time>
      <div class="right">
        <i class="flag fab fa-font-awesome-flag"></i>
        <i class="retweet fas fa-retweet"></i>
        <i class="like fas fa-heart"></i>
      </div>
    </footer>
  </article>`
  )
};

const renderTweets = function (tweets) {
  tweets.forEach((tweet) => {
    let $renderedTweet = createTweetElement(tweet);
    $(".tweets").prepend($renderedTweet);
  });
}

// Post tweet via AJAX

const displayErrorMsg = function(message) {
  $("section.sliding p.error")
    .html(`<b>${message}</b>`)
    .parent()
    .slideDown();
};

const validateTweet = function (text, callback) {
  // Slide back prior error messages before validation
  $("section.sliding").slideUp( () => {
    if (text) {
      if (text.length <= 140) {
        return callback();
      }
      return displayErrorMsg("Error! Your tweet is over 140 characters.");
    } 
    return displayErrorMsg("Error! No characters were detected in your tweet.");
  }); 
};

const postTweet = function (tweetText) {
  $.ajax({
    method: 'POST',
    url: '/tweets',
    data: {text: tweetText},
  })
  .then(function (tweet) {
    renderTweets(tweet);
    // Calculate timeago
    $("time.timeago").timeago();
  });
};

// Register click event handler on tweet button
$(function() {
  $('#tweet-button').on('click', function(event) {
    event.preventDefault();
    let tweetText = $("#tweet-text").val();
    // Escape unsafe characters
    tweetText = $("#tweet-text").text(tweetText).html();
    validateTweet(tweetText, () => postTweet(tweetText));
  });
});

// Load tweets via AJAX

const loadTweets = function () {
  $.ajax({
    method: 'GET',
    url: '/tweets'
  })
  .then(function (data) {
    renderTweets(data);
    // Calculate timeago
    $("time.timeago").timeago();
  });
}

$(function() {
  loadTweets();
});

// Navbar Form Toggle
$(() => {  
  // Animate arrows in nav on hover
  $("nav .right-nav")
  .on("mouseenter", function(e) {
    $(this).children("i").addClass("bounce")
  })
  .on("mouseleave", function(e) {
    $(this).children("i").removeClass("bounce")
  })
  // Click handler
  .on("click", function(e) {
    $("section.new-tweet").slideToggle(400)
      .find("#tweet-text").focus();
  });
});

// Misc
$(() => {
  // Hide error bar and new-tweet section on load
  $("section.sliding").hide();
  $("section.new-tweet").hide();
})