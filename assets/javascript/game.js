//DOM ELEMENTS
var $newGameBtn = document.getElementById('new-game-btn');
var $blanks = document.getElementById('blanks');
var $guesses = document.getElementById('guesses');
var $guessCount = document.getElementById('guess-count');
var $wins = document.getElementById('wins');
var $losses = document.getElementById('losses');

//INITIALIZE GAME OBJECT
var game = {
    //TODO: FILL WORD ARRAY
    wordArr: ["Abc Def"],
    wins: 0,
    losses: 0,
    guessCount: 10,
    gameActive: false,
    targetWord: ' ',
    targetWordBlanks: [],       //BLANKS REPRESENTING UNGUESSED LETTERS OF TARGET WORD
    guessesArr: [],             //ARRAY OF USER GUESSES
    incorrectGuessesArr: [],    //ARRAY OF INCORRECT USER GUESSES


    // MAIN METHOD
    newGame: function () {

        // RESET GAME
        this.gameActive = true;
        this.guessCount = 10;
        this.guessesArr = [];
        this.incorrectGuessesArr = [];
        this.targetWordBlanks = [];

        //RANDOMLY SELECT TARGET WORD
        this.targetWord = this.wordArr[Math.floor(Math.random() * this.wordArr.length)];

        //GENERATE BLANKS TO MATCH TARGET WORD
        for (var i = 0; i < this.targetWord.length; i++) {
            if (this.targetWord[i] === ' ') {
                this.targetWordBlanks.push(' ');
            } else {
                this.targetWordBlanks.push('_');
            }
        }

        //UPDATE DOM
        $guessCount.textContent = this.guessCount;
        $blanks.textContent = this.targetWordBlanks.join('');
        $guesses.textContent = this.guessesArr;

        //REMOVE
        console.log("game reset", game);
    },


    // CHECK INPUT 
    checkGuess: function (guess) {

        // IF GAME IS RUNNING & NEW VALID KEY GUESSED
        // TODO: SEE IF LACK OF CASE CHECKING IS AN ISSUE HERE
        if (this.gameActive && !this.guessesArr.includes(guess)) {

            //ADD KEY TO GUESSES
            this.guessesArr.push(guess);

            //CHECK TARGET WORD FOR KEY
            for (var i = 0; i < this.targetWord.length; i++) {
                //CONVERT CASE & COMPARE
                if (this.targetWord[i].toLocaleLowerCase() === guess.toLocaleLowerCase()) {
                    //ON MATCH UPDATE BLANKS WITH GUESS
                    this.targetWordBlanks[i] = this.targetWord[i];
                }
            }
            //UPDATE BLANKS WITH CORRECT GUESSES
            $blanks.textContent = this.targetWordBlanks.join('');

            //CHECK INCORRECT
            this.checkIncorrect(guess)

            // ALERTS FOR DUPLICATE GUESS OR KEYPRESS BEFORE GAME START
        } else {
            if (!this.gameActive) {
                alert("Start the game before guessing!");
            } else {
                alert("You've already guessed that letter!");
            }
        }
    },

    //INCORRECT GUESS
    checkIncorrect: function (guess) {
        if (!this.targetWordBlanks.includes(guess.toLowerCase()) && !this.targetWordBlanks.includes(guess.toUpperCase())) {
            this.guessCount--;
            this.incorrectGuessesArr.push(guess.toUpperCase());
            $guesses.textContent = this.incorrectGuessesArr.join(", ");
            $guessCount.textContent = this.guessCount;
        }
        this.checkLoss();
    },

    //CHECK FOR LOSS
    checkLoss: function () {
        if (this.guessCount === 0) {
            this.losses++;
            this.gameActive = false;
            $losses.textContent = this.losses;
            $blanks.textContent = this.targetWord;
        }
        this.checkWin();
    },

    //CHECK FOR WIN
    checkWin: function () {
        if (this.targetWord.toLowerCase() === this.targetWordBlanks.join("").toLowerCase()) {
            this.wins++
            this.gameActive = false;
            $wins.textContent = this.wins;
        }
    }

};

//WHEN BUTTON IS CLICKED, CALL NEWGAME FUNCTION 
$newGameBtn.addEventListener('click', function () {
    game.newGame();
    //UNFOCUS BUTTON TO PREVENT SPACEBAR FROM RESTARTING GAME 
    this.blur()
});

//VERIFY INPUT IS A-Z
document.onkeyup = function (event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        game.checkGuess(event.key);
    }
}