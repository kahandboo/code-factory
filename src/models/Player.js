const INITIAL_COINS = 10000; 

class Player {
  constructor() {
    const savedCoins = localStorage.getItem("playerCoins");
    const savedHistory = localStorage.getItem("playerHistory");
    const savedItems = localStorage.getItem("playerItems");

    this.coins = savedCoins ? parseInt(savedCoins, 10) : INITIAL_COINS;
    this.history = savedHistory ? JSON.parse(savedHistory) : [];
    this.items = savedItems ? JSON.parse(savedItems) : [];
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

  hasItem(item) {
    return this.items.includes(item);
  }

  addItem(item)  {
    if (!this.hasItem(item)) {
      this.items.push(item);
      this.save();
    }
  }

  getItem() {
    return [...this.items];
  }

  save() {
    localStorage.setItem("playerCoins", this.coins);
    localStorage.setItem("playerHistory", JSON.stringify(this.history));
    localStorage.setItem("playerItems", JSON.stringify(this.items));
  }

  reset() {
    this.coins = INITIAL_COINS;
    this.history = [];
    this.items = [];
    this.save();
  }
}

export const player = new Player();