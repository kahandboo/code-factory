import { MissionUtils } from "@woowacourse/mission-utils";
import { CONSTANTS } from "./Constants.js";

class Car {
  #name; 
  #score;

  constructor(name) {
    this.#name = name;
    this.#score = 0;
  }

  move() {
    const randomNumber = MissionUtils.Random.pickNumberInRange(CONSTANTS.RANDOM_RANGE_MIN, CONSTANTS.RANDOM_RANGE_MAX);
        
    if (randomNumber >= CONSTANTS.MIN_MOVE_NUMBER) {
      this.#score += 1;
    }       
  }

  getName() {
    return this.#name;
  }

  getScore() {
    return this.#score;
  }
}

export default Car;