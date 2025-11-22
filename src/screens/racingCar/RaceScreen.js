import Car from "../../games/racingCar/Car.js";
import { CarGame, generateCarNames } from "../../games/racingCar/CarGame.js";

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function createRankingHTML(game) {
  return game.getCars()
    .slice()
    .sort((a, b) => b.getScore() - a.getScore())
    .slice(0, 10)
    .map((car, index) => `
            <li>
              <span class="info-label">#${index + 1} ${car.getName()}</span>
              <span class="info-value" id="info-car-score">${car.getScore()}</span>
            </li>
        `)
    .join("");
}

function createTrackHTML(game, userCarName, carAscii) {
  return game.getCars().map((car, index) => {
    const carName = car.getName();
    const carId = `car-lane-${index}`;
    const isPlayer = carName === userCarName;
    
    return `
      <div id="${carId}" class="track-lane ${isPlayer ? "player-lane" : ""}">
        <div class="rank-badge">-</div>
        <div class="lane-name">${carName}</div>
        <div class="lane-road">
          <div class="car-icon" style="left: 0%;">
            <div class="car-ascii-art">${carAscii}</div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function updateTrackState(game, totalRounds, isTurboMode, userCarName) {
  const sortedCars = [...game.getCars()].sort((a, b) => b.getScore() - a.getScore());
  const top10Names = sortedCars.slice(0, 10).map(c => c.getName());

  game.getCars().forEach((car, index) => {
    const laneElement = document.getElementById(`car-lane-${index}`);
    const carIcon = laneElement.querySelector(".car-icon");
    const rankBadge = laneElement.querySelector(".rank-badge");

    if (laneElement && carIcon) {
      const progress = Math.min((car.getScore() / totalRounds) * 100, 95);
      carIcon.style.left = `${progress}%`;
      carIcon.style.transition = isTurboMode ? "left 0.1s linear" : "left 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      
      if (car.getScore() > 0) carIcon.classList.add("moving");

      const currentRank = sortedCars.findIndex(c => c.getName() === car.getName()) + 1;
      
      laneElement.style.order = currentRank;
      rankBadge.textContent = `#${currentRank}`; 

      const isTop10 = top10Names.includes(car.getName());
      const isMe = car.getName() === userCarName;

      if (isTop10 || isMe) {
        laneElement.style.display = "flex"; 
        if (isMe && !isTop10) {
          laneElement.style.opacity = "1"; 
          laneElement.style.borderLeft = "4px solid #FF003C"; 
        } else {
          laneElement.style.borderLeft = "none";
        }
      } else {
        laneElement.style.display = "none"; 
      }
    }
  });
}

function updateTickerBoard(tickerElement, message) {
  tickerElement.textContent = message;
  tickerElement.classList.remove("ticker-anim");
  void tickerElement.offsetWidth; 
  tickerElement.classList.add("ticker-anim");
}

export async function renderRaceScreen(mainContainer, gameData, onRaceComplete) {
  let currRoundCount = 1;
  const roundCount = gameData.bettingAmount / 1000;
  const potentialWinnings = gameData.bettingAmount * roundCount;
  const userCarName = gameData.carName;
  const isTurboMode = roundCount >= 20;
  const roundDelay = isTurboMode ? 50 : 1000;

  mainContainer.innerHTML = `
    <div class="screen" id="race-screen">        
        <div class="race-container">
            <div class="race-main">
                <h3>
                  RACE TRACK
                  ${isTurboMode ? "<span class=\"turbo-badge\">TURBO</span>" : ""}
                </h3>
                <div id="race-track-display"></div>
            </div>
            <aside class="race-sidebar">
                <p id="round-info">Round ${currRoundCount}/${roundCount}</p>
                <h3>RANKING</h3>
                <ul id="ranking-list">
                    </ul>
            </aside>
        </div>
        <div class="ticker-board-wrapper">
            <div id="ticker-message" class="action-log">Race starting soon...</div>
        </div> 
        <ul class="race-footer">
            <li>
                <span class="info-label">CURRENT BET</span>
                <span id="footer-betting-amount">${gameData.bettingAmount} C</span>
            </li>
            <li>
                <span class="info-label">WINNINGS</span>
                <span id="footer-winnings">${potentialWinnings} C</span>
            </li>
            <li>
                <span class="info-label">PLAYER</span>
                <span id="footer-player-car">${userCarName}</span>
            </li>
        </ul>
    </div>
    `;

  const trackDisplay = document.getElementById("race-track-display");
  const roundInfo = document.getElementById("round-info");
  const rankingList = document.getElementById("ranking-list");
  const tickerMessageElement = document.getElementById("ticker-message");

  const carNames = generateCarNames(userCarName, roundCount);
  const cars = carNames.map(name => new Car(name));
  const game = new CarGame(cars);

  rankingList.innerHTML = createRankingHTML(game);
  trackDisplay.innerHTML = createTrackHTML(game, userCarName);
  updateTrackState(game, roundCount, isTurboMode, userCarName);
  updateTickerBoard(tickerMessageElement, "Initializing Race System...");

  await delay(1500);

  for (let i = 0; i < roundCount; i++) {
    const currentRound = i + 1;

    game.progressRound();

    const sortedCars = [...game.getCars()].sort((a, b) => b.getScore() - a.getScore());
    const playerRankIndex = sortedCars.findIndex(car => car.getName() === userCarName);
    const totalCars = sortedCars.length;
    const rankPercent = ((playerRankIndex + 1) / totalCars) * 100;
    let tickerMessage = "";

    if (rankPercent <= 10) {
      tickerMessage = `${userCarName} ON FIRE! GO GO GO!`;
    } else if (rankPercent <= 30) {
      tickerMessage = `${userCarName} ALMOST THERE! CATCH THE LEADER!`;
    } else if (rankPercent <= 50) {
      tickerMessage = `${userCarName} GAINING TRACTION! KEEP PUSHING!`;
    } else if (rankPercent <= 80) {
      tickerMessage = `${userCarName} PUSH IT! YOU NEED MORE POWER!`;
    } else {
      tickerMessage = `${userCarName}? ENGINE TROUBLE? WAKE UP!!`;
    }

    updateTrackState(game, roundCount, isTurboMode, userCarName);
    rankingList.innerHTML = createRankingHTML(game);
    roundInfo.textContent = `ROUND ${currentRound}/${roundCount}`;
    
    updateTickerBoard(tickerMessageElement, tickerMessage);

    await delay(roundDelay);
  }

  const winners = game.getWinners();
  const playerWon = winners.map(car => car.getName()).includes(gameData.carName);
    
  const resultData = {
    isWin: playerWon,
    winners: winners.map(car => car.getName()),
    winnings: potentialWinnings,
    originalGameData: gameData
  };

  await delay(2000);
  onRaceComplete(resultData);
}