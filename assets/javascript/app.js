/*
    - Press Start to start the game.

    - Each question screen should have the following:
        - Time Remaining : (Starts from 30 secs then count down to 0)
        - Question
        - 4 *clickable* multiple choices

    - When the user makes a choice with a click, shows whether it's correct or not.
    - When it times out, also show the correct one.
    - Then shows the next question.

    - At the end of the game, screen shows
        -- Correct Answer Counts
        -- Incorrect Answer Counts
        -- Unanswered Answer Counts
        -- and choice of 'Start Over'
*/


var triviaData = [
    { question: "The Nile River is the longest river in the world (at 4,160 miles). Which one’s the next longest?",
      choices: [
          "Yangtze River",
          "Congo River",
          "Amazon River",
          "Hunang He",
      ],
      fact: "Amazon River is the 2nd logest at 4,049 miles",
      answer: 2,
    },

    { question: "What is the 10th most spoken language worldwide?",
      choices: [
          "German",
          "Bengali",
          "Russian",
          "Portuguese",
      ],
      fact: "German is the 10th most spoken language in the world. Cheers!",
      answer: 0,
    },
/*
    { question: "What do Grenada and Costa Rica have in common?",
      choices: [
          "They have no army",
          "They sit on the Equator",
          "Voted world's best place to live",
          "Countries with the least crime",
      ],
      fact: "Neither country has an army.",
      answer: 0,
    },

    { question: "As of July 2011, Kosovo and the Vatican City are still not members of the United Nations. Who else isn’t?",
      choices: [
          "Rwanda",
          "Taiwan",
          "Afghanistan",
          "El Salvador",
      ],
      fact: "Correct asnwer is Taiwan.",
      answer: 1,
    },

    { question: "The second longest coastline, after Canada, is where?",
      choices: [
          "Chile",
          "Australia",
          "Russia",
          "Indonesia",
      ],
      fact: "Indonesia has the second longest coast line.",
      answer: 3,
    },

    { question: "Which country actually has the world’s longest official name (except it’s known by a shortened version)?",
      choices: [
          "Libya",
          "Tajikstan",
          "Guatemala",
          "Mongolia",
      ],
      fact: "Libya's official name is 'Al Jumahiriyah al Arabiyah al Libiyah ash Shabiyah al Ishtirakiyah al Uzma'",
      answer: 0,
    },

    { question: "Approximately how many people live in Greenland (to the closest thousand)?",
      choices: [
          "44,000",
          "32,000",
          "85,000",
          "57,000",
      ],
      fact: "The correct answer is 57,000 (56,370 to be exact)",
      answer: 3,
    },

    { question: "Which is the second largest city in New Zealand, after Auckland?",
      choices: [
          "Christchurch",
          "Wellington",
          "Hamilton",
          "Napier-Hastings",
      ],
      fact: "The answser is Wellington.",
      answer: 1,
    },

    { question: "One of these countries isn’t landlocked. Which is it?",
      choices: [
          "Zambia",
          "Paraguay",
          "Slovakia",
          "Croatia",
      ],
      fact: "The answer is Croatia.",
      answer: 3,
    },
*/
];

// Object holding all other game data other than Trivia questions/answers.

var userData = {
    corrects: 0,
    incorrects: 0,
    unanswered: 0,
    timer: 30000,                       // Internal clock before next question
    refTimer: undefined,                // Store internal time out
    timerSecDisplay: undefined,         // User display timer in secs before next question,
                                        // calculated in secs of 'timer' value at start.
    refTimeSecDisplay: undefined,       // Store user-facing timer interval
    currentQuestion: undefined,         // Holds copy of currently displayed question.
};

// Initial screen should zero out all entries in userData.

function initializeUserData() {
    userData.corrects = 0;
    userData.incorrects = 0;
    userData.unanswered = 0;
}


// Draw screen for each question and choices
function drawQuestionChoices(current) {
    console.log("Drawing question and choices");
    $("#question").text( current.question );
    for(var index=0; index< current.choices.length; index++) {
        $("#choice"+index).text( current.choices[index] );
    }
}

function isCorrect(userChoice) {
    if (userData.currentQuestion.answer === parseInt(userChoice)) {
        return true;
    } else {
        return false;
    }
}

function clearAnswer() {
    $("#displayAnswer").modal('hide');
}

// ToDo: should I use Bootstrap modal?
function drawAnswer(isCorrect) {
    clearInterval(userData.refTimeSecDisplay);  // Pause timer display

    if (isCorrect) {
        $("#yourAnswerIs").text("Your answer is CORRECT");
    } else if (isCorrect == undefined) {
        $("#yourAnswerIs").text("Time's UP!");
    } else {
        $("#yourAnswerIs").text("Your answer is INCORRECT");
    }
    $(".modal-body").text(userData.currentQuestion.fact);

    $("#displayAnswer").modal('show');
}

function drawTimer() {
    if (userData.timerSecDisplay > 0) {
        userData.timerSecDisplay--;
        $("#timer").text(`Time Remaining: ${userData.timerSecDisplay}`);
    }
}

function drawFinalResult() {
    console.log("Game End");
    console.log("Final Results are:");
    console.log(userData);

    $(".modal-body").append(
        $("<div>").text(`Corrects: ${userData.corrects}`),
        $("<div>").text(`Incorrects: ${userData.incorrects}`),
        $("<div>").text(`Unanswered: ${userData.corrects}`),
    )
    
    $("#displayAnswer").modal('show');
}

function nextQuestion() {
    console.log("Loading the next question");
    console.log(triviaData[0]);
    return triviaData.shift();
}

// Start internal countdown as well as display ticking timer on GUI

function resetCountdownDisplay() {
    clearInterval(userData.refTimeSecDisplay);
    console.log("Resetting internal and user display timer");
    userData.timerSecDisplay = userData.timer / 1000;
    userData.refTimeSecDisplay = setInterval(drawTimer, 1000);
}

function timeUp() {
    drawAnswer();
    console.log("Timer is up.  Getting next question");
    userData.unanswered++;

    setTimeout(function() {
        clearAnswer();
        loadNextQuestion();
    }, 5000);
}

function loadNextQuestion() {
    console.log("===================================");
    clearTimeout(userData.refTimer);
    userData.currentQuestion = nextQuestion();

    // currentQuention is null at the end of game.
    if (userData.currentQuestion) {
        drawQuestionChoices(userData.currentQuestion);
        resetCountdownDisplay();
        userData.refTimer = setTimeout(timeUp, userData.timer);
    } else {
        drawFinalResult();
    }
}

// main game program block
$(document).ready( function() {

    // To do: Draw 'Click on Start' Screen

    // Initial loading and screen draw
    initializeUserData();
    loadNextQuestion();

    // Somewhere here I need to add event handler for clicking a choice
    $(".choice").click(function() {
        // If the end user makes a choice, determine whether it's a
        // correct or incorrect answer.
        console.log("clicked");
        var choice = $(this).data("value");
        var gotAnswer = isCorrect(choice);

        if(gotAnswer) {
            console.log("Got Correct answer");
            userData.corrects++;
        } else {
            console.log("Got Wrong answer");
            userData.incorrects++;
        }
        drawAnswer(gotAnswer);

        setTimeout(function() {
            clearAnswer();
            loadNextQuestion();
        }, 5000);
    });

});
