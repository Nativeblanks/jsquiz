
// consts defined
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const submitButton = document.getElementById("submit-btn")
const topScores = document.getElementById("high-score-container");
const playerScore = document.getElementById("playerHighScore");
const userInput = document.getElementById("userInput")
const scoreText = document.getElementById("scoreText")
const highScoreList = document.getElementById("high-scores")
var score = 0;
localStorage.setItem("playerscores", "")
const scoreList = []
var playerScoreList = JSON.parse(localStorage.getItem("playerScores"))

// variables 
let shuffledQuestions, currentQuestionIndex

//  set timer
var count = 90;
var interval = setInterval(function(){
  document.getElementById('timer').innerHTML=count;
  count--;
  if (count < 1 ){
    clearInterval(interval);
    resetState();
    document.getElementById('timer').innerHTML='Out of Time';
  } 
}, 1000);

//  Start button action
startButton.addEventListener('click', startGame)
// next button
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
  countdown()
})

submitButton.addEventListener('click', submitScore);

function submitScore() {
  console.log(userInput.value);
  if(userInput.value.length > 3 || userInput.value.length < 3) {
    alert("It can only be 3 letters");
  } else {
    var initials = userInput.value.toUpperCase();
    var playerData = {"initials": initials, "finalScore": score + count}
     scoreList.push(playerData);
     console.log(scoreList);
     submitButton.classList.add('hide')
     userInput.classList.add('hide')
     playerScore.classList.add('hide')
     scoreText.classList.add('hide')
     if (playerScoreList.length === 0) {
      localStorage.setItem("playerScores", JSON.stringify(scoreList))
      displayHighScores(scoreList)
     }else {   
      localStorage.setItem("playerScores", JSON.stringify(playerScoreList,...scoreList))
      displayHighScores(JSON.parse(localStorage.getItem("playerScores")))
    };
  }
}

function displayHighScores(scores) {
  scores.forEach(player => {
    const li = document.createElement("li");
    li.innerHTML = player.initials + " : " + player.finalScore 
    highScoreList.appendChild(li);
    
  })
}

// start game function
function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
};
// showing and randomizing the question order
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
};

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}
// to clear out previous information before putting the new data on the screen
function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (correct) {
    score += 5
  } else {
    count -= 5
  }
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    submitButton.classList.remove('hide');
    clearInterval(interval);
    questionContainerElement.classList.add('hide');
    topScores.classList.remove('hide');
    var totalScore = score + count;
    console.log(score + count)
    playerScore.innerHTML = totalScore;

  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
    
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}



//  questions and answers available
const questions = [
  {
    question: 'JavaScript and Java are interchangeable',
    answers: [
      { text: 'False', correct: true },
      { text: 'True', correct: false }
    ]
  },
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    answers: [
      { text: '<script>', correct: true },
      { text: '<javascript>', correct: false },
      { text: '<js>', correct: false },
      { text: '<scripting>', correct: false }
    ]
  },
  {
    question: 'How do you write "Hello World" in an alert box?',
    answers: [
      { text: 'msg("Hello World")', correct: false },
      { text: 'alertBox("Hello World")', correct: false },
      { text: 'alert("Hello World")', correct: true },
      { text: 'msgBox("Hello World")', correct: false }
    ]
  },
  {
    question: 'How do you call a function named "myFunction"?',
    answers: [
      { text: 'call function myFunction()', correct: false },
      { text: 'myFunction()', correct: true },
      { text: 'call myfunction()', correct: false },
      { text: 'oh function myFunction', correct: false }
    ]
  }
]