import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from "next/head";
import QuizComponent from "../components/QuizComponent";
import { questions } from "../data/questions";
import { Position, LikertAnswer } from "../types";
import { answersToQueryString } from "../utils/calculateNewType";

/**
 * 診断質問ページ
 * 全員共通10問に回答する画面（ポジションは結果表示用に保持）
 */
const QuizPage: NextPage = () => {
  const router = useRouter();
  const { position } = router.query;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<LikertAnswer[]>([]);
  const quizQuestions = questions.common; // 全員共通10問

  // ポジションが無効な場合はトップページへリダイレクト
  useEffect(() => {
    if (router.isReady && position !== "pitcher" && position !== "batter") {
      router.push("/");
    }
  }, [router.isReady, position, router]);

  const handleAnswer = (answer: LikertAnswer) => {
    const newAnswers = [...answers, answer];

    // 次の質問があるかチェック
    if (currentIndex < quizQuestions.length - 1) {
      setAnswers(newAnswers);
      setCurrentIndex(currentIndex + 1);
    } else {
      // 全質問完了 → 結果ページへ（ポジション情報も渡す）
      const answersQuery = answersToQueryString(newAnswers);
      router.push(`/result?position=${position}&answers=${answersQuery}`);
    }
  };

  // ポジションが確定するまでローディング
  if (!router.isReady || (position !== "pitcher" && position !== "batter")) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-baselink-dark to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-baselink-primary border-t-transparent mb-4"></div>
          <p className="text-slate-300">読み込み中...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentIndex];

  if (!currentQuestion) {
    return null;
  }

  return (
    <>
      <Head>
        <title>診断中 - Baselink AI 野球診断</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <QuizComponent
        question={currentQuestion}
        currentIndex={currentIndex}
        totalQuestions={quizQuestions.length}
        onAnswer={handleAnswer}
      />
    </>
  );
};

export default QuizPage;
