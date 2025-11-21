import { renderBettingScreen } from "./screens/BettingScreen.js";
import { renderRaceScreen } from "./screens/RaceScreen.js";
import { renderResultScreen } from "./screens/ResultScreen.js";

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
