export const DIALOGUES = {
  racing_machine: {
    text: "먼지 쌓인 레이싱 게임기다.\n 참가비는 1,000C 이상이라고 적혀있다.",
    options: [
      { label: "게임을 플레이한다", action: "START_RACING" },
      { label: "그냥 지나간다", next: null } 
    ]
  },

  lotto_machine: {
    text: "화려한 불빛이 깜빡이는 로또 기계다.\n인생 역전을 노려볼까?",
    options: [
      { label: "한 판 땡긴다", next: "lotto_confirm" },
      { label: "관심 없다", next: null }
    ]
  },
  lotto_confirm: {
    text: "시스템 준비 중입니다...",
    options: [
      { label: "뒤로 가기", next: null }
    ]
  },

  npc_intro: {
    text: "관리자\n'오... 신입인가?\n여기서 나가는 방법은 하나뿐이야.'",
    options: [
      { label: "방법을 알려줘", next: "npc_explain" },      
    ]
  },
  npc_explain: {
    text: "관리자\n'일단 돈을 왕창 따서 갖고와.\n그럼 알려줄테니.'",
    options: [
      { label: "..알겠어", next: null },
      { label: "무슨 소리야? 어서 나가게 해줘!", next: "npc_angry" }
    ]
  },
  npc_angry: {
    text: "관리자\n'워워 진정해... \n가볍게 게임이나 한판 하고 오라고.'",
    next: null 
  },

  npc_default: {
    text: "관리자\n'아직 멀었어. 이걸론 부족해.'",
    next: null
  },
  npc_pass: {
    text: "관리자\n'오! 이거면 충분하지.'",
    next: null
  },

  shop: {
    text: "자판기처럼 보인다. 전선이 끊어져 스파크가 튀고 있다.",
    options: [
      { label: "수리를 시도한다", next: "repair_fail" },
      { label: "무시한다", next: null }
    ]
  },
  repair_fail: {
    text: "아앗! 고치려다 감전 당할뻔 했다..",
    next: null
  },

  exit: {
    text: "이건.. 출구다 !!",
    options: [
      { label: "문을 연다.", next: "exit_fail" },
    ]
  },
  exit_fail: {
    text: "왜인지 문이 열리지 않는다..",
    next: null
  }
};