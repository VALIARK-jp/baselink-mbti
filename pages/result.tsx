import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import ResultCard from "../components/ResultCard";
import { newResultMapping } from "../data/newResults";
import {
  calculateNewType,
  parseAnswersFromQuery,
} from "../utils/calculateNewType";
import { questions } from "../data/questions";
import { Position, NewType, ResultData, LikertAnswer } from "../types";

/**
 * 診断結果ページ
 * 新16タイプ判定と結果表示（ポジション別に画像・文言を出し分け）
 */
const ResultPage: NextPage = () => {
  const router = useRouter();
  const { position, answers: answersQuery, preview } = router.query;

  const [newType, setNewType] = useState<NewType | null>(null);
  const [result, setResult] = useState<ResultData | null>(null);
  const [answers, setAnswers] = useState<LikertAnswer[]>([]);

  useEffect(() => {
    if (!router.isReady) return;

    // ポジションの検証
    if (position !== "pitcher" && position !== "batter") {
      router.push("/");
      return;
    }

    // プレビューモード（ギャラリーからの遷移）
    if (preview && typeof preview === "string") {
      const previewType = preview as NewType;
      if (newResultMapping[previewType]) {
        setNewType(previewType);
        setResult(newResultMapping[previewType]);
        setAnswers([4, 4, 4, 4, 4, 4, 4, 4, 4, 4]); // ダミー回答
        return;
      }
    }

    // 回答をパース
    const parsedAnswers = parseAnswersFromQuery(answersQuery);
    if (parsedAnswers.length === 0) {
      router.push("/");
      return;
    }

    setAnswers(parsedAnswers);

    // 全員共通10問
    const allQuestions = questions.common;

    // 新タイプを計算
    const calculatedType = calculateNewType(parsedAnswers, allQuestions);
    setNewType(calculatedType);

    // 結果データを取得
    const resultData = newResultMapping[calculatedType];
    setResult(resultData);
  }, [router.isReady, position, answersQuery, preview, router]);

  // ローディング中
  if (!newType || !result || !position) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-baselink-light to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-baselink-primary border-t-transparent mb-4"></div>
          <p className="text-slate-600 font-medium">結果を計算中...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>
          {result.title} ({newType}) - Baselink AI 野球診断
        </title>
        <meta
          name="description"
          content={`あなたのタイプは「${result.title}」（${result.team}）。似ている選手は${result.player}選手です。`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ResultCard
        result={result}
        newType={newType}
        position={position as Position}
        answers={answers}
      />
    </>
  );
};

export default ResultPage;
