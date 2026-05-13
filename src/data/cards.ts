export type Suit = "spade" | "heart" | "diamond" | "club";
export type Rank =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K";

export type CardSection = {
  title: string;
  content: string[];
};

export type ArchiveCard = {
  id: string;
  suit: Suit;
  suitSymbol: string;
  suitName: string;
  rank: Rank;
  title: string;
  unlocked: boolean;
  type?: string;
  players?: string;
  duration?: string;
  location?: string;
  clearLimit?: string;
  clearCondition?: string;
  summary?: string;
  sections?: CardSection[];
  imagePrompt?: string;
};

const suits: Array<Pick<ArchiveCard, "suit" | "suitSymbol" | "suitName">> = [
  { suit: "spade", suitSymbol: "♠", suitName: "黑桃" },
  { suit: "heart", suitSymbol: "♥", suitName: "红桃" },
  { suit: "diamond", suitSymbol: "♦", suitName: "方片" },
  { suit: "club", suitSymbol: "♣", suitName: "梅花" },
];

const ranks: Rank[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const lockedTitleBySuit: Record<Suit, string> = {
  spade: "体能档案未解锁",
  heart: "心理档案未解锁",
  diamond: "智斗档案未解锁",
  club: "协作档案未解锁",
};

const makeId = (suit: Suit, rank: Rank) => `${suit}-${rank.toLowerCase()}`;

const unlockedCards: Record<string, Partial<ArchiveCard>> = {
  "spade-k": {
    title: "极限垂直",
    unlocked: true,
    type: "体能 / 耐力 / 攀爬 / 极限生存",
    players: "13人",
    duration: "90分钟",
    location: "废弃通讯塔 + 高空维修通道",
    clearLimit: "理论上不限，实际极少",
    clearCondition: "登上最高层并触碰终点信标",
    summary:
      "黑桃 K 是纯体能极限。它不靠心理、投票或隐藏身份，而是让玩家知道怎么赢，但身体做不到。",
    sections: [
      {
        title: "场地",
        content: [
          "一座接近废弃的超高通讯塔，从楼梯井、断裂平台、外部钢架、垂直维修梯一路抵达塔顶天线。",
          "没有复杂谜题，没有隐藏身份，没有投票，就是爬上去。",
        ],
      },
      {
        title: "核心规则",
        content: [
          "每个人身上有腕带，显示心率、肌肉负荷和平衡稳定度。",
          "一旦某个数值超过临界点，系统会强制给玩家增加负重，形成越累越慢、越紧张越沉重的恶性循环。",
        ],
      },
      {
        title: "救援惩罚",
        content: [
          "玩家可以拉别人一把、替别人挡风，或帮别人取下卡住的装备。",
          "但每次救援，自己的腕带都会增加负荷值。每救一个人，自己离失败就更近一步。",
        ],
      },
      {
        title: "K 级残忍点",
        content: [
          "黑桃 K 的残忍是身体开始背叛你。终点就在上面，但手抖、腿软、呼吸乱、握不住梯子。",
          "你不是不知道怎么通关，而是清楚地知道自己可能真的爬不上去了。",
        ],
      },
    ],
    imagePrompt:
      "废弃超高通讯塔，暴雨夜晚，锈蚀钢架，狭窄维修平台，断裂通道，垂直维修梯，高空强风，塔顶发光信标，远处末日城市霓虹，写实电影风格，无文字，无logo。",
  },
  "heart-k": {
    title: "亲友证明",
    unlocked: true,
    type: "心理 / 感情 / 朋友欺诈 / 信任崩塌",
    players: "8人",
    duration: "70分钟",
    location: "封闭式白色会客厅",
    clearLimit: "不固定",
    clearCondition: "拿到“亲友证明”并进入出口",
    summary:
      "红桃 K 不是“谁在骗我”，而是“我知道他在骗我，但我还是想相信他”。重点是亲密关系里的欺诈和通关后的精神反噬。",
    sections: [
      {
        title: "初始规则",
        content: [
          "8 名玩家进入场地后，系统根据过往表现，把他们两两配对。配对对象通常是一路走来的朋友、刚建立信任的搭档，或彼此最不想怀疑的人。",
          "每一对面前都有一张“亲友证明”，只有持有证明的人才能进入出口。",
        ],
      },
      {
        title: "私人提示",
        content: [
          "每个玩家都会收到一条只有自己能看到的提示：你无法通过主动索要证明通关，必须让对方自愿把证明交给你。",
          "抢不行，逼不行，只有骗到对方自愿给你才行。",
        ],
      },
      {
        title: "记忆揭露",
        content: [
          "每隔十分钟，房间会播放一段双方过往片段。这些片段不一定是假的，但会被剪得非常伤人。",
          "系统不是让双方互猜身份，而是在一点点破坏信任基础。",
        ],
      },
      {
        title: "最终反噬",
        content: [
          "通关者会收到完整录像，发现对方最后其实已经看穿了谎言，但还是把证明交给了自己。",
          "真正的后劲不是“我被骗了”，而是“我骗了他。他知道我骗了他。但他还是选择救我。”",
        ],
      },
    ],
    imagePrompt:
      "封闭纯白会客厅，八名玩家两两相对而坐，桌面有象征生路的证明卡，墙面投映模糊回忆碎片，冷白空间与暗红情绪灯光，写实电影风格，无文字，无logo。",
  },
  "diamond-k": {
    title: "三席",
    unlocked: true,
    type: "逻辑 / 数学 / 信息博弈 / 推理",
    players: "13人",
    duration: "80分钟",
    location: "圆形演算室",
    clearLimit: "最多3人",
    clearCondition: "坐上三张“王席”之一",
    summary:
      "方片 K 是纯智斗。没有感情分，没有团队分，没有道德分。聪明的人活，不够聪明的人出局。",
    sections: [
      {
        title: "场地",
        content: [
          "房间中央有三张王席，周围有 13 个独立计算台。",
          "大屏幕显示：本场游戏最多允许三人通关。请证明你有资格坐上王席。",
        ],
      },
      {
        title: "核心规则",
        content: [
          "游戏分为五轮。每一轮系统会给所有人一道大型逻辑题，但每个人拿到的信息不同。",
          "完全正确获得王分，部分正确保留资格，错误则失去一条命题权限。三次错误，直接出局。",
        ],
      },
      {
        title: "答案污染",
        content: [
          "从第三轮开始，玩家可以提交伪证明。伪证明逻辑上看起来成立，但缺少一个关键前提。",
          "如果别人引用了你的伪证明，他的最终答案会被污染。",
        ],
      },
      {
        title: "最终规则",
        content: [
          "第五轮结束后，申请王席的人必须提交最终答案、完整证明链，并指出至少一名玩家证明链中的漏洞。",
          "最后不是单纯做对题，而是证明：我对，而且别人不如我对。",
        ],
      },
    ],
    imagePrompt:
      "冷白色圆形演算室，十三个独立计算台环绕中心，中央高台只有三张王席，悬浮数字、公式与证明链，极简冷峻，理性压迫感，写实电影风格，无文字，无logo。",
  },
  "club-k": {
    title: "逆转方舟",
    unlocked: true,
    type: "团队合作 / 团队对抗 / 资源运营 / 战术逆转",
    players: "20人",
    duration: "90分钟",
    location: "双核心地下设施",
    clearLimit: "胜队全员理论可通关",
    clearCondition: "本队方舟启动进度达到100%",
    summary:
      "梅花 K 是团队合作与团队对抗。规则没有强制牺牲，但如果想靠超频翻盘，可能要有人留下。",
    sections: [
      {
        title: "场地",
        content: [
          "场地分成左右两个阵营。每队都有动力室、控制室、维修区、运输区和核心舱。",
          "两队目标相同：比对方更快启动自己的方舟。",
        ],
      },
      {
        title: "分工效率",
        content: [
          "每个玩家会被系统分配隐藏职能，包括搬运型、计算型、维修型、指挥型、干扰型和支援型。",
          "如果队伍分工合理，进度很快；如果所有人都抢着当指挥，或者没人愿意做苦活，进度会崩。",
        ],
      },
      {
        title: "超频核心",
        content: [
          "最后 20 分钟，系统开放隐藏机制：超频核心。启动后，本队方舟进度瞬间提升 30%，并且所有任务效率翻倍。",
          "超频核心需要一个人进入核心舱内部手动维持。维持期间，他不能离开。",
        ],
      },
      {
        title: "K 级残忍点",
        content: [
          "如果一队前期配合特别好，可以不启动超频，正常赢，全员通关。",
          "残忍不是系统写死的，而是团队自己算出来的：我们想全队赢。但我们赢的代价，是少一个人。",
        ],
      },
    ],
    imagePrompt:
      "地下双核心工业设施，左右两个阵营，动力室、维修区、控制室、运输通道和核心舱，红色警报灯，超频核心发出白蓝光芒，团队合作与对抗，写实电影风格，无文字，无logo。",
  },
};

export const cards: ArchiveCard[] = suits.flatMap((suit) =>
  ranks.map((rank) => {
    const id = makeId(suit.suit, rank);
    const base: ArchiveCard = {
      id,
      suit: suit.suit,
      suitSymbol: suit.suitSymbol,
      suitName: suit.suitName,
      rank,
      title: lockedTitleBySuit[suit.suit],
      unlocked: false,
    };

    return {
      ...base,
      ...unlockedCards[id],
    };
  }),
);

export const unlockedCardIds = cards.filter((card) => card.unlocked).map((card) => card.id);

export function getCardById(id: string | undefined) {
  return cards.find((card) => card.id === id);
}
