import { useRouter } from 'next/router';
import { Position } from '../types';

/**
 * ポジション選択コンポーネント
 * 投手または野手を選択する画面
 */
export default function PositionSelector() {
  const router = useRouter();

  const handleSelect = (position: Position) => {
    router.push(`/quiz?position=${position}`);
  };

  return (
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
          君のプレースタイルから、
          <br />
          似ているプロ選手を特定。
          <br />
          <span className="text-baselink-accent font-semibold">眠れる才能をAIで言語化せよ。</span>
        </p>

        <div className="space-y-4">
          <button
            onClick={() => handleSelect('pitcher')}
            className="w-full bg-baselink-primary hover:bg-baselink-secondary text-white font-bold py-6 px-8 rounded-2xl text-xl shadow-2xl transform transition-all hover:scale-[1.02] active:scale-100 hover:shadow-baselink-primary/50 border border-baselink-accent/20"
          >
            投手として診断
          </button>
          <button
            onClick={() => handleSelect('batter')}
            className="w-full bg-baselink-accent hover:bg-cyan-600 text-white font-bold py-6 px-8 rounded-2xl text-xl shadow-2xl transform transition-all hover:scale-[1.02] active:scale-100 hover:shadow-cyan-500/50 border border-cyan-400/20"
          >
            野手として診断
          </button>
        </div>

        <p className="text-slate-400 text-sm mt-10">
          10問の質問に答えるだけで、
          <br />
          君だけのタイプが判明します
        </p>
      </div>
    </div>
  );
}

