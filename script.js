// Need to create variables for holding score of quiz
// need Variables .getElementById for html 
// 
// need to create questions for quiz in Array with objects for question and answers

//use bootstrap to style the page
//each question as an object with  answers to access.
//  need to create a function that runs for each question with 3 or 4 buttons.
// 
// need to set a timer for quiz in JS
// 

//When a question shows up on screen there needs to be a multiple choice of answers
// a wrong answer on the quiz will take time from the clock
// when all questions are answered or the timer reaches 0 the game is over
// show score and let user save initials 

var quizContainer = document.getElementById('quiz-container');
var resultsContainer = document.getElementById('results');
var startQuiz = document.getElementById("startQuiz")
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var quizTimer = document.getElementById("quizTimer");
var answerButton = document.getElementsByClassName("answerButton");

var myQuestions = [
    {
        question: "DOM stands for ____",
        answers: ["A: Document Object Model ", " B: Document Operation Method ", " C: Download Object Model "],
        correctAnswer: "a"
    },
    {
        question: "Functions are code that _____",
        answers: ["A: Hide Code ", "B: Runs code over and over ", "C: creates a loop of code "],
        correctAnswer: "b"
    },
    {
        question: "HTML stands for _____",
        answers: ["A: Hyper Threat Management Level ", "B: Happy Text Making Language ", "C: Hyper Text Markup Language"],
        correctAnswer: "c"
    }
];
var finalQuestionIndex = myQuestions.length;
var currentQuestionIndex = 0;
var score = 0;
var timeLeft = 45;
var timerInterval;
var i = 0;
// event listener to start the game
startQuiz.addEventListener("click", start);
// Function to start the game and timer
function start() {
    startQuiz.style.display = "none";
    timerInterval = setInterval(function () {
        timeLeft--;
        // console.log(timeLeft)
        quizTimer.textContent = "Time Left: " + timeLeft;
        if (timeLeft <= 0) {
            endGame()
        }
    }, 1000)
    nextQ();
}
// function to call the next question in the object
function nextQ() {
    document.getElementById("answer").innerHTML = "";
    var q = " Question: " + myQuestions[i].question;
    document.getElementById("q").innerHTML = q;
    for (var j = 0; j < myQuestions[i].answers.length; j++) {
        var a = myQuestions[i].answers[j];
        document.getElementById("answer").append(a);
    }


}
//function to test answers 
function testAnswer(val) {
    console.log(val)
    if (val === myQuestions[i].correctAnswer) {
        alert("correct")
        i++;
        score++;
        document.getElementById("answer").textContent = resultsContainer;
        checkScore();

    } else {
        alert("wrong")
        i++;
        timeLeft -= 10;
        checkScore();
    }
}

//function to check score or end game
function checkScore() {
    if (i == 3) {
        endGame();
    } else {
        nextQ()
    }
}
// the function to end the game and run the high scores function
function endGame() {
    clearInterval(timerInterval);

    document.getElementById("answer").innerHTML = "";
    document.getElementById("q").innerHTML = "";
    alert("game over your time left: " + timeLeft)
    i = 0;
    var initials = prompt("enter your initials: ")
    console.log(initials)
    if (initials != null) {
        var score = timeLeft
        var highScores = JSON.parse(localStorage.getItem("highScores")) || []

        var storeHighScore = {
            score,
            initials
        }
        highScores.push(storeHighScore)
        localStorage.setItem("highScores", JSON.stringify(highScores))

    }
    timeLeft = 45;
    ViewHighScores()

}

//function to view high scores and run a play again button shows
function ViewHighScores() {
    document.getElementById("highScores").innerHTML = "";
    var scores = JSON.parse(localStorage.getItem("highScores"))
    scores.forEach(function (score) {
        var list = document.createElement("li");
        list.textContent = score.initials + " : " + score.score
        document.getElementById("highScores").appendChild(list)

    });
    var playAgain = document.createElement("button")
    playAgain.textContent = "Play Again!"
    playAgain.onclick = start
    document.getElementById("highScores").appendChild(playAgain)
}


