import { DIALOGUES } from "../data/dialogues.js";
import { player } from "../models/Player.js";

const MAP_LAYOUT = [
  "#################################################################################",
  "#                                                                               #",
  "#     ________                   ___________                   ________         #",
  "#    |   __   |                 | ¥       ¥ |                 |   __   |        #",
  "#    |__|  |__|                 | §     § |                 |__|  |__|        #",
  "#    |____R___|                 |_§__&__§_|                 |___L____|        #",
  "#                                                                               #",
  "#         ~            .                            ,              ~            #",
  "#                                                                               #",
  "#                                                                               #",
  "#                                                                               #",
  "#           .                                 .                                 #",
  "#      ~                                                       ________         #",
  "#             ,                                               |        |        #",
  "#                                                             | [||||] |        #",
  "#                       ~                  ,                  | [====] |        #",
  "#                                                             |___V____|        #",
  "#           .                                                                   #",
  "#                                                                               #",
  "#                                                                               #",
  "#                                                                               #",
  "#                                                                               #",
  "#                                                                               #",
  "#                                   [ EXIT ]                                    #",
  "#################################################################################"
];

export class MapScreen {
  constructor(container, onEnterGame) {
    this.container = container;
    this.onEnterGame = onEnterGame; 
    
    this.mapData = MAP_LAYOUT.map(row => row.split(""));
    this.playerPos = { x: Math.round(MAP_LAYOUT[0].length / 2) , y: Math.round(MAP_LAYOUT.length / 2) }; // @ 위치
    
    this.dialogueState = {
      isActive: false,      
      currentId: null,      
      selectedOptionIndex: 0,
      isSimple: false, 
    };

    this.handleInput = this.handleInput.bind(this);
  }

  render() {
    this.container.innerHTML = `
      <div class="screen" id="map-screen">
        <div class="map-ui">
          <span class="coin-display">C: ${player.getCoins().toLocaleString()}</span>
          <p>이동: [WASD] / 상호작용: [SPACE]</p>
        </div>
        <pre id="ascii-map"></pre>
        <div id="dialogue-box" style="display:none;"></div>
      </div>
    `;
    
    this.mapElement = document.getElementById("ascii-map");
    this.dialogueBox = document.getElementById("dialogue-box");
    
    this.drawMap();
    
    window.addEventListener("keydown", this.handleInput);
  }

  drawMap() {
    const currentMap = this.mapData.map(row => [...row]); 
    currentMap[this.playerPos.y][this.playerPos.x] = "<span class=\"player\">@</span>";
    
    const renderString = this.mapData.map((row, y) => {
      return row.map((char, x) => {
        if (x === this.playerPos.x && y === this.playerPos.y) {
          return "<span class=\"player\">@</span>";
        }
        return this.processChar(char);
      }).join("");
    }).join("\n");

    this.mapElement.innerHTML = renderString;
  }

  processChar(char) {
    if (char === "#") return "<span class=\"wall\">#</span>";
    if (char === "R") return "<span class=\"machine-racing\">R</span>";
    if (char === "L") return "<span class=\"machine-lotto\">L</span>";
    if (char === "&") return "<span class=\"npc\">☻</span>"; 
    if (char === "V") return "<span class=\"machine-shop\">V</span>"; 
    if (char === "X") return "<span class=\"machine-broken\">X</span>"; 
    if (["~", ".", ",", "`"].includes(char)) return "<span class=\"trash\">" + char + "</span>";
    
    if (["[", "]", "|", "_", "E", "S", "H", "O", "P", ":", "(", ")"].includes(char)) {
      return "<span class=\"deco\">" + char + "</span>";
    }
    
    return char;
  }

  handleInput(e) {
    if (this.dialogueState.isActive) {
      this.handleDialogueInput(e);
      return;
    }
    
    let dx = 0;
    let dy = 0;

    if (e.key === "ArrowUp" || e.key === "w") dy = -1;
    if (e.key === "ArrowDown" || e.key === "s") dy = 1;
    if (e.key === "ArrowLeft" || e.key === "a") dx = -1;
    if (e.key === "ArrowRight" || e.key === "d") dx = 1;
    
    if (e.key === " " || e.key === "Enter") {
      this.checkInteraction();
      return;
    }

    if (dx !== 0 || dy !== 0) {
      const newX = this.playerPos.x + dx;
      const newY = this.playerPos.y + dy;

      if (newX >= 0 && newX < this.mapData[0].length && newY >= 0 && newY < this.mapData.length) {
        const targetChar = this.mapData[newY][newX];
        const blockers = ["#", "R", "L", "N", "V", "X", "T", "I", "E", "|", "_", "[", "]", "E", ":"];
        
        if (!blockers.includes(targetChar)) {
          this.playerPos.x = newX;
          this.playerPos.y = newY;
          this.drawMap();
        }
      }
    }
  }

  handleDialogueInput(e) {
    if (this.dialogueState.isSimple) {
      if (e.key === " " || e.key === "Enter" || e.key === "Escape") {
        this.closeDialogue();
      }
      return;
    }
    const dialogue = DIALOGUES[this.dialogueState.currentId];
    const hasOptions = dialogue.options && dialogue.options.length > 0;

    if (hasOptions) {
      const optionsCount = dialogue.options.length;
      if (e.key === "ArrowUp" || e.key === "w") {
        this.dialogueState.selectedOptionIndex = 
          (this.dialogueState.selectedOptionIndex - 1 + optionsCount) % optionsCount;
        this.renderDialogue(); 
      }
      else if (e.key === "ArrowDown" || e.key === "s") {
        this.dialogueState.selectedOptionIndex = 
          (this.dialogueState.selectedOptionIndex + 1) % optionsCount;
        this.renderDialogue();
      }
      else if (e.key === " " || e.key === "Enter") {
        const selectedOption = dialogue.options[this.dialogueState.selectedOptionIndex];
        this.executeOption(selectedOption);
      }
    } else {
      if (e.key === " " || e.key === "Enter") {
        if (dialogue.next) {
          this.startDialogue(dialogue.next); 
        } else {
          this.closeDialogue(); 
        }
      }
    }
  }

  showSimpleMessage(text) {
    this.dialogueBox.innerHTML = `<p class="dialogue-text">${text}</p><div class="next-cursor">▼</div>`;
    this.dialogueBox.style.display = "block";
    this.dialogueState = { isActive: true, currentId: null, isSimple: true }; 
  }

  startDialogue(dialogueId) {
    if (!DIALOGUES[dialogueId]) return;

    this.dialogueState = {
      isActive: true,
      currentId: dialogueId,
      selectedOptionIndex: 0
    };
    this.dialogueBox.style.display = "block";
    this.renderDialogue();
  }

  renderDialogue() {
    const data = DIALOGUES[this.dialogueState.currentId];
    let contentHtml = `<p class="dialogue-text">${data.text.replace(/\n/g, "<br>")}</p>`;
    
    if (data.options && data.options.length > 0) {
      const optionsHtml = data.options.map((opt, index) => {
        const isSelected = index === this.dialogueState.selectedOptionIndex;
        const cursor = isSelected ? "▶" : "&nbsp;";
        const styleClass = isSelected ? "option selected" : "option";
        return `<div class="${styleClass}">${cursor} ${opt.label}</div>`;
      }).join("");
      contentHtml += `<div class="dialogue-options">${optionsHtml}</div>`;
    } else {
      contentHtml += "<div class=\"next-cursor\">▼</div>";
    }

    this.dialogueBox.innerHTML = contentHtml;
  }

  executeOption(option) {
    if (option.action === "START_RACING") {
      this.closeDialogue();
      this.onEnterGame("racing");
      return;
    }

    if (option.action === "START_LOTTO") {
      this.closeDialogue();
      this.onEnterGame("lotto");
      return;
    }
    
    if (option.next) {
      this.startDialogue(option.next);
    } else {
      this.closeDialogue();
    }
  }

  closeDialogue() {
    this.dialogueState.isActive = false;
    this.dialogueBox.style.display = "none";
  }

  checkInteraction() {
    const directions = [
      [-1, -1], [0, -1], [1, -1], 
      [-1,  0],          [1,  0], 
      [-1,  1], [0,  1], [1,  1]  
    ];
    
    for (let [dx, dy] of directions) {
      const tx = this.playerPos.x + dx;
      const ty = this.playerPos.y + dy;

      if (ty < 0 || ty >= this.mapData.length || tx < 0 || tx >= this.mapData[0].length) continue;

      const target = this.mapData[ty][tx];

      if (target === "R") {
        this.startDialogue("racing_machine");
        return;
      }
      
      if (target === "L") {
        this.startDialogue("lotto_machine");
        return;
      }

      if (target === "&") {
        if (player.hasTag("met_manager")) {
          if (player.getCoins() >= 100000) {
            this.startDialogue("npc_pass");
          } else {
            this.startDialogue("npc_default");
          }
        } else {
          player.addTag("met_manager"); 
          this.startDialogue("npc_intro");
        }
        return;
      }

      if (target === "X" || target === "E") {
        this.startDialogue("exit");
        return;
      }

      if (target === "V" || target === ":") {
        this.startDialogue("shop");
        return;
      }
    }
  }

  destroy() {
    window.removeEventListener("keydown", this.handleInput);
  }
}
