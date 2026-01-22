import { NewType } from "../types";

/**
 * タイプコードからキャラクター画像のパスを取得
 * 現在はバッター/ピッチャーで8種類ずつ
 *
 * @param type - タイプコード（例: "LNRB"）
 * @param position - ポジション（"batter" or "pitcher"）デフォルトは自動判定
 * @returns 画像のパス（例: "/images/characters/batter/LNRB.PNG"）
 */
export function getCharacterImage(
  type: NewType,
  position?: "batter" | "pitcher",
): string {
  // バッター8種類とピッチャー8種類で同じタイプコードを使用
  // Leadタイプ（L始まり）= バッター/ピッチャー両方に存在
  // 現状は両方に同じ8タイプが存在: LNRB, LNRA, LPRB, LPRA, LNIB, LNIA, LPIB, LPIA

  // positionが指定されていない場合はbatterをデフォルトに
  const folder = position || "batter";

  // 拡張子は.PNG（大文字）
  return `/images/characters/${folder}/${type}.PNG`;
}

/**
 * プレースホルダー画像のパスを取得
 * 画像がまだない場合のフォールバック
 */
export function getPlaceholderImage(): string {
  return "/images/characters/placeholder.png";
}

/**
 * 画像が存在するかチェック（オプション）
 * 本番環境では事前ビルド時にチェック推奨
 */
export function hasCharacterImage(type: NewType): boolean {
  // 実装時は実際のファイル存在チェックを追加可能
  // 現状は全タイプが画像を持つと仮定
  return true;
}
