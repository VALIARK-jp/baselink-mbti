import { QuestionSet } from "../types";

/**
 * 質問データセット（新16キャラ分岐システム）
 * 全員共通10問: L/F × N/P × R/I × B/A
 * 
 * 軸の意味:
 * - L/F: 主導性（Lead / Focus）
 * - N/P: 判断（Now / Plan）
 * - R/I: 強み（Reason / Intuition）
 * - B/A: 成長（Build / Adapt）
 */
export const questions: QuestionSet = {
  // 全員共通10問
  common: [
    // Q1-Q3: 主導性（L / F）
    {
      id: "q1",
      text: "試合の流れが悪いとき、どれくらい自分が前に出て流れを変えたい？",
      axis: ["F", "L"],
      labels: {
        left: "自分の役割に集中したい",
        right: "自分が前に出て変えに行きたい",
      },
    },
    {
      id: "q2",
      text: "チームが迷っているとき、自分の判断をどれくらい周りに示す？",
      axis: ["F", "L"],
      labels: {
        left: "あまり出さない",
        right: "はっきり示す",
      },
    },
    {
      id: "q3",
      text: "試合中、自分が中心になって声や行動で引っ張ることは多い？",
      axis: ["F", "L"],
      labels: {
        left: "ほとんどない",
        right: "かなり多い",
      },
    },

    // Q4-Q6: 判断（N / P）
    {
      id: "q4",
      text: "プレー中の判断は、今見えている状況をどれくらい重視する？",
      axis: ["P", "N"],
      labels: {
        left: "次の展開まで考える",
        right: "今の状況を最優先する",
      },
    },
    {
      id: "q5",
      text: "打席や守備で、事前に考えたプランをどれくらい意識する？",
      axis: ["N", "P"],
      labels: {
        left: "あまり意識しない",
        right: "強く意識する",
      },
    },
    {
      id: "q6",
      text: "想定と違う展開になったとき、どちらを優先する？",
      axis: ["N", "P"],
      labels: {
        left: "その場の判断",
        right: "最初の計画",
      },
    },

    // Q7-Q8: 強み（R / I）
    {
      id: "q7",
      text: "調子が良いとき、その理由をあとから言葉で説明できる？",
      axis: ["I", "R"],
      labels: {
        left: "できない（感覚的）",
        right: "はっきり説明できる",
      },
    },
    {
      id: "q8",
      text: "プレーを振り返るとき、どちらが多い？",
      axis: ["I", "R"],
      labels: {
        left: "感覚やフィーリング",
        right: "理由や仕組み",
      },
    },

    // Q9-Q10: 成長（B / A）
    {
      id: "q9",
      text: "新しいことを練習するとき、どんな進め方が多い？",
      axis: ["A", "B"],
      labels: {
        left: "いろいろ試しながら変える",
        right: "決めた形を続ける",
      },
    },
    {
      id: "q10",
      text: "調子が悪いときの対処はどちらに近い？",
      axis: ["A", "B"],
      labels: {
        left: "方法を変えて試す",
        right: "基本に戻って積み直す",
      },
    },
  ],
};
