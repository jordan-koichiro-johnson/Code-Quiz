var timerEl = document.getElementById("countdown");
var goButton = document.getElementById("startButton");
var quiz = document.getElementById("word");
var score = document.getElementById("score");
var incorrectPopup;
var correctPopup;
var correct = "0";
var incorrect = "0";
var initials;

var highscores = [];
// function countdown() {;
//     var timeLeft = 30

//     var timeInterval = setInterval(function () {
//         timerEl.textContent = timeLeft
//         timeLeft--

//         if(timeLeft <= -1) {
//             clearInterval(timeInterval)

//         }
//     })
// }

//create array of questions

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
const questionBank = [
  {
    question: "Which of these The Beatles albums released the latest",
    answers: ["Revolver", "Rubber Soul", "Magical Mystery Tour", "Help!"],
    correctAnswer: 2,
  },
  {
    question: "Which of these The Beatles albums released the latest",
    answers: ["Revolver", "Rubber Soul", "Magical Mystery Tour", "Help!"],
    correctAnswer: 3,
  },
  {
    question: "Which of these The Beatles albums released the latest",
    answers: ["Revolver", "Rubber Soul", "Magical Mystery Tour", "Help!"],
    correctAnswer: 0,
  },
  {
    question: "Which of these The Beatles albums released the latest",
    answers: ["Revolver", "Rubber Soul", "Magical Mystery Tour", "Help!"],
    correctAnswer: 1,
  },
];

goButton.addEventListener("click", (event) => {
  event.preventDefault();
  addSpan(0);
  goButton.style.visibility = "hidden";
});

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
        score.innerHTML =
          "score: " + correct + " correct " + incorrect + "incorrect";

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
        incorrect++;
        quiz.innerHTML = "";
        score.innerHTML =
          "score: " + correct + " correct " + incorrect + "incorrect";

        if (x === questionBank.length - 1) {
          questionDone();
        } else {
          //create next question on click if not last question
          addSpan(x + 1);
        }
      });
    }
  }
}

function questionDone() {
  //end set of questions and show high score
  //TODO: accept initials and restart
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

  formSubmit.appendChild(initials);
  var submit = document.createElement("button");
  submit.setAttribute("type", "button");
  formSubmit.appendChild(submit);
  submit.textContent = "submit";
  initials.textContent = initials;
  var highscoreShow = document.createElement("span");
  highscoreShow.textContent = highscores.map((x) => x.initials);
  highscoreShow.style.background = "Blue";
  highscoreShow.style.color = "white";
  quiz.appendChild(highscoreShow);
  var highscoreScore = document.createElement("span");
  highscoreScore.textContent = highscores.map((x) => x.score);
  highscoreScore.style.background = "red";
  quiz.appendChild(highscoreScore);
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
