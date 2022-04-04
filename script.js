// handles DOM manipulation and listeners
const dQuery = (function(){
  const gameUnitContainer = document.querySelectorAll(".gameUnitContainer");
  const gameUnit = document.querySelectorAll(".gameUnit");
  const xSelector = document.querySelector("#X");
  const oSelector = document.querySelector("#O");
  

  //sets the sign for each player
  xSelector.addEventListener("click", () => {
    game.humanPlayer.setSign(xSelector.textContent);
    game.AIplayer.setSign(oSelector.textContent);

          //debugging
    console.log('Human: ', game.humanPlayer.getSign());
    console.log('PC: ', game.AIplayer.getSign());
  });
  oSelector.addEventListener("click", () => {
    game.humanPlayer.setSign(oSelector.textContent);
    game.AIplayer.setSign(xSelector.textContent);

          //debugging
    console.log('Human: ', game.humanPlayer.getSign());
    console.log('PC: ', game.AIplayer.getSign());
  })

  //listen for clicks on the gameboard array and sets the sign/CSS on them
  gameUnitContainer.forEach((unit) => 
    unit.addEventListener('click', () => {

      //only play one round;
      if (game.humanPlayer.getPlayStatus() !== true) return;

      //avoids overwritting
      if (unit.firstChild.textContent !== '') return;

      game.setUnit((unit.dataset.array), game.humanPlayer.getSign());
      unit.firstChild.textContent = game.humanPlayer.getSign();
      unit.firstChild.setAttribute("class", `gameUnit gameUnit${game.humanPlayer.getSign()}`);
      game.humanPlayer.setPlayStatus('false');
        //debugging
      console.log(game.getBoard());
    })
  );

  const updateBoard = () => {
    console.log(game.getBoard());
    gameArray = game.getBoard();
    for (let i = 0; i < 9; i++){
      let toWrite = document.querySelector(`[data-array="${i}"]`);
      toWrite.firstChild.setAttribute("class", `gameUnit gameUnit${gameArray[i]}`);
      toWrite.firstChild.textContent = gameArray[i];
      console.log('tentei...');
    }
  }
  
  return {
    gameUnitContainer, gameUnit, updateBoard,
  }
})();

// constructs a player;
const Player = () => {
  let _sign;
  let _name;
  let _currentlyPlaying = true;
  
  const setName = (name) => _name = name;
  const setSign = (sign) => {
    caps = sign.toUpperCase();
    if (caps === 'X' || caps === "O") _sign = caps;
    else console.log('invalid sign');
  }
  const getSign = () => _sign;
  const getName = () => _name;
  const reset = () => {
    _sign = '';
    _name = '';
  };

  const setPlayStatus = () => {
    _currentlyPlaying ? _currentlyPlaying = false : _currentlyPlaying = true;
  }
  const getPlayStatus = () =>  _currentlyPlaying;

  return {
    setSign, getSign, reset, setName, getName, getPlayStatus, setPlayStatus,
  }; 
}

//handles game logic
const game = (function() {
  const _gameboard = new Array(9);
  let _whoPlaysNow = '';

  // instantiate player / AI
  const humanPlayer = Player();
  const AIplayer = Player();

  const whoPlaysNow = () => {
    if (humanPlayer.getPlayStatus()) {
     humanPlayer.setPlayStatus = false;
     _whoPlaysNow = 'humanPlayer';
     return 'humanPlayer';
    }
    else if (AIplayer.getPlayStatus()) {     
      AIplayer.setPlayStatus = false;
      _whoPlaysNow = 'AIplayer';
      return 'AIplayer';
    }
   }


  const setUnit = (position, sign) =>{
    // avoids overwritting
    if (_gameboard[position] !== undefined) return;
    _gameboard[position] = sign;
  };
  const getUnit = (position) => {
    console.log(_gameboard[position]);
    return _gameboard[position];
  }
  const getBoard = () => _gameboard;
  const resetBoard = () => {
    for (i = 0; i < _gameboard.length; i++) {
      _gameboard[i] = '';
    }
  };
  const getRound = () => {
    console.log(humanPlayer.getSign(), AIplayer.getSign());
  }

  return {
      setUnit, getUnit, resetBoard, humanPlayer, AIplayer, getBoard, getRound, whoPlaysNow,
    }
})();


simulateAIPlay = function() {
  console.log(game.getBoard());
  let AIturn = Math.floor(Math.random()*9);
  if(game.getUnit(AIturn) === undefined) {
    game.setUnit(AIturn, game.AIplayer.getSign());
    console.log ('JOGUEEEI');
    dQuery.updateBoard();
  } else {
    simulateAIPlay();
  }

};









