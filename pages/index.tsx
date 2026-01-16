import { NextPage } from 'next';
import Head from 'next/head';
import PositionSelector from '../components/PositionSelector';

/**
 * エントリーページ
 * ポジション選択画面
 */
const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>16タイプ野球診断 | Baselink AI</title>
        <meta
          name="description"
          content="Baselink AIが提供する野球プレースタイル診断。10問の質問で、あなたに似ているプロ選手を特定し、AIで言語化します。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="16タイプ野球診断 | Baselink AI" />
        <meta property="og:description" content="君のプレースタイルから似ているプロ選手を特定。眠れる才能をAIで言語化せよ。" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PositionSelector />
    </>
  );
};

export default HomePage;

