var timerEl = document.getElementById("countdown");
var goButton = document.getElementById("startButton");
var quiz = document.getElementById("word");
var score = document.getElementById("score");
var incorrectPopup;
var correctPopup;
var correct = "0";
var incorrect = "0";
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
          //end set of questions and show high score
          //TODO: accept initials and restart
          score.innerHTML = "";
          quiz.innerHTML =
            "score: " + correct + " correct " + incorrect + "incorrect";
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
          //end set of questions and show high score
          //TODO: accept initials and restart
          score.innerHTML = "";
          quiz.innerHTML =
            "score: " + correct + " correct " + incorrect + "incorrect";
        } else {
          //create next question on click if not last question
          addSpan(x + 1);
        }
      });
    }
  }
}
