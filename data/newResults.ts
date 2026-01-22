import { NewResultMapping } from "../types";

/**
 * 新16タイプの診断結果マッピング
 * L/F × N/P × R/I × B/A = 16パターン
 */
export const newResultMapping: NewResultMapping = {
  // 青チーム（司令型：Lead × Reason）
  LNRB: {
    title: "現場型参謀",
    player: "例: 坂本勇人",
    team: "青（司令）",
    teamColor: "blue",
    desc: "今を整理し積む。冷静に状況を判断し、論理的にチームを導く現場リーダー。安定した実行力で信頼を集める。",
    advice:
      "Baselink AIがあなたの論理的思考と安定感を言語化し、さらなる成長への道筋を示します。",
  },
  LNRA: {
    title: "即応司令",
    player: "例: 柳田悠岐",
    team: "青（司令）",
    teamColor: "blue",
    desc: "即断即修正。状況に応じて素早く判断を下し、チームを最適解へ導く機敏なリーダー。",
    advice:
      "Baselink AIがあなたの即応力と判断力を分析し、次のステージへの指針を提供します。",
  },
  LPRB: {
    title: "戦略設計者",
    player: "例: 菊池涼介",
    team: "青（司令）",
    teamColor: "blue",
    desc: "勝ち筋構築。事前に戦略を練り、計画的にチームを勝利へ導く理論派リーダー。",
    advice:
      "Baselink AIがあなたの戦略的思考を可視化し、勝利への青写真を描きます。",
  },
  LPRA: {
    title: "戦況調整官",
    player: "例: 山田哲人",
    team: "青（司令）",
    teamColor: "blue",
    desc: "全体を俯瞰。大局を見据えながら柔軟に対応し、チーム全体を最適化する調整役。",
    advice:
      "Baselink AIがあなたの俯瞰力と調整力を言語化し、リーダーシップを強化します。",
  },

  // 赤チーム（熱狂型：Lead × Intuition）
  LNIB: {
    title: "突撃リーダー",
    player: "例: 佐々木朗希",
    team: "赤（熱狂）",
    teamColor: "red",
    desc: "勢いを積む。持ち前の情熱で前に出て、チームの流れを一気に変える突破力のあるリーダー。",
    advice:
      "Baselink AIがあなたの情熱と突破力を数値化し、最高のパフォーマンスを引き出します。",
  },
  LNIA: {
    title: "ムードチェンジャー",
    player: "例: 村上宗隆",
    team: "赤（熱狂）",
    teamColor: "red",
    desc: "流れ即対応。感覚的に場の空気を読み、一瞬でチームの雰囲気を変える天性のリーダー。",
    advice:
      "Baselink AIがあなたの感性と影響力を分析し、さらなる高みへ導きます。",
  },
  LPIB: {
    title: "信念型主将",
    player: "例: 大谷翔平",
    team: "赤（熱狂）",
    teamColor: "red",
    desc: "理想を積む。強い信念を持ち、その情熱で周囲を巻き込みチームを牽引する熱血リーダー。",
    advice:
      "Baselink AIがあなたの信念と行動力を言語化し、夢への道を照らします。",
  },
  LPIA: {
    title: "ビジョン牽引者",
    player: "例: 吉田正尚",
    team: "赤（熱狂）",
    teamColor: "red",
    desc: "理想で巻き込む。大きなビジョンを掲げ、柔軟に対応しながらチームを理想へ導く先導者。",
    advice:
      "Baselink AIがあなたのビジョンと柔軟性を可視化し、チーム力を最大化します。",
  },

  // 緑チーム（堅実型：Focus × Reason）
  FNRB: {
    title: "安定職人",
    player: "例: 秋山翔吾",
    team: "緑（堅実）",
    teamColor: "green",
    desc: "精度×継続。自分の役割に集中し、高い精度で安定したプレーを継続する職人気質。",
    advice:
      "Baselink AIがあなたの安定感と継続力を分析し、プロレベルへの道筋を示します。",
  },
  FNRA: {
    title: "調整職人",
    player: "例: 近藤健介",
    team: "緑（堅実）",
    teamColor: "green",
    desc: "微修正力。状況に応じて細かく調整しながら、確実に役割を果たす適応型職人。",
    advice:
      "Baselink AIがあなたの微調整力と適応力を言語化し、成長を加速させます。",
  },
  FPRB: {
    title: "分析屋",
    player: "例: 鈴木誠也",
    team: "緑（堅実）",
    teamColor: "green",
    desc: "再現性。データと分析に基づいて計画を立て、確実に実行する理論派プレーヤー。",
    advice:
      "Baselink AIがあなたの分析力と再現性を数値化し、勝利への方程式を導きます。",
  },
  FPRA: {
    title: "改善役",
    player: "例: 源田壮亮",
    team: "緑（堅実）",
    teamColor: "green",
    desc: "ズレ検知。計画と実際のズレを素早く察知し、改善しながら成長し続ける改善者。",
    advice:
      "Baselink AIがあなたの改善力と成長性を可視化し、次のレベルへ導きます。",
  },

  // 黄チーム（創造型：Focus × Intuition）
  FNIB: {
    title: "感覚職人",
    player: "例: 今宮健太",
    team: "黄（創造）",
    teamColor: "yellow",
    desc: "感覚を磨く。型にとらわれず、自分の感覚を信じて独自のスタイルを確立する自由人。",
    advice:
      "Baselink AIがあなたの独自性と感性を言語化し、オンリーワンの才能を開花させます。",
  },
  FNIA: {
    title: "自由人",
    player: "例: 中野拓夢",
    team: "黄（創造）",
    teamColor: "yellow",
    desc: "ノリ対応。その時の感覚とノリで自由にプレーし、予測不能な輝きを見せる天才肌。",
    advice:
      "Baselink AIがあなたの自由な発想と適応力を分析し、才能を最大化します。",
  },
  FPIB: {
    title: "理想追求者",
    player: "例: 牧秀悟",
    team: "黄（創造）",
    teamColor: "yellow",
    desc: "世界観持ち。自分なりの理想を追求し、独自の世界観でプレーする芸術家タイプ。",
    advice:
      "Baselink AIがあなたの理想と個性を可視化し、唯一無二のスタイルを確立します。",
  },
  FPIA: {
    title: "クリエイター",
    player: "例: 森下暢仁",
    team: "黄（創造）",
    teamColor: "yellow",
    desc: "試行錯誤。計画を立てつつも柔軟に試行錯誤し、新しい可能性を創造する革新者。",
    advice:
      "Baselink AIがあなたの創造性と探究心を言語化し、無限の可能性を引き出します。",
  },
};
