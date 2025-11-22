import { player } from "../../models/Player.js";

export function renderResultScreen(mainContainer, resultData, onPlayAgain, onNewBetting, onCashOut) {
  let mainResultHTML;
  const coinPattern = "( $ )   ( $ )   ( $ )   ( $ )   ( $ )   ( $ )   ( $ )   ( $ )   ";
  const longText = coinPattern.repeat(20);

  if (resultData.isWin) {
    mainResultHTML = `
      <div class="result-main win">
          <h2 id="result-title">CONGRATULATIONS !</h2>
          <h2>YOU WIN</h2>
          <p class="winnings">
            Credits <span id="rolling-number">0</span> 
          </p>
      </div>
    `;
  } else {
    mainResultHTML = `
      <div class="result-main lose">
          <h2>BAD LUCK</h2>
          <p class="winner-info">Winner is ${resultData.winners[0]}</p>
      </div>
    `;
  }

  mainContainer.innerHTML = `
      <div class="screen" id="result-screen">
        <div class="coin-flow top">
          <div class="track">
            <span class="content">${longText}</span>
            <span class="content">${longText}</span> </div>
        </div>
        <div class="result-container">
          ${mainResultHTML}
        </div>
        <div class="result-footer">
          <button id="play-again-btn">Play Again</button>
          <button id="new-betting-btn">New Game</button>
          <button id="cash-out-btn">Exit</button>
        </div>
        <div class="coin-flow bottom">
        <div class="track">
          <span class="content">${longText}</span>
          <span class="content">${longText}</span> </div>
        </div>
      </div>
    `;
  
  if (resultData.isWin) {
    const titleElement = document.getElementById("result-title");
    const text = titleElement.innerText;
    titleElement.innerHTML = ""; 

    [...text].forEach((char, index) => {
      const span = document.createElement("span");
      span.innerText = char;
      span.classList.add("wavy-char"); 

      if (char !== " ") {
        span.style.animationDelay = `${index * 0.1}s`;
      }

      titleElement.appendChild(span);
    });
  

    const numberElement = mainContainer.querySelector("#rolling-number");
    animateValue(numberElement, 0, resultData.winnings, 1000);

    player.addCoins(resultData.winnings);
  }
  
  document.getElementById("play-again-btn").addEventListener("click", () => {
    onPlayAgain(resultData.originalGameData);
  });

  document.getElementById("new-betting-btn").addEventListener("click", () => {
    onNewBetting();
  });

  document.getElementById("cash-out-btn").addEventListener("click", () => {
    onCashOut();
  });
}

function animateValue(obj, start, end, duration) {
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3); 
    const currentVal = Math.floor(start + (end - start) * easeProgress);
    obj.innerHTML = currentVal.toLocaleString();

    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      obj.innerHTML = end.toLocaleString();
    }
  }

  window.requestAnimationFrame(step);
}