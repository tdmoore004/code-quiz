// Variables
const codeQuizHead = document.querySelector(".code-quiz-header");
const highScoreHead = document.querySelector(".high-score-header");
const timeDisplay = document.querySelector(".time-display");
const startButton = document.querySelector("#start-button");
const questionsStart = document.querySelector("#question1")
const startSection = document.querySelector("#startsection");
const completeSection = document.querySelector("#complete");
const questionButton = document.querySelector(".question-button");
const scoreTime = document.querySelector(".score-time");
const initialInput = document.querySelector("#highscore-initials");
const scoreSubmit = document.querySelector("#highscore-submit");
let allScores = [];

let totalSeconds = 60
let secondsElapsed = 0

// Function for formatting the minutes.
function getFormattedMinutes() {

    var secondsLeft = totalSeconds - secondsElapsed;
    var minutesLeft = Math.floor(secondsLeft / 60);
    var formattedMinutes = minutesLeft;

    return formattedMinutes;
}

// Function for formatting the seconds.
function getFormattedSeconds() {

    var secondsLeft = (totalSeconds - secondsElapsed) % 60;
    var formattedSeconds;

    if (secondsLeft < 10) {
        formattedSeconds = "0" + secondsLeft;
    } else {
        formattedSeconds = secondsLeft;
    }

    return formattedSeconds;
}

// Function for setting time.
function setTime() {
    timeDisplay.textContent = getFormattedMinutes() + ":" + getFormattedSeconds();

    if (secondsElapsed >= totalSeconds) {
        clearInterval(interval);
    }

    scoreTime.textContent = getFormattedSeconds();
}

// Function for starting quiz.
function startQuiz(event) {

    if (event.target.value === "startbutton") {
        startSection.style.display = "none";
        questionsStart.style.display = "";
        interval = setInterval(function () {
            secondsElapsed++;
            setTime();
        }, 1000)
    }
}

// Function for answering and moving through questions.
function questions(event) {
    if (event.target.value) {
        if ((event.target.value === "startbutton") || (event.target.value === "submitscore")) {
            timeDisplay.style.color = "black";
        } else if (event.target.value === "incorrect") {
            secondsElapsed += 10;
            timeDisplay.style.color = "red";
            setTimeout(function () {
                timeDisplay.style.color = "black";
            }, 2000);
        } else {
            timeDisplay.style.color = "#32DC32";
            setTimeout(function () {
                timeDisplay.style.color = "black";
            }, 2000);
        }

        if (event.target.parentElement.id === "question5") {
            clearInterval(interval);
            document.querySelector("#" + event.target.parentElement.id).style.display = "none";
            completeSection.style.display = "";

            if (event.target.value !== "correct")
                secondsElapsed +=

                    setTime();

        } else if (event.target.parentElement.id === "complete") {
            return
        } else {
            document.querySelector("#" + event.target.parentElement.id).style.display = "none";
            document.querySelector("#" + event.path[1].nextElementSibling.id).style.display = "";
        }
    }
}

function submitScore() {
    console.log(initialInput.value + " - " + scoreTime.textContent);
    let highScores = JSON.parse(localStorage.getItem("allScores"));
    if (highScores == null) allScores = [];
    let scoreInitials = initialInput.value;
    let finalScore = scoreTime.textContent;
    let scoreEntry = {
        "initials": scoreInitials,
        "score": finalScore
    };
    localStorage.setItem("scoreEntry", JSON.stringify(scoreEntry));
    allScores.push(scoreEntry);
    localStorage.setItem("allScores", JSON.stringify(allScores));
}

// Event listeners.
startButton.addEventListener("click", startQuiz);
questionButton.addEventListener("click", questions);
scoreSubmit.addEventListener("click", submitScore);
