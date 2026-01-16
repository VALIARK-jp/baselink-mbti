/**
 * Type definitions for Baselink AI 16-Type Baseball Quiz
 */

// ポジションタイプ
export type Position = "pitcher" | "batter";

// MBTI指標の値
export type TraitValue = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

// MBTI指標のペア
export type TraitPair = "EI" | "SN" | "TF" | "JP";

// MBTIタイプ（16種類）
export type MBTIType =
  | "ISTJ"
  | "ISFJ"
  | "INFJ"
  | "INTJ"
  | "ISTP"
  | "ISFP"
  | "INFP"
  | "INTP"
  | "ESTP"
  | "ESFP"
  | "ENFP"
  | "ENTP"
  | "ESTJ"
  | "ESFJ"
  | "ENFJ"
  | "ENTJ";

// 回答（7段階Likertスケール: 1-7）
export type LikertAnswer = 1 | 2 | 3 | 4 | 5 | 6 | 7;

// 質問の回答オプション（7段階用）
export interface LikertLabels {
  left: string; // 左側（1に近い側）のラベル
  right: string; // 右側（7に近い側）のラベル
}

// 質問データ構造（7段階Likert用）
export interface Question {
  id: string;
  text: string;
  pair: TraitPair; // "EI", "SN", "TF", "JP"
  reverse?: boolean; // 左右を逆にするか（オプション）
  labels: LikertLabels; // 左側と右側のラベル
}

// 後方互換性のため（旧実装との互換）
export type AnswerChoice = "A" | "B";

// 質問の回答オプション（旧実装用、後方互換性）
export interface AnswerOption {
  label: string;
  trait: TraitValue;
}

// 診断結果データ構造
export interface ResultData {
  title: string; // タイプ名（例: "孤高の奪三振王"）
  player: string; // 似ている選手名（例: "佐々木朗希"）
  desc: string; // タイプの説明
  advice: string; // Baselink AIへの誘導メッセージ
}

// MBTIスコアリングデータ
export interface MBTIScores {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
}

// 診断結果マッピング（ポジション × MBTIタイプ）
export type ResultMapping = {
  [key in Position]: {
    [key in MBTIType]: ResultData;
  };
};

// 質問リスト（ポジション別）
export interface QuestionSet {
  common: Question[];
  pitcher: Question[];
  batter: Question[];
}
