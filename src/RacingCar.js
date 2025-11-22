import { renderBettingScreen } from "./screens/racingCar/BettingScreen.js";
import { renderRaceScreen } from "./screens/racingCar/RaceScreen.js";
import { renderResultScreen } from "./screens/racingCar/ResultScreen.js";

const screen = document.getElementById("game-screen-container");

function showRaceScreen(gameData) {
  renderRaceScreen(screen, gameData, showResultScreen);
}

function showResultScreen(resultData) {
  renderResultScreen(screen, resultData, onPlayAgain, onNewBetting, onCashOut);
}

function onPlayAgain(gameData) {
  renderRaceScreen(screen, gameData, showResultScreen);
}

function onNewBetting() {
  renderBettingScreen(screen, showRaceScreen);
}

function onCashOut() {
  window.location.href = "./map.html"; 
}

renderBettingScreen(screen, showRaceScreen);
