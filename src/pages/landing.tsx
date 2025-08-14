import React from "react";
import '../css/landing.css';

export default function Landing() {
  const monsterImages = [
    "age.png",
    "catg.png",
    "dark.png",
    "jang.png",
    "water.png",
    "9miho.png"
  ];


  return (
    <div className="min-h-screen bg-black font-sans text-white">
      <div className="bg-black py-5 text-center"></div>

      {/* Top Section */}
      <div className="relative bg-yellow-500 text-black">
        <div className="max-w-6xl mx-auto px-2 py-20 flex flex-col items-center">
          <div className="text-center">
            <h1 id="title" className="text-6xl font-extrabold text-white">의성 2077: 고운사 수호자</h1>
            <h2 id="title" className="text-5xl font-extrabold text-yellow-950">텍스트 어드벤처 게임</h2>
            <p id="text" className="text-1xl mt-2 text-white">의성 고운사를 수호하라 비주얼노벨 LLM 텍스트 어드벤처</p>
          </div>
        </div>
        {/* 이거 나중에 한옥 길게 실루엣 검정으로 만들기 */}
        <img
            src="../img/start.png" // ✅ 임시 이미지 경로
            alt="Repairman Workshop"
            className="w-full h-auto object-contain"
          />
        
      <div id="text" className="absolute bottom-56 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-black text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">Open AI를 활용</h3>
            <p className="mt-2 font-bold text-yellow-400">AI LLM 기술을 사용하여<br/>여러가지 생존 상황을 연출</p>
          </div>
          <div className="bg-black text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">문화적 요소 겸비</h3>
            <p className="mt-2"><span className="text-yellow-400 font-bold">의성 고운사</span>를 배경으로<br/>수호하는 스토리를 진행</p>
          </div>
          <div className="bg-black text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">비주얼 노벨 장르 겸비</h3>
            <p className="mt-2">편하게 클릭으로 선택지를 고르며 <span className="text-yellow-400 font-bold">웹게임으로 접근 쉬움</span></p>
          </div>
        </div>
      </div>

      </div>

      {/* Middle Section - Thorny Problem */}
      <div className="bg-black py-10 text-center">
        <h2 id="title" className="text-4xl font-bold text-yellow-500">PLAY<br></br>GAMES</h2>
      </div>

      {/* Workshop Scene */}
      <div className="bg-yellow-500 flex justify-center">
        <img
          src="../img/image.png" // ✅ 임시 이미지
          alt="Workshop Scene"
          className="w-full max-w-[900px] aspect-[16/9] object-cover"
        />
      </div>


      {/* Grid Gallery */}
      <div className="bg-black py-10">
        <h3 id="text" className="text-center text-yellow-500 mb-6">— 대표 등장인물 —</h3>
        <div className="grid grid-cols-4 gap-5 max-w-5xl mx-auto px-5">
            {monsterImages.map((fileName, idx) => (
              <div key={idx} className="overflow-hidden rounded-lg">
                <img
                  src={`../img/monster/${fileName}`} // 폴더 경로 + 파일명
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
        </div>
        </div>

      </div>
  );
}
