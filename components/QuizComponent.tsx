import { useState, useEffect } from "react";
import { Question, LikertAnswer } from "../types";

interface QuizComponentProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (answer: LikertAnswer) => void;
}

/**
 * 質問表示・回答処理コンポーネント（7段階Likertスケール対応）
 */
export default function QuizComponent({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
}: QuizComponentProps) {
  const [selectedValue, setSelectedValue] = useState<LikertAnswer | null>(null);
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  // 質問が変わったら選択状態をリセット
  useEffect(() => {
    setSelectedValue(null);
  }, [currentIndex]);

  const handleValueChange = (value: LikertAnswer) => {
    setSelectedValue(value);
  };

  const handleSubmit = () => {
    if (selectedValue !== null) {
      onAnswer(selectedValue);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-baselink-light via-white to-slate-50 flex flex-col px-4 py-8">
      <div className="max-w-2xl w-full mx-auto flex-1 flex flex-col">
        {/* ヘッダー */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="text-baselink-primary font-bold text-sm">
              Baselink AI
            </div>
            <div className="text-slate-500 text-sm">診断中</div>
          </div>

          {/* プログレスバー */}
          <div className="mb-2">
            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span className="font-medium">
                質問 {currentIndex + 1} / {totalQuestions}
              </span>
              <span className="font-semibold text-baselink-primary">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-baselink-primary to-baselink-accent h-full transition-all duration-500 ease-out rounded-full shadow-sm"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* 質問文 */}
        <div className="flex-1 flex items-center justify-center py-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center leading-relaxed max-w-xl mb-8">
            {question.text}
          </h2>
        </div>

        {/* 7段階Likertスケール */}
        <div className="space-y-6 mt-8">
          {/* ラベル（左右） */}
          <div className="flex justify-between text-sm text-slate-600 mb-4">
            <span className="font-medium max-w-[40%] text-left">
              {question.labels.left}
            </span>
            <span className="font-medium max-w-[40%] text-right">
              {question.labels.right}
            </span>
          </div>

          {/* スケールボタン（1-7）- グラデーションサイズ & カラー */}
          <div className="flex items-center justify-between gap-2 mb-6">
            {[1, 2, 3, 4, 5, 6, 7].map((value) => {
              // 4を中心に、両端ほど大きくなるサイズ設定
              // 1,7: 最大、2,6: 中、3,5: 小中、4: 最小
              const sizeMap: Record<number, string> = {
                1: "h-16 w-16 text-xl", // 最大
                2: "h-14 w-14 text-lg", // 中
                3: "h-12 w-12 text-base", // 小中
                4: "h-10 w-10 text-sm", // 最小
                5: "h-12 w-12 text-base", // 小中
                6: "h-14 w-14 text-lg", // 中
                7: "h-16 w-16 text-xl", // 最大
              };

              // 位置による色のグラデーション
              // 1-2: 左側（緑系）、3: 緑〜グレー中間、4: 中央（グレー系）、5: グレー〜紫中間、6-7: 右側（紫系）
              const getColorClass = (val: number, selected: boolean) => {
                if (selected) {
                  return "bg-gradient-to-br from-baselink-primary to-baselink-accent text-white shadow-lg scale-105";
                }

                if (val <= 2) {
                  // 左側: 緑系
                  return "bg-white border-2 border-emerald-400 text-emerald-700 hover:border-emerald-500 hover:bg-emerald-50";
                } else if (val === 3) {
                  // 緑とグレーの中間: 黄緑系
                  return "bg-white border-2 border-lime-400 text-lime-700 hover:border-lime-500 hover:bg-lime-50";
                } else if (val === 4) {
                  // 中央: グレー系
                  return "bg-white border-2 border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50";
                } else if (val === 5) {
                  // グレーと紫の中間: ピンク系
                  return "bg-white border-2 border-pink-400 text-pink-700 hover:border-pink-500 hover:bg-pink-50";
                } else {
                  // 右側: 紫系
                  return "bg-white border-2 border-purple-400 text-purple-700 hover:border-purple-500 hover:bg-purple-50";
                }
              };

              return (
                <button
                  key={value}
                  onClick={() => handleValueChange(value as LikertAnswer)}
                  className={`${
                    sizeMap[value]
                  } rounded-xl font-bold transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center ${getColorClass(
                    value,
                    selectedValue === value
                  )}`}
                >
                  {value}
                </button>
              );
            })}
          </div>

          {/* 次へボタン */}
          <button
            onClick={handleSubmit}
            disabled={selectedValue === null}
            className={`w-full py-5 px-8 rounded-2xl font-bold text-lg shadow-xl transform transition-all ${
              selectedValue !== null
                ? "bg-gradient-to-r from-baselink-primary to-baselink-accent text-white hover:scale-[1.02] active:scale-100 cursor-pointer"
                : "bg-slate-300 text-slate-500 cursor-not-allowed"
            }`}
          >
            次の質問へ
          </button>
        </div>
      </div>
    </div>
  );
}
