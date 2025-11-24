export const DIALOGUES = {
  racing_machine: {
    text: "먼지 쌓인 레이싱 게임기다.\n 유치하군..",
    options: [
      { label: "게임을 플레이한다", action: "START_RACING" },
      { label: "그냥 지나간다", next: null } 
    ]
  },

  lotto_machine: {
    text: "화려한 불빛이 깜빡이는 로또 기계다.\n당첨 확률이 극악이라던데..",
    options: [
      { label: "한 판 땡긴다", action: "START_LOTTO" },
      { label: "관심 없다", next: null }
    ]
  },

  npc_manager_intro: {
    text: "관리자\n'뭔가 궁금한게 있나?'",
    options: [
      { label: "여긴 어디죠?", next: "npc_manager_explain" },
      { label: "당신은 누구죠?", next: "npc_manager_identity" }
    ]
  },
  npc_manager_explain: {
    text: "관리자\n'이곳이 처음인가?\n여긴 카지노야.\n상상이 현실이 되는 곳이지.'",
    next: null
  },
  npc_manager_identity: {
    text: "관리자\n'나는 이 곳을 관리하지.\n자네 같은 사람들을 위해서.'",
    next: null 
  },

  npc_manager_default: {
    text: "관리자\n'뭐하는 거야?\n나한테 말 걸 시간에 가서 돈을 따야하지 않겠어?'",
    options: [
      { label: "여기서 나갈 수 있는 방법을 알려줘", next: "npc_manager_denied" },
    ]
  },
  npc_manager_denied: {
    text: "관리자\n'나간다..?\n밖은 지옥이야.\n천국에서 편하게 게임이나 하라고 친구.'",
    next: null
  },

  npc_unknown_intro: {
    text: "어두운 구석에 한 남자가 주저앉아 있다.\n알 수 없는 표정을 하고 있다.",
    options: [
      { label: "말을 건다", next: "npc_unknown_talk_1" },
      { label: "무시한다", next: null }
    ]
  },
  npc_unknown_talk_1: {
    text: "남자\n'뭐야?\n애송이 같은 놈이군.'",
    options: [
      { label: "여기서 나가고 싶지 않나요?", next: "npc_unknown_laugh" },
    ]
  },
  npc_unknown_laugh: {
    text: "남자\n'하하.. 나간다고?\n나가면.. 뭐가 있지?\n너가 기대하는 건 없을거다.'",
    next: null
  },
  npc_unknown_talk_2: {
    text: "남자\n'바보같이 속았군.. 큭큭\n우린 여기서 못 나가. 애초에 그렇게 프로그래밍 됐으니까.'",
    options: [
      { label: "그게 무슨 소리죠?", next: "npc_unknown_reveal" },
    ]
  },
  npc_unknown_reveal: {
    text: "남자\n'우린 게임 속 데이터일 뿐이라고. 저 문은 애초에 열리는 코드가 없어.\n하지만... 개발자가 실수로 남겨둔 [구멍]은 있지.'",
    options: [
      { label: "구멍..?", next: "npc_unknown_glitch" },
    ]    
  },
  npc_unknown_glitch: {
    text: "남자\n'저기 벽 틈새 보여? 텍스처가 깨진 곳.\n거기로 몸을 던져. 시스템 밖으로 떨어질 거야.'",
    options: [
      { label: "(숨겨진 통로가 활성화되었다!)", action: "UNLOCK_HIDDEN_PATH" }
    ]
  },
  npc_unknown_default: {
    text: "남자는 낮은 목소리로 알 수 없는 말을 중얼거리고 있다.",
    next: null
  }, 

  shop: {
    text: "낡은 자판기다. 뭔갈 사볼까?",
    options: [
      { label: "살펴본다", next: "shop_items" },
      { label: "관심없다", next: null }
    ]
  },
  shop_items: {
    text: "판매 목록:\n1. 맛없는 과자 - 500C\n2. 정체를 알 수 없는 음료수 - 1,000C\n3. 열쇠 - 100,000C", 
    options: [
      { label: "과자를 산다", action: "BUY_SNACK" },
      { label: "음료수를 산다", action: "BUY_DRINK" },
      { label: "열쇠를 산다", action: "BUY_KEY" }
    ]
  },
  buy_snack: {
    text: "인벤토리에 과자가 추가됐습니다.",
    options: [
      { label: "다른 것도 구매한다", next: "shop_items" },
      { label: "다른 건 관심없다", next: null}
    ]
  },
  buy_drink: {
    text: "인벤토리에 음료수가 추가됐습니다.",
    options: [
      { label: "다른 것도 구매한다", next: "shop_items"},
      { label: "다른 건 관심없다", next: null}
    ]
  },
  buy_key: {
    text: "인벤토리에 열쇠가 추가됐습니다.",
    options: [
      { label: "다른 것도 구매한다", next: "shop_items"},
      { label: "다른 건 관심없다", next: null}
    ]
  },
  shop_out_of_money: {
    text: "돈이 부족해 구매할 수 없습니다.",
    next: null
  },

  exit_locked: {
    text: "이건.. 출구다 !!",
    options: [
      { label: "문을 연다.", next: "exit_fail" },
    ]
  },
  exit_fail: {
    text: "문이 굳게 닫혀 열리지 않는다..",
    next: null
  },

  exit_unlocked: {
    text: "자판기에서 산 열쇠를 사용해볼까?",
    options: [
      { label: "사용한다", next: "exit_use_key" },
      { label: "사용하지 않는다", next: null }
    ]
  },
  exit_use_key: {
    text: "열쇠가 돌아가지 않는다.\n문은 여전히 굳게 닫혀있다.",
    next: "npc_manager_mock_1"
  },
  npc_manager_mock_1: {
    text: "관리자\n'푸하하하!! 너 뭐하는거야?!\n그건 그냥 [Item_ID: 004_Decor]야.\n기능 구현도 안 된 '더미 데이터'라고! 그걸 샀다니!'",
    next: "npc_manager_mock_2"
  },
  npc_manager_mock_2: {
    text: "관리자\n'허튼 짓 하지말고 하던대로 게임이나 즐겨.'",
    next: null
  }
}
