import { ResultData, NewType, LikertAnswer, Position } from "../types";
import { getTeamInfo } from "../utils/calculateNewType";
import { getCharacterImage } from "../utils/getCharacterImage";
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
 * ポップでワクワクする野球カード風デザイン
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
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        alert("結果をクリップボードにコピーしました！");
      });
    }
  };

  // チームカラーに応じたグラデーション
  const getTeamGradient = (color: string) => {
    switch (color) {
      case "blue":
        return {
          bg: "from-blue-500 via-blue-400 to-cyan-400",
          text: "text-blue-600",
          border: "border-blue-300",
          badge: "bg-blue-500",
        };
      case "red":
        return {
          bg: "from-red-500 via-red-400 to-pink-400",
          text: "text-red-600",
          border: "border-red-300",
          badge: "bg-red-500",
        };
      case "green":
        return {
          bg: "from-green-500 via-green-400 to-emerald-400",
          text: "text-green-600",
          border: "border-green-300",
          badge: "bg-green-500",
        };
      case "yellow":
        return {
          bg: "from-yellow-400 via-yellow-300 to-amber-300",
          text: "text-yellow-600",
          border: "border-yellow-300",
          badge: "bg-yellow-500",
        };
      default:
        return {
          bg: "from-baselink-primary via-baselink-accent to-cyan-400",
          text: "text-baselink-primary",
          border: "border-baselink-primary/30",
          badge: "bg-baselink-primary",
        };
    }
  };

  const teamStyle = getTeamGradient(result.teamColor);

  return (
    <div className="h-screen bg-gradient-to-br from-white via-blue-50 to-slate-50 relative overflow-hidden flex items-center">
      {/* 背景装飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br ${teamStyle.bg} rounded-full blur-3xl opacity-20 animate-pulse`}></div>
        <div className={`absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br ${teamStyle.bg} rounded-full blur-3xl opacity-20 animate-pulse`} style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-3 py-2 w-full h-full flex flex-col">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-1 flex-shrink-0">
          {/* 戻るボタン */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm hover:bg-white px-3 py-1.5 rounded-full shadow-md hover:shadow-lg transform transition-all hover:scale-105 active:scale-100 text-slate-700 hover:text-slate-900"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="text-xs font-bold">トップに戻る</span>
          </button>

          {/* 中央のロゴ */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
            <span className="text-baselink-primary font-bold text-xs">⚾ Baselink AI</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-600 text-xs">診断結果</span>
          </div>

          {/* 診断をやり直すボタン */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm hover:bg-white px-3 py-1.5 rounded-full shadow-md hover:shadow-lg transform transition-all hover:scale-105 active:scale-100 text-slate-700 hover:text-slate-900"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span className="text-xs font-bold">やり直す</span>
          </button>
        </div>

        {/* メインカード - スクロール可能 */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-white relative">
            {/* チームカラーバナー */}
            <div className={`bg-gradient-to-r ${teamStyle.bg} text-white px-4 py-3 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold">
                      {positionLabel}
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold">
                      {result.team}
                    </span>
                  </div>
                  <span className="bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-mono font-bold">
                    {newType}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-white drop-shadow-lg">
                  {result.title}
                </h1>
              </div>
            </div>

            {/* キャラクターセクション */}
            <div className="bg-gradient-to-br from-slate-50 to-white p-4">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                {/* キャラクター画像 */}
                <div className="flex-shrink-0 w-full md:w-2/5">
                  <div className="relative bg-gradient-to-br from-white to-slate-100 rounded-xl p-3 shadow-lg border-2 border-slate-200 overflow-hidden">
                    {!isImageError ? (
                      <div className="relative" style={{ aspectRatio: "4/5", minHeight: "220px" }}>
                        <img
                          src={getCharacterImage(newType, position)}
                          alt={result.title}
                          className="w-full h-full object-contain animate-fade-in"
                          onError={() => setIsImageError(true)}
                        />
                      </div>
                    ) : (
                      <div className="h-48 flex flex-col items-center justify-center">
                        <div className="text-5xl mb-2 animate-bounce">⚾</div>
                        <p className="font-bold text-xl text-slate-800">{result.player}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* 選手情報 */}
                <div className="flex-1 text-center md:text-left w-full md:w-3/5">
                  <div className="inline-block bg-gradient-to-r from-baselink-primary to-baselink-accent text-white px-4 py-2 rounded-full mb-2">
                    <p className="text-xl md:text-2xl font-black">{result.player}</p>
                  </div>
                  <p className="text-slate-600 text-sm font-semibold mb-3">選手タイプ</p>
                  
                  {/* 説明 */}
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-100 mb-3">
                    <p className="text-slate-800 leading-relaxed text-sm md:text-base font-medium">
                      {result.desc}
                    </p>
                  </div>

                  {/* AIアドバイス */}
                  <div className="bg-gradient-to-br from-baselink-primary/5 via-baselink-accent/5 to-baselink-primary/5 rounded-lg p-3 border border-baselink-primary/20">
                    <div className="flex items-start gap-2 mb-2">
                      <div className={`w-2 h-2 ${teamStyle.badge} rounded-full animate-pulse flex-shrink-0 mt-1`}></div>
                      <h2 className="text-sm font-black text-slate-900">✨ AIからのアドバイス</h2>
                    </div>
                    <div className="bg-white rounded-lg p-2.5 shadow-sm border border-baselink-primary/20">
                      <p className="text-slate-800 leading-relaxed text-xs md:text-sm">
                        {result.advice}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 次のステップセクション */}
            <div className="bg-white p-4 border-t border-slate-100">
              <h2 className="text-lg font-black text-slate-900 mb-3 text-center">
                🚀 次のステップ：AIで成長を加速させよう
              </h2>
              <p className="text-slate-700 text-center mb-4 text-sm leading-relaxed">
                診断で分かったあなたのタイプ。
                <span className="font-bold text-baselink-primary">Baselink AI</span>
                で動画を分析し、練習の成果を記録すれば、プロに近づくための具体的な改善点が見えてきます。
              </p>

              {/* 機能リスト */}
              <div className="grid grid-cols-3 gap-2.5 mb-4">
                {[
                  { icon: "📊", text: "AIフォーム分析" },
                  { icon: "🎬", text: "動画比較" },
                  { icon: "🏆", text: "全国ランキング" },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-baselink-primary/10 to-baselink-accent/10 rounded-lg p-3 border border-baselink-primary/20 text-center"
                  >
                    <div className="text-2xl mb-1.5">{feature.icon}</div>
                    <p className="text-xs font-bold text-slate-800 leading-tight">{feature.text}</p>
                  </div>
                ))}
              </div>

              {/* CTAボタン */}
              <button
                onClick={handleBaselinkClick}
                className="w-full bg-gradient-to-r from-baselink-primary via-baselink-accent to-baselink-primary hover:from-baselink-secondary hover:via-baselink-primary hover:to-baselink-accent text-white font-black py-3 px-6 rounded-xl text-base shadow-xl transform transition-all hover:scale-[1.02] active:scale-100 flex items-center justify-center gap-2 relative overflow-hidden group mb-3"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <svg
                  className="w-5 h-5 relative z-10"
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
                <span className="relative z-10">Baselink AIを始める</span>
              </button>

              {/* シェアボタン */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={handleShare}
                  className="bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-baselink-primary/30 text-slate-700 hover:text-slate-900 font-bold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transform transition-all hover:scale-[1.02] active:scale-100 text-sm"
                >
                  📤 シェア
                </button>
                <button
                  onClick={() => router.push("/gallery")}
                  className="bg-slate-100 hover:bg-slate-200 border-2 border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 font-bold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transform transition-all hover:scale-[1.02] active:scale-100 text-sm"
                >
                  📚 全キャラ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
