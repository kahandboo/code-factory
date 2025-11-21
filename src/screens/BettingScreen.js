import Validator from "../games/racingCar/Validator.js";
import { convertImageFileToAscii } from "../utils/converter.js";
import { player } from "../models/Player.js";

const CAR_FRAMES_PATH = "../title_car.jpg";

const BORDER_FRAMES = [
  { 
    top: "+ o * ".repeat(300),
    left: "+\no\n*\n".repeat(300),
    right: "*\no\n+\n".repeat(300),
    bottom: "* o + ".repeat(300)
  },
  { 
    top: "o * + ".repeat(300),
    left: "o\n*\n+\n".repeat(300),
    right: "o\n+\n*\n".repeat(300),
    bottom: "+ * o ".repeat(300)
  },
  { 
    top: "* + o ".repeat(300),
    left: "*\n+\no\n".repeat(300),
    right: "+\n*\no\n".repeat(300),
    bottom: "o + * ".repeat(300)
  }
];

function startBettingAnimations() {
  if (window.bettingAnimationInterval) {
    clearInterval(window.bettingAnimationInterval);
  }
  
  const borderTop = document.getElementById("border-top");
  const borderLeft = document.getElementById("border-left");
  const borderRight = document.getElementById("border-right");
  const borderBottom = document.getElementById("border-bottom");
  let frameIndex = 0;

  window.bettingAnimationInterval = setInterval(() => {
    frameIndex = (frameIndex + 1) % BORDER_FRAMES.length;
    const borderFrameIndex = frameIndex % BORDER_FRAMES.length;
    const frame = BORDER_FRAMES[borderFrameIndex]; 

    if (borderTop) borderTop.textContent = frame.top;
    if (borderLeft) borderLeft.textContent = frame.left;
    if (borderRight) borderRight.textContent = frame.right;
    if (borderBottom) borderBottom.textContent = frame.bottom;
    
  }, 200); 
}

async function loadStaticAsciiTitle() {
  const titleEl = document.getElementById("title-animation");

  try {
    const asciiArt = await convertImageFileToAscii(CAR_FRAMES_PATH);
    
    if (asciiArt) {
      titleEl.textContent = asciiArt;
    } else {
      titleEl.textContent = "Failed to load ASCII Art"; 
    }
  } catch (error) {
    console.error("ASCII Title Error:", error);
    titleEl.textContent = "Error loading image.";
  }
}

export function renderBettingScreen(mainContainer, onStartCallback) {
  mainContainer.innerHTML = `
        <div class="screen" id="betting-screen">

          <pre id="border-top" class="ascii-art-border"></pre>
          <pre id="border-left" class="ascii-art-border"></pre>
          <pre id="border-right" class="ascii-art-border"></pre>
          <pre id="border-bottom" class="ascii-art-border"></pre>

          <div class="title-container">
            <pre id="title-animation" class="ascii-art-title"></pre>
            <h2 id="main-title">Racing Cars</h2>
          </div>

          <div class="betting-ui">
            <p>Your Car Name</p>
            <input type="text" id="player-car-name" />
            <p>Betting Amount</p>
            <input type="text" id="betting-amount" />
            <p id="error-message" class="error-message"></p>
            <ul class="game-info">
                <li>
                    <span class="info-label">carCount</span>
                    <span class="info-value" id="info-car-count"></span>
                </li>
                <li>
                    <span class="info-label">totalRounds</span>
                    <span class="info-value" id="info-round-count"></span>
                </li>
                <li>
                    <span class="info-label">Winnings</span>
                    <span class="info-value" id="info-winnings"></span>
                </li>
            </ul>
            <button id="start-race-btn">! RACE START !</button>
          </div>            
          <button id="exit-btn">EXIT</button>
        </div>
    `;

  const bettingInput = document.getElementById("betting-amount");
  const carNameInput = document.getElementById("player-car-name");
  const startButton = document.getElementById("start-race-btn");
  const exitButton = document.getElementById("exit-btn");

  const error = document.getElementById("error-message");
  const carCount = document.getElementById("info-car-count");
  const roundCount = document.getElementById("info-round-count");
  const winnings = document.getElementById("info-winnings");

  startButton.disabled = true;

  const checkFormValidity = () => {
    try {
      Validator.validateCarName(carNameInput.value);
      Validator.validateBettingAmount(bettingInput.value);
      
      startButton.disabled = false;
    } catch (e) {
      startButton.disabled = true;
    }
  };

  carNameInput.addEventListener("input", () => {
    const carName = carNameInput.value;

    try {
      Validator.validateCarName(carName);
      error.textContent = "";
    } catch (e) {
      error.textContent = e.message;
    }
    checkFormValidity();
  });

  bettingInput.addEventListener("input", () => {
    const bettingAmount = bettingInput.value;

    try{
      Validator.validateBettingAmount(bettingAmount);
      error.textContent = "";
      const count = bettingAmount/1000;

      carCount.textContent = `${count} Cars`;
      roundCount.textContent = `${count} Rounds`;
      winnings.textContent = `${(bettingAmount * count).toLocaleString()} C`;
    } catch (e) {
      error.textContent = e.message;

      carCount.textContent = "Cars";
      roundCount.textContent = "Rounds";
      winnings.textContent = "Credits";
    }
    checkFormValidity();
  });

  startButton.addEventListener("click", () => {
    const gameData = {
      bettingAmount: Number(bettingInput.value),
      carName: carNameInput.value
    };

    if (player.deductCoins(gameData.bettingAmount)) {
      onStartCallback(gameData);
    } else {
      error.textContent = "잔액 부족";
    }
  });

  exitButton.addEventListener("click", () => {
    window.location.href = "./map.html"; 
  });

  loadStaticAsciiTitle();
  startBettingAnimations();
}