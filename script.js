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
const scoreMessage = document.querySelector(".score-message");
const initialInput = document.querySelector("#highscore-initials");
const scoreSubmit = document.querySelector("#highscore-submit");
const clearScores = document.querySelector("#clear-scores");
const tryAgain = document.querySelector("#try-again");
const submitScoreForm = document.querySelector("#submit-score");

let totalSeconds = 60;
let secondsElapsed = 0;

// Functionality for formatting the minutes.
function getFormattedMinutes() {

    var secondsLeft = totalSeconds - secondsElapsed;
    var minutesLeft = Math.floor(secondsLeft / 60);
    var formattedMinutes = minutesLeft;

    return formattedMinutes;
};

// Functionality for formatting the seconds.
function getFormattedSeconds() {

    var secondsLeft = (totalSeconds - secondsElapsed) % 60;
    var formattedSeconds;

    if (secondsLeft < 10) {
        formattedSeconds = "0" + secondsLeft;
    } else {
        formattedSeconds = secondsLeft;
    };

    if(secondsElapsed >= totalSeconds) {
        return 0;
    }

    return formattedSeconds;
};

// Functionality for setting time.
function setTime() {
    timeDisplay.textContent = "0" + getFormattedMinutes() + ":" + getFormattedSeconds();
    
    scoreMessage.textContent = "Your final score is " + scoreTime.textContent
    scoreTime.textContent = getFormattedSeconds();

    if (secondsElapsed >= totalSeconds) {
        clearInterval(interval);
        timeDisplay.textContent = "00:00";
        for (i = 0; i < document.querySelectorAll(".question").length; i++) {
            document.querySelectorAll(".question")[i].style.display = "none";
        };
        document.querySelector("#complete").style.display = "";
        scoreMessage.textContent = "You ran out of time! Your final score is " + scoreTime.textContent;
        scoreTime.textContent = getFormattedSeconds();
    };
};

// Functionality for starting the quiz.
function startQuiz(event) {

    if (event.target.value === "startbutton") {
        startSection.style.display = "none";
        questionsStart.style.display = "";
        interval = setInterval(function () {
            secondsElapsed++;
            setTime();
        }, 1000)
    };
};

// Functionality for answering and moving through questions.
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
        };

        if (event.target.parentElement.id === "question5") {
            clearInterval(interval);
            document.querySelector("#" + event.target.parentElement.id).style.display = "none";
            completeSection.style.display = "";

            if (event.target.value !== "correct")
                secondsElapsed +=

                    setTime();

        } else if (event.target.parentElement.id === "submit-score") {
            return
        } else {
            document.querySelector("#" + event.target.parentElement.id).style.display = "none";
            document.querySelector("#" + event.path[1].nextElementSibling.id).style.display = "";
        };
    };
};

// Functionality for saving score and displaying to high score page.
function submitScore(event) {
    event.preventDefault();
    let allScores = JSON.parse(localStorage.getItem("allScores"));
    if (!allScores) allScores = [];

    let scoreInitials = initialInput.value;
    let finalScore = scoreTime.textContent;
    let scoreEntry = {
        "initials": scoreInitials,
        "score": finalScore
    };

    localStorage.setItem("scoreEntry", JSON.stringify(scoreEntry));
    allScores.push(scoreEntry);
    allScores.sort(function(a, b) {
        return (b.score - a.score);
    });
    localStorage.setItem("allScores", JSON.stringify(allScores));

    document.querySelector("#complete").style.display = "none";
    document.querySelector("#high-scores").style.display = "";

    document.querySelector("#scores-list").innerHTML = ""
    allScores = JSON.parse(localStorage.getItem("allScores"));
    for (i = 0; i < allScores.length; i++) {
        let scoreListItem = document.createElement("li");
        scoreListItem.textContent = allScores[i].initials + " - " + allScores[i].score;
        document.querySelector("#scores-list").appendChild(scoreListItem);
    };
};

// Functionality for clearing high scores.
function clearHighScores() {
    localStorage.setItem("allScores", null);
    document.querySelector("#scores-list").innerHTML = ""
};

// Functionality to try again or start over.
function startOver() {
    document.querySelector("#high-scores").style.display = "none";
    for (i = 0; i < document.querySelectorAll(".after-start").length; i++) {
        document.querySelectorAll(".after-start")[i].style.display = "none";
    };
    startSection.style.display = "";
    clearInterval(interval);
    secondsElapsed = 0;
    initialInput.value = null
    setTime();
};

// Functionality for showing high scores from anywhere in the quiz.
function showHighScores() {
    for (i = 0; i < document.querySelectorAll(".before-highscore ").length; i++) {
        document.querySelectorAll(".before-highscore ")[i].style.display = "none";
    };
    document.querySelector("#high-scores").style.display = "";
};


// Event listeners.
startButton.addEventListener("click", startQuiz);
questionButton.addEventListener("click", questions);
submitScoreForm.addEventListener("submit", submitScore);
clearScores.addEventListener("click", clearHighScores);
tryAgain.addEventListener("click", startOver);
codeQuizHead.addEventListener("click", startOver);
highScoreHead.addEventListener("click", showHighScores);
