/**
 * 7段階回答（1〜7）をMBTIスコアに加点する共通関数。
 *
 * 7段階の意味（例）
 *   1: 強くA側（左/そう思う） 〜 4: どちらでもない 〜 7: 強くB側（右/そう思わない）
 *
 * pair:
 *   "EI" / "SN" / "TF" / "JP" のいずれか。
 *   pair[0] が A側（左側）に対応する特性、pair[1] が B側（右側）に対応する特性。
 *
 * 例:
 *   pair="EI" で answer=2（A寄り）なら E に +2
 *   pair="EI" で answer=6（B寄り）なら I に +2
 *
 * scores:
 *   {E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0} のような累積オブジェクト
 *
 * reverse:
 *   質問文の向きが逆（左がI、右がEなど）になっている場合は true を渡す。
 */
export type MBTITrait = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
export type MBTIPair = "EI" | "SN" | "TF" | "JP";
export type MBTIScores = Record<MBTITrait, number>;

export function applyLikert7Score(
  scores: MBTIScores,
  pair: MBTIPair,
  answer: number, // 1..7
  reverse: boolean = false // optional
): MBTIScores {
  if (!Number.isInteger(answer) || answer < 1 || answer > 7) {
    throw new Error(
      `answer must be an integer between 1 and 7. got: ${answer}`
    );
  }

  // 1..7 を -3..+3 に変換（4が0）
  const delta = answer - 4; // -3,-2,-1,0,1,2,3

  // reverse=true のとき左右を入れ替える
  const leftTrait = (reverse ? pair[1] : pair[0]) as MBTITrait; // A側
  const rightTrait = (reverse ? pair[0] : pair[1]) as MBTITrait; // B側

  // 変更はイミュータブルに返す（Reactで扱いやすい）
  const next: MBTIScores = { ...scores };

  if (delta < 0) {
    next[leftTrait] += Math.abs(delta); // A側に加点
  } else if (delta > 0) {
    next[rightTrait] += delta; // B側に加点
  }
  // delta === 0 は加点なし

  return next;
}

/** 最終MBTIを確定する（同点は左側優先） */
export function finalizeMBTI(scores: MBTIScores): string {
  const pick = (a: MBTITrait, b: MBTITrait) => (scores[a] >= scores[b] ? a : b);
  return pick("E", "I") + pick("S", "N") + pick("T", "F") + pick("J", "P");
}

/** 初期スコア生成ユーティリティ */
export function createInitialScores(): MBTIScores {
  return { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
}

