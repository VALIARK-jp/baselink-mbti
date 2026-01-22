import { NewType, Question, LikertAnswer, NewScores, AxisKey } from "../types";

/**
 * 新16キャラ分岐システムの計算ロジック
 * L/F × N/P × R/I × B/A による16タイプ判定
 */

/**
 * 初期スコアを生成
 */
export function createInitialScores(): NewScores {
  return {
    L: 0,
    F: 0,
    N: 0,
    P: 0,
    R: 0,
    I: 0,
    B: 0,
    A: 0,
  };
}

/**
 * 7段階Likertスケールをスコアに変換して加算
 * 
 * @param scores - 現在のスコア
 * @param left - 左側の軸（1に近い側）
 * @param right - 右側の軸（7に近い側）
 * @param value - 回答値（1-7）
 * @returns 更新されたスコア
 */
export function applyLikertScore(
  scores: NewScores,
  left: AxisKey,
  right: AxisKey,
  value: number
): NewScores {
  if (!Number.isInteger(value) || value < 1 || value > 7) {
    throw new Error(`回答値は1-7の整数である必要があります: ${value}`);
  }

  const delta = value - 4; // -3 ~ +3 に変換
  const next = { ...scores };

  if (delta < 0) {
    // 左側に加点（1, 2, 3）
    next[left] += Math.abs(delta);
  } else if (delta > 0) {
    // 右側に加点（5, 6, 7）
    next[right] += delta;
  }
  // delta === 0 (回答4) は加点なし

  return next;
}

/**
 * 最終的なタイプコードを生成
 * 
 * @param scores - 集計されたスコア
 * @returns 4文字のタイプコード（例: "LNRB"）
 */
export function getTypeCode(scores: NewScores): NewType {
  const type =
    (scores.L >= scores.F ? "L" : "F") +
    (scores.N >= scores.P ? "N" : "P") +
    (scores.R >= scores.I ? "R" : "I") +
    (scores.B >= scores.A ? "B" : "A");

  return type as NewType;
}

/**
 * 質問回答リストから新タイプを計算
 * 
 * @param answers - ユーザーの回答リスト（1-7の数値配列）
 * @param questions - 質問データの配列
 * @returns 判定された新タイプ
 */
export function calculateNewType(
  answers: LikertAnswer[],
  questions: Question[]
): NewType {
  let scores = createInitialScores();

  questions.forEach((question, index) => {
    const answer = answers[index];
    if (!answer || answer < 1 || answer > 7) return;

    const [left, right] = question.axis;
    scores = applyLikertScore(scores, left, right, answer);
  });

  return getTypeCode(scores);
}

/**
 * URLクエリパラメータから回答リストをパース
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
 * 回答リストをURLクエリパラメータ用の文字列に変換
 * 
 * @param answers - 回答リスト（1-7の数値配列）
 * @returns URLクエリパラメータ用の文字列（例: "2,5,3,7,..."）
 */
export function answersToQueryString(answers: LikertAnswer[]): string {
  return answers.join(",");
}

/**
 * タイプコードからチーム情報を取得
 * 
 * @param type - タイプコード（例: "LNRB"）
 * @returns チーム情報
 */
export function getTeamInfo(type: NewType): {
  name: string;
  color: string;
  description: string;
} {
  const firstChar = type[0];
  const thirdChar = type[2];

  // L/F × R/I でチーム決定
  if (firstChar === "L" && thirdChar === "R") {
    return {
      name: "青（司令）",
      color: "blue",
      description: "論理で引っ張る",
    };
  } else if (firstChar === "L" && thirdChar === "I") {
    return {
      name: "赤（熱狂）",
      color: "red",
      description: "情熱で引っ張る",
    };
  } else if (firstChar === "F" && thirdChar === "R") {
    return {
      name: "緑（堅実）",
      color: "green",
      description: "分析で支える",
    };
  } else {
    // F && I
    return {
      name: "黄（創造）",
      color: "yellow",
      description: "自由に輝く",
    };
  }
}
