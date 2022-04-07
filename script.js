// handles DOM manipulation and listeners
const dQuery = (function(){
  const gameUnitContainer = document.querySelectorAll(".gameUnitContainer");
  const gameUnit = document.querySelectorAll(".gameUnit");
  const xSelector = document.querySelector("#X");
  const oSelector = document.querySelector("#O");
  
  //sets the sign for each player
  xSelector.addEventListener("click", () => {
    game.humanPlayer.setSign(xSelector.textContent);
    game.cpuPlayer.setSign(oSelector.textContent);
  });
  oSelector.addEventListener("click", () => {
    game.humanPlayer.setSign(oSelector.textContent);
    game.cpuPlayer.setSign(xSelector.textContent);
  })

  //listen for clicks on the gameboard array and sets the sign/CSS on them
  gameUnitContainer.forEach((unit) => 
    unit.addEventListener('click', () => {

      //only play one round;
      if (!game.humanPlayer.getPlayStatus()) return;

      //avoids overwritting
      if (unit.firstChild.textContent !== '') return;
      let sign = game.humanPlayer.getSign();
      unit.firstChild.textContent = sign;
      unit.firstChild.setAttribute("class", `gameUnit gameUnit${sign}`);
      game.evaluateRound((unit.dataset.array), sign);
  })
);

  const updateBoardCSS = () => {
    gameArray = game.getBoard();
    for (let i = 0; i < 9; i++){
      let toWrite = document.querySelector(`[data-array="${i}"]`);
      toWrite.firstChild.setAttribute("class", `gameUnit gameUnit${gameArray[i]}`);
      toWrite.firstChild.textContent = gameArray[i];
    }
  };

  const resetBoardCSS = () => {
    for (let i = 0; i < 9; i++){
      let b = document.querySelector(`[data-array="${i}"]`);
      b.firstChild.setAttribute("class", "gameUnit");
      b.firstChild.textContent = '';
    }
  } 
  
  return {
    gameUnitContainer, gameUnit, updateBoardCSS, resetBoardCSS,
  }
})();

// constructs a player;
const Player = () => {
  let _sign;
  let _currentlyPlaying = false;
  let _winningStatus = false; 

  const setSign = (sign) => {
    caps = sign.toUpperCase();
    if (caps === 'X' || caps === "O") _sign = caps;
    else console.log('invalid sign');
  };
  const getSign = () => _sign;
  const reset = () => {
    _sign = '';
    _name = '';
  };
  const setPlayStatus = () => {
    _currentlyPlaying? _currentlyPlaying = false : _currentlyPlaying = true;
  }
  const getPlayStatus = () =>  _currentlyPlaying;
  const setWinner = (status) => _winningStatus = status;
  const isWinner = () => _winningStatus;

  return {
    setSign, getSign, reset, getPlayStatus, 
    setPlayStatus, isWinner, setWinner,
  }; 
}

//handles game logic
const game = (function() {
  let _gameboard = new Array(9);
  let _gameOn = true;

  // instantiate player / AI
  const humanPlayer = Player();
  humanPlayer.setPlayStatus(true);
  const cpuPlayer = Player();

  const getGameStats = () => _gameOn;

  const setUnit = (position, sign) =>{
    _gameboard[position] = sign;
  };  

  const getUnit = (position) =>{
    return _gameboard[position];
  };


  const evaluateRound = (position, sign) => {        
    // doesn't play if not suposed to 
    if (!game.getGameStats()) return;        

    //play
    setUnit(position, sign)

    // activate/deactivate players based on current round
    if(humanPlayer.getPlayStatus()){
      humanPlayer.setPlayStatus(false);
      cpuPlayer.setPlayStatus(true);
    } else if (cpuPlayer.getPlayStatus()) {
      cpuPlayer.setPlayStatus(false);
      humanPlayer.setPlayStatus(true);
    } else console.log('somethin\'gs wrong, I can feel it....');

    // update before proceding back
    dQuery.updateBoardCSS();
    if(game.validateWinner(_gameboard.indexOf(sign), sign)) setWinner(sign);
    game.cpuPlayer.getPlayStatus()?   cpuPlay() : false;
  }
























  const getBoard = () => _gameboard;

  const resetBoardArray = () => {
    _gameboard = new Array(9);
  };

  const getRound = () => {
    console.log(humanPlayer.getSign(), cpuPlayer.getSign());
  }

  // gets gameboard length
  const getGameboardLength = () => {
    let count = [];
    readArray = game.getBoard();
    readArray.forEach((array => {
      count.push(array);
    }))
    return (count.length);
  };

  // check winning conditions after every round 
  const validateWinner = (index, sign) => {
    // combinations of indexes for each sign that result in a win
    const winArray = [
      [0, 4, 8], 
      [2, 4, 6],
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [8, 5, 2],
      [7, 4, 1],
      [6, 3, 0],
    ];  
    return winArray
    // returns possible winning conditions
    .filter((combination) => combination.includes(index))
    // some checks the array and return true if the item contains the winning index
    // every returns true if every combination found on the array matches the winning array 
    .some((possibleCombination) => possibleCombination.every((index) => game.getUnit(index) === sign));  
  }

  const setWinner = (sign) => {
    _gameOn = false;
    cpuPlayer.setPlayStatus(false);
    if (humanPlayer.getSign() === sign) {
      alert(humanPlayer.getSign() + ' has won');
      resetGame();
    } else if (cpuPlayer.getSign() === sign) {
        alert(cpuPlayer.getSign() + ' has won');
        resetGame();
      } else console.log ('Something\'s wrong, I can feel it');
  };

  const debugPlayer = (player) => {
    console.log('current game state: ' + getGameStats());
    console.log('current play stats: '+ player.getPlayStatus());
    console.log('is winner? ' + player.isWinner());
  }

  const resetGame = () => {
    resetBoardArray();
    dQuery.resetBoardCSS();
    _gameOn = true;
    humanPlayer.setWinner(false); 
    cpuPlayer.setWinner(false);
    humanPlayer.setPlayStatus(); 
  };

  return {
      evaluateRound, setUnit, getUnit, resetBoardArray, humanPlayer, cpuPlayer, getBoard,
      getRound, getGameboardLength, validateWinner, 
      setWinner, getGameStats, resetGame, debugPlayer, 
    }
})();

// simulating AI play to test the game
const cpuPlay = function() {

  // doesn't play if it's not suposed to
  if (!game.getGameStats()) return; 

  //avoids infinite recursion
  if(game.getGameboardLength() >= 9) return;

  // only play if it's my turn
  if(!game.cpuPlayer.getPlayStatus()) return;

  // *9 to avoid returning position higher than 8
  let myRandom = () => rand = (Math.floor(Math.random()*9));
  
  let cpuTurn = myRandom();
  
  while (game.getUnit(cpuTurn) !== undefined) {
    cpuTurn = myRandom();
    console.log(cpuTurn);
  };
  game.evaluateRound(cpuTurn, game.cpuPlayer.getSign());  
}

