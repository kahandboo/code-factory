import { MapScreen } from "./screens/MapScreen.js";

const mapContainer = document.getElementById("map-screen");
let currentScreen = null;

function startMap() {
  mapContainer.innerHTML = "";
  if (currentScreen && currentScreen.destroy) {
    currentScreen.destroy();
  }

  const mapScreen = new MapScreen(mapContainer, (gameType) => {
    if (gameType === "racing") {
      mapScreen.destroy(); 
      setTimeout(() => {
        window.location.href = "./index.html"; 
      }, 1000);
    } else if (gameType === "lotto") {
      alert("준비중");
    }
  });

  mapScreen.render();
  currentScreen = mapScreen; 
}

startMap();