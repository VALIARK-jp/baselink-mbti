import { QuestionSet } from "../types";

/**
 * 質問データセット（7段階Likertスケール対応）
 * 共通6問 + 投手専用4問 + 野手専用4問
 */
export const questions: QuestionSet = {
  // 共通質問（6問）- 全ユーザーが回答
  common: [
    {
      id: "q1",
      text: "練習中、一番やる気が出るのは？",
      pair: "EI",
      reverse: false,
      labels: {
        left: "仲間と競い合っている時",
        right: "一人で黙々と課題に向き合う時",
      },
    },
    {
      id: "q2",
      text: "理想の成長の仕方は？",
      pair: "SN",
      reverse: false,
      labels: {
        left: "試合でどんどん経験を積みたい",
        right: "理屈を理解してから練習したい",
      },
    },
    {
      id: "q3",
      text: "監督のアドバイスに対して",
      pair: "TF",
      reverse: false,
      labels: {
        left: "納得感や勝率を重視する",
        right: "自分の感覚や熱意を重視する",
      },
    },
    {
      id: "q4",
      text: "試合当日の朝は？",
      pair: "JP",
      reverse: false,
      labels: {
        left: "決まったルーティンをこなす",
        right: "その時の気分でリラックスする",
      },
    },
    {
      id: "q5",
      text: "初対面の他校の選手と",
      pair: "EI",
      reverse: false,
      labels: {
        left: "すぐに打ち解けて話せる",
        right: "相手の様子を見てから接する",
      },
    },
    {
      id: "q6",
      text: "自分のプレーが崩れた時",
      pair: "JP",
      reverse: false,
      labels: {
        left: "基本の形に戻そうとする",
        right: "新しいやり方をその場で試す",
      },
    },
  ],

  // 投手専用質問（4問）
  pitcher: [
    {
      id: "q7",
      text: "理想のピッチングは？",
      pair: "SN",
      reverse: false,
      labels: {
        left: "150kmの直球でねじ伏せる",
        right: "変幻自在の変化球で翻弄する",
      },
    },
    {
      id: "q8",
      text: "ピンチの場面での思考",
      pair: "TF",
      reverse: false,
      labels: {
        left: "相手のデータと弱点を思い出す",
        right: "自分の「絶対に抑える」気持ちを信じる",
      },
    },
    {
      id: "q9",
      text: "どちらのタイプと言われる？",
      pair: "JP",
      reverse: false,
      labels: {
        left: "大崩れしない安定感のある投手",
        right: "調子が良いと手がつけられない投手",
      },
    },
    {
      id: "q10",
      text: "研究したいデータは？",
      pair: "SN",
      reverse: false,
      labels: {
        left: "球速や回転数など自分の出力",
        right: "相手の反応や配球の傾向",
      },
    },
  ],

  // 野手専用質問（4問）
  batter: [
    {
      id: "q7",
      text: "打席での意識は？",
      pair: "SN",
      reverse: false,
      labels: {
        left: "来た球を全力でしばきにいく",
        right: "相手の配球を読んで裏をかく",
      },
    },
    {
      id: "q8",
      text: "チームでの自分の役割は？",
      pair: "TF",
      reverse: false,
      labels: {
        left: "打点や結果で勝利に貢献する",
        right: "雰囲気や繋ぎでチームを支える",
      },
    },
    {
      id: "q9",
      text: "練習メニューの取り組み方",
      pair: "JP",
      reverse: false,
      labels: {
        left: "毎日決まった数を必ずこなす",
        right: "その日の感覚を重視して調整する",
      },
    },
    {
      id: "q10",
      text: "憧れるプレーは？",
      pair: "SN",
      reverse: false,
      labels: {
        left: "泥臭い守備やガッツある走塁",
        right: "誰も真似できない華やかな打撃",
      },
    },
  ],
};
