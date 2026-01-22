/**
 * Type definitions for Baselink AI 16-Type Baseball Quiz
 * 新システム: L/F × N/P × R/I × B/A による16タイプ
 */

// ポジションタイプ（削除予定 - 全員共通10問に移行）
export type Position = "pitcher" | "batter";

// 新4軸システムの値
export type AxisKey = "L" | "F" | "N" | "P" | "R" | "I" | "B" | "A";

// 新4軸のペア
export type AxisPair = "LF" | "NP" | "RI" | "BA";

// 新16タイプ（4軸組み合わせ）
export type NewType =
  | "LNRB"
  | "LNRA"
  | "LPRB"
  | "LPRA" // 青チーム（司令型：Lead × Reason）
  | "LNIB"
  | "LNIA"
  | "LPIB"
  | "LPIA" // 赤チーム（熱狂型：Lead × Intuition）
  | "FNRB"
  | "FNRA"
  | "FPRB"
  | "FPRA" // 緑チーム（堅実型：Focus × Reason）
  | "FNIB"
  | "FNIA"
  | "FPIB"
  | "FPIA"; // 黄チーム（創造型：Focus × Intuition）

// 旧MBTI型（後方互換性のため残す）
export type TraitValue = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
export type TraitPair = "EI" | "SN" | "TF" | "JP";
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

// 新システム用の質問データ構造
export interface Question {
  id: string;
  text: string;
  axis: [AxisKey, AxisKey]; // [左側の軸, 右側の軸] 例: ["F", "L"]
  labels: LikertLabels; // 左側と右側のラベル
}

// 旧システム用の質問データ構造（後方互換性）
export interface OldQuestion {
  id: string;
  text: string;
  pair: TraitPair;
  reverse?: boolean;
  labels: LikertLabels;
}

// 新スコアリングデータ（4軸8項目）
export interface NewScores {
  L: number;
  F: number;
  N: number;
  P: number;
  R: number;
  I: number;
  B: number;
  A: number;
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
  title: string; // タイプ名（例: "現場型参謀"）
  player: string; // 似ている選手名（例: "佐々木朗希"）
  team: string; // チーム名（例: "青（司令）"）
  teamColor: string; // チームカラー（例: "blue"）
  desc: string; // タイプの説明
  advice: string; // Baselink AIへの誘導メッセージ
}

// 新システムの結果マッピング（NewType → ResultData）
export type NewResultMapping = {
  [key in NewType]: ResultData;
};

// 旧システムの診断結果マッピング（後方互換性）
export type ResultMapping = {
  [key in Position]: {
    [key in MBTIType]: ResultData;
  };
};

// 質問リスト（新システムでは全員共通10問）
export interface QuestionSet {
  common: Question[]; // 全員共通10問
  pitcher?: OldQuestion[]; // 旧システム用（後方互換性）
  batter?: OldQuestion[]; // 旧システム用（後方互換性）
}
