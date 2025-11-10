import { CONSTANTS, ERROR_MESSAGES } from "./Constants.js";

class Validator {
  static parseCarNames(carNamesInput) {
    if (!carNamesInput.includes(",")) throw new Error(ERROR_MESSAGES.MIN_CAR_COUNT);
    const carNames = carNamesInput.split(",");
        
    return carNames.map(carName => carName.trim());
  }
    
  static validateCarNames(carNames) {
    carNames.forEach(carName => {
      if (carName.length > CONSTANTS.MAX_NAME_LENGTH) {
        throw new Error(ERROR_MESSAGES.NAME_LENGTH);
      }
    
      if (carName === "") {
        throw new Error(ERROR_MESSAGES.EMPTY_NAME);
      }
    });
    
    const uniqueCarNames = new Set(carNames);
        
    if (uniqueCarNames.size != carNames.length) {
      throw new Error(ERROR_MESSAGES.DUPLICATE_NAME);
    }
  }
    
  static validateRound(roundInput) {
    if (!roundInput || roundInput.trim() === "") {
      throw new Error(ERROR_MESSAGES.EMPTY_ROUND);
    }
    
    if (isNaN(Number(roundInput))) {
      throw new Error(ERROR_MESSAGES.ROUND_NOT_NUMBER);
    }
    
    if (Number(roundInput) <= 0) {
      throw new Error(ERROR_MESSAGES.ROUND_POSITIVE);
    }
  }    
}

export default Validator;