import { renderBettingScreen } from "./screens/lotto/BettingScreen.js";
import { renderLottoScreen } from "./screens/lotto/LottoScreen.js";
import { renderResultScreen } from "./screens/lotto/ResultScreen.js";

const screen = document.getElementById("game-screen-container");

function showRaceScreen(gameData) {
  renderLottoScreen(screen, gameData, showResultScreen);
}

function showResultScreen(resultData) {
  renderResultScreen(screen, resultData, onPlayAgain, onNewBetting, onCashOut);
}

function onPlayAgain(gameData) {
  renderLottoScreen(screen, gameData, showResultScreen);
}

function onNewBetting() {
  renderBettingScreen(screen, showRaceScreen);
}

function onCashOut() {
  window.location.href = "./map.html"; 
}

renderBettingScreen(screen, showRaceScreen);
