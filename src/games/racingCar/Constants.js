const CONSTANTS = {
  MAX_NAME_LENGTH: 5,
  MIN_MOVE_NUMBER: 4,      
  RANDOM_RANGE_MIN: 1,
  RANDOM_RANGE_MAX: 6,
};

const ERROR_MESSAGES = {
  NAME_LENGTH: `이름은 ${CONSTANTS.MAX_NAME_LENGTH}자 이하여야 합니다.`,
  EMPTY_NAME: "이름을 입력해주세요.",
  EMPTY_AMOUNT: "베팅 금액을 입력해주세요.",
  AMOUNT_OUT_OF_RANGE: "베팅 금액은 1000원 이상이어야 합니다.",
  AMOUNT_INVALID_UNIT: "베팅 금액은 1000원 단위여야 합니다.",
};

const CAR_NAMES = [
  "Ace", "Aero", "Apex", "Ares", "Atlas", "Audi", "Axel", "Beam", "Benz", "Bolt", 
  "Boost", "Bravo", "Byte", "Chaos", "Chip", "Cobra", "Code", "Comet", "Core", "Cruz",
  "Dash", "Dart", "Delta", "Doom", "Drag", "Drift", "Duke", "Echo", "Edge", "Elan", 
  "Envy", "Eros", "Evo", "Fiat", "Fire", "Flash", "Flex", "Flux", "Ford", "Fox", 
  "Fury", "Fuse", "Gear", "Gem", "Ghost", "Giga", "Grip", "Gust", "Halo", "Hawk", 
  "Heat", "Hera", "Hero", "Hex", "Hub", "Hydra", "Ice", "Icon", "Ion", "Iris", 
  "Iron", "Jade", "Jazz", "Jet", "Jinx", "Jolt", "Juke", "Juno", "Kia", "King", 
  "Knight", "Kilo", "Laps", "Light", "Link", "Lion", "Loki", "Loop", "Lord", "Lux", 
  "Lynx", "Mach", "Mars", "Max", "Mini", "Mist", "Moon", "Myth", "Mark", "Nano", 
  "Neon", "Nitro", "Node", "Nova", "Nyx", "Odin", "Onyx", "Opel", "Orion", "Pace"
];

export { CONSTANTS, ERROR_MESSAGES, CAR_NAMES };