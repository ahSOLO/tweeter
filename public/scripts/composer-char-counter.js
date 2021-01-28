const MAXCHAR = 140;

$(function() {
  $(".new-tweet textarea").on('input', function() {
    let counter = $(this).parent().next().children(".counter");
    counter.html(MAXCHAR - this.value.length);
    if (counter.html() < 0) {
      counter.removeClass("counterUnderLimit");
      counter.addClass("counterOverLimit");
    } else {
      counter.removeClass("counterUnderLimit");
      counter.addClass("counterUnderLimit");
    }
  });
});