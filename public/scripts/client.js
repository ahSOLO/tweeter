/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweet) {
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
  );
};

const renderTweets = function(tweets) {
  tweets.forEach((tweet) => {
    let $renderedTweet = createTweetElement(tweet);
    $(".tweets").prepend($renderedTweet);
  });
};

const displayErrorMsg = function(message) {
  $("section.sliding p.error")
    .html(`<b>${message}</b>`)
    .parent()
    .slideDown();
};

const validateTweet = function(text, callback) {
  // Slide back prior error messages before validation
  $("section.sliding").slideUp(() => {
    if (text.trim()) {
      if (text.trim().length <= 140) {
        return callback();
      }
      return displayErrorMsg("Error! Your tweet is over 140 characters.");
    }
    return displayErrorMsg("Error! No characters were detected in your tweet.");
  });
};

const postTweet = function(tweetText) {
  $.ajax({
    method: 'POST',
    url: '/tweets',
    data: {text: tweetText},
  }).then(function(tweet) {
    renderTweets(tweet);
    $('#tweet-text').val('');
    $("time.timeago").timeago();
  });
};

const newTweetClickHandler = function() {
  $('#tweet-button').on('click', function(event) {
    event.preventDefault();
    let tweetText = $("#tweet-text").val();
    // Escape unsafe characters
    tweetText = $("#tweet-text").text(tweetText).html();
    // Post the tweet if it successfully validates
    validateTweet(tweetText, () => postTweet(tweetText));
  });
};

// Load tweets via AJAX
const loadTweets = function() {
  $.ajax({
    method: 'GET',
    url: '/tweets'
  }).then(function(data) {
    renderTweets(data);
    $("time.timeago").timeago();
  });
};

// Stretch: toggle new tweet
const navToggle = function() {
  $(".right-nav")
  // Speed up nav arrow animations on hover
  .on("mouseenter", function(e) {
    $(this).children("i").addClass("bounce");
  })
  .on("mouseleave", function(e) {
    $(this).children("i").removeClass("bounce");
  })
  // Focus on new-tweet textbox on click
  .on("click", function(e) {
    $("section.new-tweet").slideToggle(400, function() {
      $(this).find("#tweet-text").focus();
    });
  });
};

// Stretch: Scroll to-top button
const topScroll = function() {
  $(document).scroll(function() {
    if ($(window).scrollTop() > 200) {
      $("div.to-top")
      .show(300)
      .on("click", function() {
        $(document).off("scroll");
        $("html, body").stop(true, false).animate({ scrollTop: "0" }, 300, () => {
          $("div.to-top").hide(300);
          $(document).scroll(topScroll);
        });
      });
    }
  });
};

// Initialization
$(() => {
  // Load stored tweets
  loadTweets();
  // Stretch: register event handler for nav toggle and to-top buttons
  navToggle();
  topScroll();
  // Hide error bar, new-tweet section and to-top arrow
  $("section.sliding").hide();
  $("section.new-tweet").hide();
  $("div.to-top").hide();
  // Register event handler for new tweet button
  newTweetClickHandler();
});