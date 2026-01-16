import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import ResultCard from "../components/ResultCard";
import { resultMapping } from "../data/results";
import { calculateMBTI, parseAnswersFromQuery } from "../utils/calculateMBTI";
import { questions } from "../data/questions";
import { Position, MBTIType, ResultData, LikertAnswer } from "../types";

/**
 * 診断結果ページ
 * MBTI判定と結果表示
 */
const ResultPage: NextPage = () => {
  const router = useRouter();
  const { position, answers: answersQuery } = router.query;

  const [mbtiType, setMbtiType] = useState<MBTIType | null>(null);
  const [result, setResult] = useState<ResultData | null>(null);
  const [answers, setAnswers] = useState<LikertAnswer[]>([]);

  useEffect(() => {
    if (!router.isReady) return;

    // パラメータの検証
    if (position !== "pitcher" && position !== "batter") {
      router.push("/");
      return;
    }

    // 回答をパース
    const parsedAnswers = parseAnswersFromQuery(answersQuery);
    if (parsedAnswers.length === 0) {
      router.push("/");
      return;
    }

    setAnswers(parsedAnswers);

    // 質問リストを結合
    const allQuestions = questions.common.concat(
      position === "pitcher" ? questions.pitcher : questions.batter
    );

    // MBTIタイプを計算
    const calculatedType = calculateMBTI(parsedAnswers, allQuestions);
    setMbtiType(calculatedType);

    // 結果データを取得
    const resultData = resultMapping[position as Position][calculatedType];
    setResult(resultData);
  }, [router.isReady, position, answersQuery, router]);

  // ローディング中
  if (!mbtiType || !result || !position) {
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
          {result.title} ({mbtiType}) - Baselink AI 野球診断
        </title>
        <meta
          name="description"
          content={`あなたのタイプは「${result.title}」。似ている選手は${result.player}選手です。`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ResultCard
        result={result}
        mbtiType={mbtiType}
        position={position as Position}
        answers={answers}
      />
    </>
  );
};

export default ResultPage;
