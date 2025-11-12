const CONSTANTS = {
  MAX_NAME_LENGTH: 5,
  MIN_MOVE_NUMBER: 4,      
  RANDOM_RANGE_MIN: 0,
  RANDOM_RANGE_MAX: 9,
};

const ERROR_MESSAGES = {
  NAME_LENGTH: `이름은 ${CONSTANTS.MAX_NAME_LENGTH}자 이하여야 합니다.`,
  EMPTY_NAME: "이름을 입력해주세요.",
  EMPTY_AMOUNT: "베팅 금액을 입력해주세요.",
  AMOUNT_OUT_OF_RANGE: "베팅 금액은 1000원 이상이어야 합니다.",
  AMOUNT_INVALID_UNIT: "베팅 금액은 1000원 단위여야 합니다.",
};

export { CONSTANTS, ERROR_MESSAGES };