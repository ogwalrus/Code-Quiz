var startQuizBtn = document.getElementById("startQuizBtn");
var timerSpan = document.getElementById("timerspan");
var mainEl = document.querySelector("main");
var buttons = document.querySelectorAll("button");
var time = 60;
var currentQuestionIndex = 0;
// var uChoices = document.getElementById("userChoices");
var questionTitleEl = document.querySelector(".qtitle");
var userBtnsEl = document.getElementById("choice-btns");
var scoreInitialsEl = document.querySelector("#initials");

var questionsArray = [
  {
    question: "A name of storage location",
    choice: ["operator", "array", "variable", "function"],
    correctChoice: "array",
  },
  {
    question: "A block of code designed to perform a particular task.",
    choice: ["variable", "function", "for loop", "syntax"],
    correctChoice: "function",
  },
  {
    question: "loops through a block of code a number of times",
    choice: ["variable", "function", "for loop", "syntax"],
    correctChoice: "for loop",
  },
  {
    question: 'What is this called? "++"',
    choice: ["decrement", "modulus", "addition", "increment"],
    correctChoice: "increment",
  },
  {
    question: "Which of these are JavaScript operators",
    choice: ["Arithmetic", "Logical", "Type", "All of these above"],
    correctChoice: "All of these above",
  },
];

function choiceClick(event) {
  console.log(event);
  var btnClicked = event.target;
  // console.log(event.target.innerText);
  // console.log(event.target.textContent);
  // console.log(questionsArray[0].correctChoice);
  if (
    btnClicked.textContent ===
    questionsArray[currentQuestionIndex].correctChoice
  ) {
    currentQuestionIndex = currentQuestionIndex + 1;
  } else {
    time = time - 15;
  }
  if (currentQuestionIndex >= questionsArray.length) {
    endQuiz();
  }
  if (time <= 0) {
    endQuiz();
  }
  userBtnsEl.textContent = "";
  renderQuestionToScreen(questionsArray[currentQuestionIndex]);
}

function renderQuestionToScreen(questionsArray) {
  console.log("renderQuestionToScreen");
  var questionHeader = document.createElement("h3");
  console.log(questionHeader);
  questionHeader.textContent = questionsArray.question;
  var questionList = document.createElement("ul");
  questionList.addEventListener("click", choiceClick);
  // console.log(questionObject);
  for (var i = 0; i < questionsArray.choice.length; i++) {
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("style", "display:block;");
    console.log(questionsArray.choice[i]);
    choiceBtn.textContent = questionsArray.choice[i];
    // console.log(questionList);
    questionList.append(choiceBtn);
    // console.log(questionList);
    choiceBtn.setAttribute("value", questionsArray.choice[i]);
    // choiceBtn.onclick = checkAnswer;
  }
  userBtnsEl.append(questionHeader, questionList);
}

startQuizBtn.addEventListener("click", function () {
  console.log("startbtnwasclicked");
  startTimer();
  console.log(questionsArray[currentQuestionIndex]);
  renderQuestionToScreen(questionsArray[currentQuestionIndex]);
});

function startTimer() {
  var intervalId = setInterval(function () {
    console.log(`Time left is ${time} sec`);
    timerSpan.textContent = time;
    time--;
    if (time <= 0 || currentQuestionIndex >= questionsArray.length) {
      clearInterval(intervalId);
      endQuiz();
    }
  }, 1000);
}


function endQuiz() {
  console.log("endQuiz");
  var quizEl = document.querySelector(".quiz");
  var highScoreEl = document.querySelector(".highscore");
  quizEl.setAttribute("style", "display: none");
  highScoreEl.setAttribute("style", "display: block");
  document.getElementById("score").textContent = time;
  var content = `
  <input type='text' id='name' placeholder='Enter your name'><br/>
  <button onclick='saveScore()'>Submit</button><br/>`;
  document.getElementById('scorebody').innerHTML = content;
}

function saveScore () {

  localStorage.setItem('saveScore', time);
  localStorage.setItem('highScoreInput', document.getElementById('name').value);
  viewScore();
}

function viewScore() {
  let content = 
  `<h2>` + localStorage.getItem('highScoreInput') + `'s highscore is: </h2>
  <h3>` + localStorage.getItem('saveScore') + `</h3><br/>
  
  <button onclick='clearScore()'>Clear Score</button> <button onclick='resetQuiz()'>Try Again</button>`;
  document.getElementById('scorebody').innerHTML = content;
 
}
function clearScore () {
  localStorage.setItem('saveScore', '');
  localStorage.setItem('highScoreInput', '');
  resetQuiz();
}
function resetQuiz() {
  clearInterval(time);
  time = 60;
  currentQuestionIndex = -1;
  window.location.href = "./index.html";
}

document.getElementById('submit-btn').onclick = saveScore();
