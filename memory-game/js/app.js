let seconds = 0, minutes = 0,
    t;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    $(".time").text((minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds));

    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}

timer();

let symbols = ["bicycle", "bicycle", "leaf", "leaf", "cube", "cube", "anchor", "anchor", "paper-plane-o", "paper-plane-o", "bolt", "bolt", "bomb", "bomb", "diamond", "diamond"],
    opened = [],
    match = 0,
    moves = 0,
    $deck = $(".deck"),
    $scorePanel = $("#score-panel"),
    $moveNum = $(".moves"),
    $ratingStars = $("i"),
    $restart = $(".restart"),
    delay = 800,
    perfectGame = symbols.length / 2,
    rank3stars = perfectGame + 4,
    rank2stars = perfectGame + 8,
    rank1stars = perfectGame + 12;

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Initial Game
function initGame() {
  let cards = shuffle(symbols);
  $deck.empty();
  match = 0;
  moves = 0;
  $moveNum.text("0");
  $ratingStars.removeClass("fa-star-o").addClass("fa-star");
  for (let i = 0; i < cards.length; i++) {
    $deck.append($("<li class='card'><i class='fa fa-" + cards[i] + "'></i></li>"))
  }
  addCardListener();
  $(".time").text("00:00");
  seconds = 0;
  minutes = 0;;
};

// Set Rating and final Score
function setRating(moves) {
  let rating = 3;
  if (moves > rank3stars && moves < rank2stars) {
    $ratingStars.eq(2).removeClass("fa-star").addClass("fa-star-o");
    rating = 2;
  } else if (moves > rank2stars && moves < rank1stars) {
    $ratingStars.eq(1).removeClass("fa-star").addClass("fa-star-o");
    rating = 1;
  } else if (moves > rank1stars) {
    $ratingStars.eq(0).removeClass("fa-star").addClass("fa-star-o");
    rating = 0;
  }
  return { score: rating };
};

// End Game
function endGame(moves, score) {
    swal({
    // swal function usage: https://sweetalert.js.org/docs/
    allowEscapeKey: false,
    allowOutsideClick: false,
    title: "Congratulations! You Won!",
    text: "It took you " + moves + " moves and " + $(".time").text() + ". You scored " + score + " stars!",
    type: "success",
    confirmButtonColor: "#02ccba",
    confirmButtonText: "Play again!"
  }).then(function(isConfirm) {
    if (isConfirm) {
      initGame();
    }
  })
}

// Restart Game
$restart.bind("click", function() {
  swal({
    // swal function usage: https://sweetalert.js.org/docs/
    allowEscapeKey: false,
    allowOutsideClick: false,
    title: "Are you sure?",
    text: 'Your progress will be lost!',
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#02ccba",
    cancelButtonColor: "#f95c3c",
    confirmButtonText: "Yes, Restart Game!"
  }).then(function(isConfirm) {
    if (isConfirm) {
      initGame();
    }
  })
});

let addCardListener = function() {

  // Card flip
  $deck.find(".card:not('.match, .open')").bind("click" , function() {

    if($(".show").length > 1) { return true; }

    let $this = $(this),
        card = $this.html();
    $this.addClass("open show");
    opened.push(card);

    // Compare with opened card
    if (opened.length > 1) {
      if (card === opened[0]) {
        // animations from https://daneden.github.io/animate.css/
        $deck.find(".open").addClass("match animated infinite rubberBand");
        setTimeout(function() {
          $deck.find(".match").removeClass("open show animated infinite rubberBand");
        }, delay);
        match++;
      } else {
        $deck.find(".open").addClass("notmatch animated infinite wobble");
        setTimeout(function() {
          $deck.find(".open").removeClass("animated infinite wobble");
        }, delay / 1.5);
        setTimeout(function() {
          $deck.find(".open").removeClass("open show notmatch animated infinite wobble");
        }, delay);
      }
      opened = [];
      moves++;
      setRating(moves);
      $moveNum.html(moves);
    }

    // End Game if match all cards
    if (perfectGame === match) {
      setRating(moves);
      let score = setRating(moves).score;
      setTimeout(function() {
        endGame(moves, score);
      }, 500);
    }

  });

};

initGame();