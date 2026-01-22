import { ResultData, NewType, LikertAnswer, Position } from "../types";
import { getTeamInfo } from "../utils/calculateNewType";
import { getCharacterImage } from "../utils/getCharacterImage";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

interface ResultCardProps {
  result: ResultData;
  newType: NewType;
  position: Position;
  answers: LikertAnswer[];
}

/**
 * 診断結果表示コンポーネント（新16タイプシステム対応）
 * 野球カード風のデザインで結果を表示
 * ポジション別に画像と文言を出し分け
 */
export default function ResultCard({
  result,
  newType,
  position,
  answers,
}: ResultCardProps) {
  const teamInfo = getTeamInfo(newType);
  const [isImageError, setIsImageError] = useState(false);
  const router = useRouter();

  // ポジションラベル（日本語表示用）
  const positionLabel = position === "pitcher" ? "投手" : "打者";

  const handleBaselinkClick = () => {
    // Baselink AI公式サイトへ誘導
    const baselinkUrl = "https://baselinkai.com/";
    window.open(baselinkUrl, "_blank");
  };

  const handleShare = () => {
    const shareText = `私のタイプは「${result.title}」(${newType})！\n${positionLabel}として診断。チームは${result.team}。\n似ている選手は${result.player}選手です。\n\n#BaselinkAI診断 #野球診断`;

    if (navigator.share) {
      navigator
        .share({
          title: "Baselink AI 野球診断結果",
          text: shareText,
          url: window.location.href,
        })
        .catch(() => {
          // シェアがキャンセルされた場合の処理
        });
    } else {
      // フォールバック: クリップボードにコピー
      navigator.clipboard.writeText(shareText).then(() => {
        alert("結果をクリップボードにコピーしました！");
      });
    }
  };

  // チームカラーに応じた背景グラデーション
  const getTeamGradient = (color: string) => {
    switch (color) {
      case "blue":
        return "from-blue-600 to-blue-500";
      case "red":
        return "from-red-600 to-red-500";
      case "green":
        return "from-green-600 to-green-500";
      case "yellow":
        return "from-yellow-500 to-yellow-400";
      default:
        return "from-baselink-primary to-baselink-accent";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-baselink-light via-white to-slate-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-6xl w-full">
        {/* Baselink AI ヘッダー */}
        <div className="text-center mb-6">
          <div className="inline-block bg-baselink-primary/10 px-4 py-2 rounded-full mb-2">
            <span className="text-baselink-primary font-bold text-sm">
              Baselink AI
            </span>
          </div>
          <p className="text-slate-600 text-sm">診断結果</p>
        </div>

        {/* 横並びレイアウト */}
        <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
          {/* 左側：診断結果カード */}
          <div
            className="w-full lg:w-auto lg:flex-shrink-0"
            style={{ maxWidth: "400px" }}
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 h-full">
              {/* カードヘッダー */}
              <div
                className={`bg-gradient-to-r ${getTeamGradient(result.teamColor)} text-white px-6 py-5`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium opacity-90">
                    {positionLabel} / {result.team}
                  </span>
                  <span className="text-xs font-medium opacity-90">
                    TYPE: {newType}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white mt-2">
                  {result.title}
                </h2>
              </div>

              {/* カードボディ */}
              <div className="p-6">
                {/* キャラクター画像 */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl mb-5 flex flex-col items-center justify-center border border-slate-200 overflow-hidden">
                  {!isImageError ? (
                    <div
                      className="relative w-full"
                      style={{ aspectRatio: "4/5" }}
                    >
                      <Image
                        src={getCharacterImage(newType, position)}
                        alt={result.title}
                        fill
                        className="object-contain"
                        onError={() => setIsImageError(true)}
                        priority
                      />
                    </div>
                  ) : (
                    // フォールバック: 画像読み込みエラー時
                    <div className="h-80 flex flex-col items-center justify-center">
                      <div className="text-6xl mb-2">⚾</div>
                      <p className="font-bold text-lg text-slate-800">
                        {result.player}
                      </p>
                      <p className="text-slate-600 text-sm mt-1">選手</p>
                    </div>
                  )}
                </div>

                {/* 選手名表示 */}
                <div className="text-center mb-6">
                  <p className="font-bold text-xl text-slate-800">
                    {result.player}
                  </p>
                  <p className="text-slate-500 text-sm mt-1">選手タイプ</p>
                </div>

                {/* 説明 */}
                <div className="mb-6">
                  <p className="text-slate-700 leading-relaxed text-center text-base">
                    {result.desc}
                  </p>
                </div>

                {/* AIからのアドバイス */}
                <div className="bg-gradient-to-br from-baselink-primary/5 to-baselink-accent/5 border border-baselink-primary/20 rounded-2xl p-5">
                  <div className="flex items-center mb-3">
                    <div className="w-2 h-2 bg-baselink-primary rounded-full mr-2"></div>
                    <p className="text-baselink-primary text-xs font-bold uppercase tracking-wide">
                      AIからのアドバイス
                    </p>
                  </div>
                  <p className="text-slate-800 text-sm leading-relaxed">
                    {result.advice}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 右側：Baselink AI誘導セクション */}
          <div
            className="w-full lg:w-auto lg:flex-shrink-0 lg:sticky lg:top-8"
            style={{ maxWidth: "400px" }}
          >
            <div className="bg-gradient-to-br from-baselink-primary/5 via-baselink-accent/5 to-baselink-primary/5 rounded-2xl p-6 border border-baselink-primary/20 h-full">
              <div className="text-center mb-5">
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  次のステップ：AIで成長を加速させよう
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  診断で分かったあなたのタイプ。
                  <br />
                  <span className="font-semibold text-baselink-primary">
                    Baselink AI
                  </span>
                  で動画を分析し、練習の成果を記録すれば、
                  <br />
                  プロに近づくための具体的な改善点が見えてきます。
                </p>
                <div className="flex items-center justify-center gap-4 text-xs text-slate-600 mb-5 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4 text-baselink-primary flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>100点満点のAIフォーム分析</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4 text-baselink-primary flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>動画比較機能</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4 text-baselink-primary flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>全国ランキング</span>
                  </div>
                </div>
              </div>

              {/* Baselink AI誘導ボタン */}
              <button
                onClick={handleBaselinkClick}
                className="w-full bg-gradient-to-r from-baselink-primary to-baselink-accent hover:from-baselink-secondary hover:to-baselink-primary text-white font-bold py-5 px-8 rounded-2xl shadow-xl transform transition-all hover:scale-[1.02] active:scale-100 flex items-center justify-center gap-3 border border-baselink-primary/20"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                <span className="text-lg">Baselink AIを始める</span>
              </button>
            </div>
          </div>
        </div>

        {/* シェアボタン */}
        <div className="mt-6 max-w-md mx-auto lg:max-w-full space-y-3">
          <button
            onClick={handleShare}
            className="w-full bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-baselink-primary/30 text-slate-700 hover:text-slate-900 font-bold py-4 px-8 rounded-2xl shadow-md hover:shadow-lg transform transition-all hover:scale-[1.02] active:scale-100 text-sm"
          >
            結果をシェアする
          </button>

          <button
            onClick={() => router.push("/gallery")}
            className="w-full bg-slate-100 hover:bg-slate-200 border-2 border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 font-bold py-4 px-8 rounded-2xl shadow-md hover:shadow-lg transform transition-all hover:scale-[1.02] active:scale-100 text-sm"
          >
            📚 全キャラクターを見る
          </button>

          <p className="text-center text-slate-500 text-xs mt-4">
            結果をシェアして仲間に知らせよう！
          </p>
        </div>
      </div>
    </div>
  );
}
