import { NewType } from "../types";

/**
 * タイプコードからキャラクター画像のパスを取得
 * GitHub Pages用にbasePathを考慮
 *
 * @param type - タイプコード（例: "LNRB"）
 * @param position - ポジション（"batter" or "pitcher"）デフォルトは自動判定
 * @returns 画像のパス（例: "/baselink-mbti/images/characters/batter/LNRB.PNG"）
 */
export function getCharacterImage(
  type: NewType,
  position?: "batter" | "pitcher",
): string {
  // positionが指定されていない場合はbatterをデフォルトに
  const folder = position || "batter";

  // GitHub Pages環境ではbasePathを追加
  // process.env.NEXT_PUBLIC_BASE_PATHが設定されていればそれを使用
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  
  // 拡張子は.PNG（大文字）
  return `${basePath}/images/characters/${folder}/${type}.PNG`;
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
