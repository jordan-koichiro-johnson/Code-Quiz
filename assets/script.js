var timerEl = document.getElementById("countdown");
var goButton = document.getElementById("startButton");
var quiz = document.getElementById("word");
var score = document.getElementById("score");
var incorrectPopup;
var correctPopup;
var correct = "0";
var incorrect = "0";
var initials;
var secondsLeft = 50;
var highscores = [];

//todo set time

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function () {
    // var timeSeconds = document.createTextNode("Timer: " + secondsLeft);
    // timerEl.appendChild(timeSeconds);
    secondsLeft--;
    timerEl.textContent = "timer: " + secondsLeft;
    
    if (secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      timerEl.remove();
      questionDone();
    }
  }, 1000);
}

//initializae array of high scores from local storage

if (window.localStorage.getItem("score0") === null) {
  window.localStorage.setItem("initials0", "none");
  window.localStorage.setItem("score0", "0");
} else {
  for (n = 0; n < 3; n++) {
    if (window.localStorage.getItem("initials" + n) === null) {
    } else {
      highscores.push({
        initials: window.localStorage.getItem("initials" + n),
        score: window.localStorage.getItem("score" + n),
      });
    }
  }
}

// array of questions

const questionBank = [
  {
    question: "Which of these The Beatles albums released the latest",
    answers: ["Revolver", "Rubber Soul", "Magical Mystery Tour", "Help!"],
    correctAnswer: 2,
  },
  {
    question: "Which of these Kendrick Lamar albums released the latest",
    answers: [
      "good kid, m.A.A.d city",
      "Section.80",
      "DAMN.",
      "To Pimp A Butterfly",
    ],
    correctAnswer: 3,
  },
  {
    question: "Which of these Michael Jackon albums released the latest",
    answers: ["Dangerous", "Thriller", "Bad", "Off The Wall"],
    correctAnswer: 0,
  },
  {
    question: "Which of these Weezer albums released the latest",
    answers: ["Green Album", "White Album", "Hurley", "Blue Album"],
    correctAnswer: 1,
  },
  {
    question: "Which of these David Bowie albums released the latest",
    answers: [
      "The Rise and Fall of Ziggy Stardust and the Spiders from mMrs",
      "Blackstar",
      "Let's Dance",
      "Low",
    ],
    correctAnswer: 1,
  },
];

// create quiz on press

goButton.addEventListener("click", (event) => {
  event.preventDefault();
  setTime();
  addSpan(0);
  goButton.style.visibility = "hidden";
});

// create a span with the question and buttons in it.

function addSpan(x) {
  var questionSpan = document.createElement("span");
  quiz.appendChild(questionSpan);
  questionSpan.textContent = questionBank[x].question;
  for (i = 0; i < questionBank[x].answers.length; i++) {
    if (i === questionBank[x].correctAnswer) {
      //create correct buttons
      correctPopup = document.createElement("button");
      quiz.appendChild(correctPopup);
      correctPopup.textContent = questionBank[x].answers[i];
      //create event listener on created buttons
      correctPopup.addEventListener("click", (event) => {
        event.preventDefault();
        correct++;
        quiz.innerHTML = "";
        //show current score
        score.innerHTML = "score: " + correct + " correct " + incorrect + "incorrect";

        if (x === questionBank.length - 1) {
          questionDone();
        } else {
          //create next question on click if not last question
          addSpan(x + 1);
        }
      });
    } else {
      //create incorrect buttons
      incorrectPopup = document.createElement("button");
      quiz.appendChild(incorrectPopup);
      incorrectPopup.textContent = questionBank[x].answers[i];
      //create event listener on created buttons
      incorrectPopup.addEventListener("click", (event) => {
        event.preventDefault();
        secondsLeft = secondsLeft - 5;
        if (secondsLeft <= 0) {
          secondsLeft = 1;
        }
        incorrect++;
        quiz.innerHTML = "";
        score.innerHTML = "score: " + correct + " correct " + incorrect + "incorrect";

        if (x === questionBank.length - 1) {
          // questionDone();
          secondsLeft = 1;
        } else {
          //create next question on click if not last question
          addSpan(x + 1);
        }
      });
    }
  }
}

// create high score page and accept initials.

function questionDone() {
  //end set of questions and show high score
  //accept initials and restart

  score.innerHTML = "";
  quiz.innerHTML = "score: " + correct + " correct " + incorrect + "incorrect";
  var formSubmit = document.createElement("form");
  quiz.appendChild(formSubmit);
  initials = document.createElement("input");
  initials.value = "Initials";
  initials.setAttribute("type", "input");
  initials.onfocus = function () {
    initials.value = "";
  };
  var brea = document.createElement("br");
  formSubmit.appendChild(initials);
  var submit = document.createElement("button");
  submit.setAttribute("type", "button");
  formSubmit.appendChild(submit);
  submit.textContent = "submit";
  initials.textContent = initials;
  var highTitle = document.createElement("span");
  highTitle.textContent = "High Scores";
  quiz.appendChild(highTitle);
  quiz.appendChild(brea);
  for (p = 0; p < highscores.length; p++) {
    var highscoreShow = document.createElement("span");
    highscoreShow.textContent = highscores[p].initials + ": ";

    quiz.appendChild(highscoreShow);
    var highscoreScore = document.createElement("span");
    highscoreScore.textContent = highscores[p].score;

    quiz.appendChild(highscoreScore);
    var brea1 = document.createElement("br");
    quiz.appendChild(brea1);
  }
  submit.addEventListener("click", (event) => {
    event.preventDefault();
    highscores.unshift({
      initials: initials.value,
      score: correct,
    });
    highscores.sort((x, y) => (y.score > x.score ? 1 : -1));
    console.log(highscores);

    if (highscores.length > 3) {
      highscores.pop();
    }
    for (i = 0; i < highscores.length; i++) {
      window.localStorage.setItem("initials" + i, highscores[i].initials);
      window.localStorage.setItem("score" + i, highscores[i].score);
    }
    console.log(highscores);

    location.reload();
  });
}
