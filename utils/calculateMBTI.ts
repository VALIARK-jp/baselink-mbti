import { MBTIType, Question, LikertAnswer } from "../types";
import {
  createInitialScores,
  applyLikert7Score,
  finalizeMBTI,
  MBTIScores,
  MBTIPair,
} from "./likert7Score";

/**
 * MBTI判定ロジック（7段階Likertスケール対応）
 * 質問回答リストと質問データからMBTIタイプを計算する
 *
 * @param answers - ユーザーの回答リスト（1-7の数値配列）
 * @param questions - 質問データの配列
 * @returns 判定されたMBTIタイプ
 */
export function calculateMBTI(
  answers: LikertAnswer[],
  questions: Question[]
): MBTIType {
  // スコアを初期化
  let scores: MBTIScores = createInitialScores();

  // 各回答に対してスコアを加算
  questions.forEach((question, index) => {
    const answer = answers[index];
    if (!answer || answer < 1 || answer > 7) return; // 回答がない、または無効な場合はスキップ

    // 7段階Likertスコアを適用
    scores = applyLikert7Score(
      scores,
      question.pair as MBTIPair,
      answer,
      question.reverse || false
    );
  });

  // 最終MBTIタイプを確定
  return finalizeMBTI(scores) as MBTIType;
}

/**
 * URLクエリパラメータから回答リストをパースする（7段階Likert用）
 *
 * @param queryString - URLクエリパラメータ（例: "2,5,3,7,..."）
 * @returns 回答リスト（1-7の数値配列）
 */
export function parseAnswersFromQuery(
  queryString: string | string[] | undefined
): LikertAnswer[] {
  if (!queryString) return [];

  const answersStr = Array.isArray(queryString) ? queryString[0] : queryString;
  return answersStr
    .split(",")
    .map((a) => parseInt(a, 10))
    .filter((n): n is LikertAnswer => Number.isInteger(n) && n >= 1 && n <= 7);
}

/**
 * 回答リストをURLクエリパラメータ用の文字列に変換する（7段階Likert用）
 *
 * @param answers - 回答リスト（1-7の数値配列）
 * @returns URLクエリパラメータ用の文字列（例: "2,5,3,7,..."）
 */
export function answersToQueryString(answers: LikertAnswer[]): string {
  return answers.join(",");
}
