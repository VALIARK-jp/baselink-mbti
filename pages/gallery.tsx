import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { newResultMapping } from "../data/newResults";
import { NewType } from "../types";
import { getCharacterImage } from "../utils/getCharacterImage";

/**
 * キャラクター一覧ギャラリーページ
 * 全16タイプ × 投手/打者を一覧表示
 */
const GalleryPage: NextPage = () => {
  const router = useRouter();
  const [selectedPosition, setSelectedPosition] = useState<
    "pitcher" | "batter"
  >("batter");
  const [selectedTeam, setSelectedTeam] = useState<
    "all" | "blue" | "red" | "green" | "yellow"
  >("all");

  // チーム別にタイプを分類
  const teamTypes = {
    blue: ["LNRB", "LNRA", "LPRB", "LPRA"] as NewType[],
    red: ["LNIB", "LNIA", "LPIB", "LPIA"] as NewType[],
    green: ["FNRB", "FNRA", "FPRB", "FPRA"] as NewType[],
    yellow: ["FNIB", "FNIA", "FPIB", "FPIA"] as NewType[],
  };

  // 表示するタイプをフィルタリング
  const getDisplayTypes = (): NewType[] => {
    if (selectedTeam === "all") {
      return Object.values(teamTypes).flat();
    }
    return teamTypes[selectedTeam];
  };

  // チーム情報
  const teamInfo = {
    blue: {
      name: "青（司令）",
      color: "blue",
      bgColor: "bg-blue-500",
      borderColor: "border-blue-400",
    },
    red: {
      name: "赤（熱狂）",
      color: "red",
      bgColor: "bg-red-500",
      borderColor: "border-red-400",
    },
    green: {
      name: "緑（堅実）",
      color: "green",
      bgColor: "bg-green-500",
      borderColor: "border-green-400",
    },
    yellow: {
      name: "黄（創造）",
      color: "yellow",
      bgColor: "bg-yellow-500",
      borderColor: "border-yellow-400",
    },
  };

  const handleCardClick = (type: NewType) => {
    // 診断結果ページへ遷移（デモ用にダミーの回答を生成）
    const dummyAnswers = "4,4,4,4,4,4,4,4,4,4"; // 中央値
    router.push(
      `/result?position=${selectedPosition}&answers=${dummyAnswers}&preview=${type}`,
    );
  };

  return (
    <>
      <Head>
        <title>キャラクター図鑑 - Baselink AI 野球診断</title>
        <meta
          name="description"
          content="全16タイプのキャラクターを一覧で確認できます"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-baselink-light via-white to-slate-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <div className="inline-block bg-baselink-primary/10 px-4 py-2 rounded-full mb-4">
              <span className="text-baselink-primary font-bold text-sm">
                Baselink AI
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
              キャラクター図鑑
            </h1>
            <p className="text-slate-600">全16タイプを確認しよう</p>
          </div>

          {/* フィルター */}
          <div className="mb-8 space-y-4">
            {/* ポジション切替 */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setSelectedPosition("batter")}
                className={`px-6 py-3 rounded-xl font-bold transition-all ${
                  selectedPosition === "batter"
                    ? "bg-red-500 text-white shadow-lg scale-105"
                    : "bg-white text-slate-600 border-2 border-slate-200 hover:border-red-300"
                }`}
              >
                打者
              </button>
              <button
                onClick={() => setSelectedPosition("pitcher")}
                className={`px-6 py-3 rounded-xl font-bold transition-all ${
                  selectedPosition === "pitcher"
                    ? "bg-blue-500 text-white shadow-lg scale-105"
                    : "bg-white text-slate-600 border-2 border-slate-200 hover:border-blue-300"
                }`}
              >
                投手
              </button>
            </div>

            {/* チームフィルター */}
            <div className="flex justify-center gap-2 flex-wrap">
              <button
                onClick={() => setSelectedTeam("all")}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  selectedTeam === "all"
                    ? "bg-slate-700 text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                }`}
              >
                全て
              </button>
              {Object.entries(teamInfo).map(([key, info]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTeam(key as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    selectedTeam === key
                      ? `${info.bgColor} text-white`
                      : `bg-white text-slate-600 border ${info.borderColor} hover:${info.bgColor} hover:text-white`
                  }`}
                >
                  {info.name}
                </button>
              ))}
            </div>
          </div>

          {/* キャラクターグリッド */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {getDisplayTypes().map((type) => {
              const result = newResultMapping[type];
              const teamColor = result.teamColor as keyof typeof teamInfo;
              const team = teamInfo[teamColor];

              return (
                <div
                  key={type}
                  onClick={() => handleCardClick(type)}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-slate-200 hover:border-baselink-primary hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105"
                >
                  {/* チームバッジ */}
                  <div
                    className={`${team.bgColor} text-white px-3 py-2 text-xs font-bold flex justify-between items-center`}
                  >
                    <span>{team.name}</span>
                    <span className="text-[10px] opacity-90">{type}</span>
                  </div>

                  {/* キャラクター画像 */}
                  <div
                    className="relative w-full bg-gradient-to-br from-slate-50 to-slate-100"
                    style={{ aspectRatio: "4/5" }}
                  >
                    <Image
                      src={getCharacterImage(type, selectedPosition)}
                      alt={result.title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* タイプ情報 */}
                  <div className="p-3 text-center">
                    <h3 className="font-bold text-slate-900 text-sm mb-1">
                      {result.title}
                    </h3>
                    <p className="text-xs text-slate-500">{result.player}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* トップに戻るボタン */}
          <div className="mt-12 text-center">
            <button
              onClick={() => router.push("/")}
              className="bg-gradient-to-r from-baselink-primary to-baselink-accent text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              診断をはじめる
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryPage;
