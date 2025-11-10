import Car from "./Car.js";

class CarGame {
  #cars;

  constructor(cars) {
    this.#cars = cars;
  }

  progressRound() {
    this.#cars.forEach(car => car.move(car));
  }

  getCars() {
    return [...this.#cars];
  }

  getWinners() {
    const maxScore = Math.max(...this.#cars.map(car => car.getScore()));
    const winners = this.#cars.filter(car => car.getScore() === maxScore);
    
    return winners;    
  }
}

export default CarGame;