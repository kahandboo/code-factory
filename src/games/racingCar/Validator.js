import { CONSTANTS, ERROR_MESSAGES } from "./Constants.js";

class Validator {    
  static validateCarName(carName) {
    if (carName.length > CONSTANTS.MAX_NAME_LENGTH) {
      throw new Error(ERROR_MESSAGES.NAME_LENGTH);
    }
  
    if (carName === "") {
      throw new Error(ERROR_MESSAGES.EMPTY_NAME);
    }
  }
    
  static validateBettingAmount(BettingAmount) {
    if (!BettingAmount || BettingAmount.trim() === "") {
      throw new Error(ERROR_MESSAGES.EMPTY_AMOUNT);
    }
    
    if (isNaN(Number(BettingAmount)) || Number(BettingAmount) < 1000) {
      throw new Error(ERROR_MESSAGES.AMOUNT_OUT_OF_RANGE);
    }
    
    if (Number(BettingAmount) % 1000 != 0) {
      throw new Error(ERROR_MESSAGES.AMOUNT_INVALID_UNIT);
    }
  }    
}

export default Validator;