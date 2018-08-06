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
      answer: 2,
    },

    { question: "What is the 10th most spoken language worldwide?",
      choices: [
          "German",
          "Bengali",
          "Russian",
          "Portuguese",
      ],
      answer: 0,
    },

    { question: "What do Grenada and Costa Rica have in common?",
      choices: [
          "They have no army",
          "They sit on the Equator",
          "Voted world's best place to live",
          "Countries with the least crime",
      ],
      answer: 0,
    },
];

var userData = {
    corrects: 0,
    incorrects: 0,
    unanswered: 0,
    count: 30000,                        // 30 Seconds
    currentQNum: 0,
};

// Initial screen should zero out all entries in userData.

function initializeUserData() {
    userData.corrects = 0;
    userData.incorrects = 0;
    userData.unanswered = 0;
}


// Draw screen for each question and choices
function drawQuestionChoices(current) {
    // current.question;
    // current.choices;

}

function isCorrect(current, userChoice) {
    if (current.answer === parseInt(userChoice)) {
        return true;
    } else {
        return false;
    }
}

function drawAnswer(current) {
    var msg = "";

    if (isCorrect(current, userChoice) {
        msg += "You are correct";
    } else {
        msg += "You are incorect";
    }

    msg += "\t\t The answer is ${ current.choices[current.answer] }";
}

/*
var timerExample = setTimeout(someFunction, 30000);
function someFunction() {
...
}
cleartimeout(timerExample);

var timerExample = setInterval(someFunction, 30000);
fucntion someFunction() {....}
clearInterval(timerExample);
*/
