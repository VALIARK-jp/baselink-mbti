import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Position } from '../types';

/**
 * エントリーページ
 * ポジション選択画面（投手/野手を選択）
 */
const HomePage: NextPage = () => {
  const router = useRouter();

  const handleSelect = (position: Position) => {
    router.push(`/quiz?position=${position}`);
  };

  return (
    <>
      <Head>
        <title>16タイプ野球診断 | Baselink AI</title>
        <meta
          name="description"
          content="Baselink AIが提供する野球プレースタイル診断。10問の質問で、あなたのタイプとチームを特定し、AIで言語化します。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="16タイプ野球診断 | Baselink AI" />
        <meta property="og:description" content="君のプレースタイルから16タイプと4チームを診断。眠れる才能をAIで言語化せよ。" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-baselink-dark via-slate-900 to-baselink-dark flex items-center justify-center px-4 py-8">
        {/* 背景パターン */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="max-w-md w-full text-center relative z-10">
          {/* Baselink AI ロゴエリア */}
          <div className="mb-6">
            <div className="inline-block bg-baselink-primary/10 px-6 py-2 rounded-full mb-4">
              <span className="text-baselink-primary font-bold text-sm">Baselink AI</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-lg">
            16タイプ野球診断
          </h1>
          <p className="text-slate-300 text-lg mb-10 leading-relaxed">
            10問の質問で、
            <br />
            君のタイプと4つのチームを診断。
            <br />
            <span className="text-baselink-accent font-semibold">眠れる才能をAIで言語化せよ。</span>
          </p>

          <div className="space-y-4">
            <button
              onClick={() => handleSelect('pitcher')}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-6 px-8 rounded-2xl text-xl shadow-2xl transform transition-all hover:scale-[1.02] active:scale-100 border border-blue-400/20"
            >
              投手として診断
            </button>
            <button
              onClick={() => handleSelect('batter')}
              className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold py-6 px-8 rounded-2xl text-xl shadow-2xl transform transition-all hover:scale-[1.02] active:scale-100 border border-red-400/20"
            >
              打者として診断
            </button>
          </div>

          {/* 4チーム説明 */}
          <div className="mt-12 grid grid-cols-2 gap-4 text-sm">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
              <div className="text-blue-400 font-bold mb-1">青（司令）</div>
              <div className="text-slate-400 text-xs">論理で引っ張る</div>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <div className="text-red-400 font-bold mb-1">赤（熱狂）</div>
              <div className="text-slate-400 text-xs">情熱で引っ張る</div>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
              <div className="text-green-400 font-bold mb-1">緑（堅実）</div>
              <div className="text-slate-400 text-xs">分析で支える</div>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
              <div className="text-yellow-400 font-bold mb-1">黄（創造）</div>
              <div className="text-slate-400 text-xs">自由に輝く</div>
            </div>
          </div>

          {/* キャラクター図鑑へのリンク */}
          <div className="mt-8">
            <button
              onClick={() => router.push('/gallery')}
              className="text-baselink-accent hover:text-baselink-primary text-sm font-medium underline transition-colors"
            >
              📚 全キャラクターを見る
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

