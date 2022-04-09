const getPlacar = (xWin, drawTimes, oWin) => {
  // subtract height to stay at the same position
  const header = document.querySelector('.header');
  header.style.height = '0vh';

  const placar = document.querySelector(".placar");

  placar.style.display = 'flex';
  placar.style.justifyContent = 'space-between';
  placar.style.alignItems = "center";
  placar.style.height = "27vh";
  placar.style.background = '#FBBF24';
  
  const xPlacar = document.createElement('div');
  xPlacar.style.color = 'transparent';
  xPlacar.style.textShadow = '0 0 0 #EF4444';
  xPlacar.textContent = `❌: ${xWin} wins`

  const oPlacar = document.createElement('div');
  oPlacar.style.color = 'transparent';
  oPlacar.style.textShadow = '0 0 0 #0EA5E9';
  oPlacar.textContent = `⭕: ${oWin} wins`

  const drawPlacar = document.createElement('div');
  drawPlacar.style.color = 'transparent';
  drawPlacar.style.textShadow = '0 0 0 #65A30D';  
  drawPlacar.textContent = `Draw: ${drawTimes} times`

  placar.appendChild(xPlacar);
  placar.appendChild(drawPlacar);
  placar.appendChild(oPlacar);

}

const updatePlacar = () => {

}
