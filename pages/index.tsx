import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Position } from "../types";
import { getCharacterImage } from "../utils/getCharacterImage";
import { NewType } from "../types";

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
        <meta
          property="og:description"
          content="君のプレースタイルから16タイプと4チームを診断。眠れる才能をAIで言語化せよ。"
        />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen bg-gradient-to-br from-white via-blue-50 to-slate-50 flex items-center justify-center px-4 py-4 relative overflow-hidden">
        {/* 背景装飾 - 白と青のポップなパターン */}
        <div className="absolute inset-0 overflow-hidden">
          {/* 大きな円形装飾 */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-baselink-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-baselink-accent/10 rounded-full blur-3xl"></div>
          
          {/* グリッドパターン */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(to right, #0EA5E9 1px, transparent 1px), linear-gradient(to bottom, #0EA5E9 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-4xl w-full relative z-10">
          {/* ヘッダーセクション */}
          <div className="text-center mb-4">
            {/* Baselink AI & SportsTech Japan ロゴ */}
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="bg-gradient-to-r from-baselink-primary to-baselink-accent px-6 py-2 rounded-full shadow-lg">
                <span className="text-white font-bold text-sm">Baselink AI</span>
              </div>
              <span className="text-slate-400 text-xs">by</span>
              <span className="text-slate-600 font-semibold text-sm">SportsTech Japan</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-baselink-primary via-baselink-accent to-baselink-primary bg-clip-text text-transparent">
              16タイプ野球診断
            </h1>
            <p className="text-slate-700 text-base md:text-lg mb-1 leading-relaxed">
              君のプレースタイルから、似ているプロ選手を特定
            </p>
            <p className="text-baselink-primary font-bold text-base md:text-lg">
              ⚾ 眠れる才能をAIで言語化せよ ⚾
            </p>
          </div>

          {/* MBTIキャラクター表示エリア */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-4 md:p-6 mb-4 border-2 border-baselink-primary/20 animate-fade-in">
            <div className="text-center mb-3">
              <div className="inline-block bg-gradient-to-r from-baselink-primary/10 to-baselink-accent/10 px-3 py-1 rounded-full mb-2">
                <span className="text-baselink-primary font-bold text-xs">✨ 16タイプ ✨</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-1">
                キャラクターが待ってる！
              </h2>
            </div>

            {/* キャラクターグリッド（サンプル表示） */}
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-3">
              {/* 投手と野手のキャラクターを表示 */}
              {[
                { position: 'pitcher' as const, type: 'FNIA' as NewType },
                { position: 'pitcher' as const, type: 'LNRA' as NewType },
                { position: 'batter' as const, type: 'FNIB' as NewType },
                { position: 'batter' as const, type: 'LPIA' as NewType },
                { position: 'pitcher' as const, type: 'FPRA' as NewType },
                { position: 'batter' as const, type: 'LNRB' as NewType },
                { position: 'pitcher' as const, type: 'LNIB' as NewType },
                { position: 'batter' as const, type: 'FPIA' as NewType },
              ].map((char, i) => (
                <div
                  key={i}
                  className="aspect-square bg-gradient-to-br from-white to-blue-50 rounded-xl flex items-center justify-center border-2 border-baselink-primary/30 hover:scale-110 hover:shadow-lg transition-all overflow-hidden group relative animate-float"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <img
                    src={getCharacterImage(char.type, char.position)}
                    alt={`Character ${i + 1}`}
                    className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ポジション選択ボタン */}
          <div className="space-y-3">
            <button
              onClick={() => handleSelect("pitcher")}
              className="w-full bg-gradient-to-r from-baselink-primary via-baselink-secondary to-baselink-primary hover:from-baselink-secondary hover:via-baselink-primary hover:to-baselink-secondary text-white font-bold py-4 md:py-5 px-8 rounded-2xl text-lg md:text-xl shadow-2xl transform transition-all hover:scale-[1.02] active:scale-100 border-2 border-white/50 flex items-center justify-center gap-3 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="text-xl md:text-2xl relative z-10">⚾</span>
              <span className="relative z-10">投手として診断</span>
              <span className="text-xl md:text-2xl relative z-10">⚾</span>
            </button>
            <button
              onClick={() => handleSelect("batter")}
              className="w-full bg-gradient-to-r from-baselink-accent via-cyan-500 to-baselink-accent hover:from-cyan-500 hover:via-baselink-accent hover:to-cyan-500 text-white font-bold py-4 md:py-5 px-8 rounded-2xl text-lg md:text-xl shadow-2xl transform transition-all hover:scale-[1.02] active:scale-100 border-2 border-white/50 flex items-center justify-center gap-3 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="text-xl md:text-2xl relative z-10">⚾</span>
              <span className="relative z-10">野手として診断</span>
              <span className="text-xl md:text-2xl relative z-10">⚾</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
