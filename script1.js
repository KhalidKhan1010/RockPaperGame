const Choice = Object.freeze({
    ROCK: Symbol(1),
    PAPER: Symbol(2),
    SCISSORS: Symbol(3)
});

let Score = {
    scorePlayer : 0,
    scoreComputer : 0
}

let matchWinner = "toBeDecided";

document.getElementById("button-backgroundMusic").addEventListener('click', function(){
    document.getElementById("backgroundMusic").play();
})

let buttonRock = document.getElementById('button-rock');
buttonRock.addEventListener('click', function(){
    buttonClickEventHandler(Choice.ROCK);
});

let buttonPaper = document.getElementById('button-paper');
buttonPaper.addEventListener('click', function(){
    buttonClickEventHandler(Choice.PAPER)
});

let buttonScissors = document.getElementById('button-scissors');
buttonScissors.addEventListener('click', function(){
    buttonClickEventHandler(Choice.SCISSORS)
});

document.getElementById("button-playAgain").addEventListener('click', function(){
        Score.scorePlayer = 0;
        Score.scoreComputer = 0;
        matchWinner = "toBeDecided";
        displayScore();
        displayMatchWinner();

        let playerWindowImage = document.getElementById('game-window-player-image');
        playerWindowImage.setAttribute('src', 'images/rock2.png');
        let computerWindowImage =
        document.getElementById('game-window-computer-image');
        computerWindowImage.setAttribute('src', 'images/rock2.png');

        document.getElementById("game-window-controls").style.visibility = "visible";
        document.getElementById("playAgain-popUp-box-container").style.display = "none";
});

function buttonClickEventHandler(playersChoice)
{
    document.getElementById("game-window-controls").style.visibility = "hidden";
    let playerWindowImage = document.getElementById('game-window-player-image');
    playerWindowImage.setAttribute('src', 'images/processing.gif');
    let computerWindowImage = document.getElementById('game-window-computer-image');
    computerWindowImage.setAttribute('src', 'images/processing.gif');

    playersChoice; // ONLY for readability. playersChoice is passed to the function as  an argument
    let computersChoice = getComputersChoice();
    let roundWinner = getRoundWinner(playersChoice, computersChoice);
    //Update Score (calculate new score & get the new score) on the basis of the roundWinner
    Score = getNewScore(roundWinner, Score);

    // Wait 3 seconds before changing processing.gif (Show processing.gif for 3 seconds) 
    setTimeout(() => { 
        changePlayersImage(playersChoice); 
        changeComputersImage(computersChoice);
        playRoundAudio(roundWinner);

        displayScore();
        document.getElementById("game-window-controls").style.visibility = "visible";
        matchWinner = getMatchWinner(Score);

        if (matchWinner !== "toBeDecided")
        {
            displayMatchWinner();
            endMatch();
        }
        
    }, 3000);
}

function getComputersChoice(){
    let computersChoice = Symbol();
    let computersChoiceInt = generateRandomInt(1, 4); // 1 inclusive, 4 exclusive
    switch(computersChoiceInt)
    {
        case Number(Choice.ROCK.description):
            computersChoice = Choice.ROCK;
            break;
        case Number(Choice.PAPER.description):
            computersChoice = Choice.PAPER;
            break;
        case Number(Choice.SCISSORS.description):
            computersChoice = Choice.SCISSORS;
    }
    return computersChoice;
}

function changePlayersImage(playersChoice){
    switch(playersChoice.description)
    {
        case Choice.ROCK.description:
            document.getElementById('game-window-player-image').setAttribute('src', 'images/rock2.png');
            break;
        case Choice.PAPER.description:
            document.getElementById('game-window-player-image').setAttribute('src', 'images/paper2.png');
            break;
        case Choice.SCISSORS.description:
            document.getElementById('game-window-player-image').setAttribute('src', 'images/scissors2.png');
            break; 
    }
}

function changeComputersImage(computersChoice){
    switch(computersChoice.description)
    {
        case Choice.ROCK.description:
            document.getElementById('game-window-computer-image').setAttribute('src', 'images/rock2.png');
            break;
        case Choice.PAPER.description:
            document.getElementById('game-window-computer-image').setAttribute('src', 'images/paper2.png');
            break;
        case Choice.SCISSORS.description:
            document.getElementById('game-window-computer-image').setAttribute('src', 'images/scissors2.png');
            break; 
    }
}

function getRoundWinner(playersChoice, computersChoice){
    let roundWinner;
    if(playersChoice !== computersChoice)
    {
        let combinationOfChoices = Number(playersChoice.description) + Number(computersChoice.description); /* This variable holds a number which is the sum of the integral values of the two choices (player's choice & computer's choice).
            4 means ROCK and SCISSORS
            3 means ROCK and PAPER
            5 means PAPER and SCISSORS */
        switch(combinationOfChoices){
            case 4:
                roundWinner = (playersChoice === Choice.ROCK) ? "player" : "computer";
                break;
            case 3:
                roundWinner = (playersChoice === Choice.PAPER) ? "player" : "computer"; 
                break;
            case 5:
                roundWinner = (playersChoice === Choice.SCISSORS) ? "player" : "computer";
        }
    }
    else
        roundWinner = "none";
    return roundWinner;
}

function getNewScore(roundWinner, Score){

    switch(roundWinner)
    {
        case "player":
            ++Score.scorePlayer;
            break;
        case "computer":
            ++Score.scoreComputer
            break;
    }

    return Score;
}

function getMatchWinner(Score){
    if (Score.scorePlayer === 3)
        return "player";
    else if (Score.scoreComputer === 3)
        return "computer";
    else
        return "toBeDecided";
}

function displayScore(){
    document.getElementById("score-player").innerText = "Player: " + Score.scorePlayer;
    document.getElementById("score-computer").innerText = "Computer: " + Score.scoreComputer;
}

function playRoundAudio(roundWinner){
    let audio = document.getElementById("audio-round");

    if (roundWinner === "none")
        audio.setAttribute("src", "sounds/bump.wav")
    else
        audio.setAttribute("src", "sounds/explosion.wav")

    audio.play();
}

function displayMatchWinner(){
    if(matchWinner === "toBeDecided")
    {
        document.getElementById("match-winner-value").innerText = ""; // No winner yet. Match is in progress. Display empty string (as the winner)

    }
    else
        document.getElementById("match-winner-value").innerText = matchWinner;
}

function endMatch(){
    if (matchWinner === "player")
        document.getElementById("matchWinner-notification").innerText = "Congrats! You Won!"
    else if (matchWinner === "computer")
        document.getElementById("matchWinner-notification").innerText = "You Lost ..."

    document.getElementById("game-window-controls").style.visibility = "hidden";
    document.getElementById("playAgain-popUp-box-container").style.display = "flex";
}

function generateRandomInt(min, max){
     return Math.floor(Math.random() * (max - min)) + min;
}
