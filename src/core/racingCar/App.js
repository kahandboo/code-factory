import Car from "./Car.js";
import CarGame from "./CarGame.js";
import Validator from "./Validator.js";
import View from "./View.js";

export default class App {
  async run() {
    try {
      const carNamesInput = await View.getCarNamesInput();
      const roundInput = await View.getRoundInput();
      const carNames = Validator.parseCarNames(carNamesInput);
  
      Validator.validateCarNames(carNames);
      Validator.validateRound(roundInput);
      
      const cars = carNames.map(name => new Car(name)); 
      const game = new CarGame(cars);
      const round = Number(roundInput);
      
      for (let i = 0; i < round; i++) {
        game.progressRound(); 
        View.printScores(game.getCars()); 
      }
  
      const winners = game.getWinners();
      View.printWinners(winners);
    } catch (error) {
      View.printError(error.message);
      await this.run();
    }
  }
}
