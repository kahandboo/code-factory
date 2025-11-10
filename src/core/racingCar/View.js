import { MissionUtils } from "@woowacourse/mission-utils";
import { INPUT_MESSAGES } from "./Constants.js";

class View {
  static async getCarNamesInput() {
    return MissionUtils.Console.readLineAsync(INPUT_MESSAGES.CAR_NAMES);
  }
      
  static async getRoundInput() {
    return MissionUtils.Console.readLineAsync(INPUT_MESSAGES.ROUND_COUNT);
  }

  static printScores(cars) {
    cars.forEach(car => {
      const scoreBar = "-".repeat(car.getScore());
      MissionUtils.Console.print(`${car.getName()} : ${scoreBar}`);
    });
  }
        
  static printWinners(winners) {
    const winnerNames = winners.map(winner => winner.getName()).join(", ");
    
    MissionUtils.Console.print("최종 우승자 : " + winnerNames);
  }

  static printError(errorMsg) {
    MissionUtils.Console.print(errorMsg);
  }        
}

export default View;