const INITIAL_COINS = 10000; 

class Player {
  constructor() {
    const savedCoins = localStorage.getItem("playerCoins");
    const savedHistory = localStorage.getItem("playerHistory");

    this.coins = savedCoins ? parseInt(savedCoins, 10) : INITIAL_COINS;
    this.history = savedHistory ? JSON.parse(savedHistory) : [];
  }

  getCoins() {
    return this.coins;
  }

  addCoins(amount) {
    this.coins += amount;
    this.save();
  }

  deductCoins(amount) {
    if (this.coins >= amount) {
      this.coins -= amount;
      this.save();
      return true;
    }
    return false; 
  }

  hasTag(tag) {
    return this.history.includes(tag);
  }

  addTag(tag) {
    if (!this.hasTag(tag)) {
      this.history.push(tag);
      this.save(); 
    }
  }

  save() {
    localStorage.setItem("playerCoins", this.coins);
    localStorage.setItem("playerHistory", JSON.stringify(this.history));
  }

  reset() {
    this.coins = INITIAL_COINS;
    this.history = [];
    this.save();
  }
}

export const player = new Player();