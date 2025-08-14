// src/pages/Login.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import GoogleLogin from '../components/GoogleLogin';
import { useThemeStore } from '../stores/useThemeStore';
import { useUserStore } from '../stores/useUserStore';
import ThemeToggle from '../components/ThemeToggle';
import { authService } from '../services/authService';

export default function Login() {
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const { login, isLoggedIn } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 이미 로그인된 사용자는 홈으로 리다이렉트
  React.useEffect(() => {
    if (isLoggedIn()) {
      navigate('/home', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleGoogleSuccess = async (response: any) => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('Google 로그인 성공:', response);

      // JWT 토큰 추출
      const token = response.credential;

      // 토큰 유효성 검사
      if (!authService.validateToken(token)) {
        throw new Error('유효하지 않은 로그인 토큰입니다.');
      }

      // 토큰에서 사용자 정보 추출
      const authResponse = await authService.authenticateWithGoogle(token);
      console.log('사용자 인증 완료:', authResponse);

      // 사용자 정보를 스토어에 저장
      login({
        id: authResponse.google_id,
        name: authResponse.name,
        email: authResponse.email,
        picture: authResponse.picture,
      });

      // 로그인 성공 후 홈 페이지로 이동
      navigate('/home');
    } catch (error) {
      console.error('Google 로그인 처리 실패:', error);
      setError(
        error instanceof Error
          ? error.message
          : 'Google 로그인 중 오류가 발생했습니다.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = (error: any) => {
    console.error('Google 로그인 실패:', error);
    setError('Google 로그인에 실패했습니다.');
  };

  return (
    <div className="min-h-screen bg-black font-sans text-white">
      {/* 테마 토글 버튼 */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      {/* Top Section */}
      <div className="relative bg-yellow-500 text-black">
        <div className="max-w-6xl mx-auto px-2 py-20 flex flex-col items-center">
          <div className="text-center">
            <h1 id="title" className="text-6xl font-extrabold text-white">
              의성 2077: 고운사 수호자
            </h1>
            <h2 id="title" className="text-5xl font-extrabold text-yellow-950">
              로그인
            </h2>
            <p id="text" className="text-1xl mt-2 text-white">
              게임을 시작하려면 로그인해주세요
            </p>
          </div>
        </div>
      </div>

      {/* 로그인 섹션 */}
      <div className="bg-black py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-yellow-500 text-black p-12 rounded-2xl shadow-2xl max-w-2xl mx-auto">
            <h3 id="title" className="text-3xl font-bold mb-8">
              인공지능을 통해서 즐기는
            </h3>
            <h4 id="title" className="text-4xl font-bold text-yellow-950 mb-8">
              TEXT ADVENTURE
            </h4>

            {/* 에러 메시지 */}
            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg max-w-md mx-auto text-sm">
                {error}
              </div>
            )}

            {/* 로딩 상태 */}
            {isLoading && (
              <div className="mb-6 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                <span className="ml-3 text-lg text-black">로그인 중...</span>
              </div>
            )}

            <div className="mb-8">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />
            </div>

            <p className="text-yellow-950 text-sm">
              Google 계정으로 간편하게 로그인하세요
            </p>
          </div>
        </div>
      </div>

      {/* 뒤로가기 버튼 */}
      <div className="bg-black py-8 text-center">
        <button
          onClick={() => navigate('/')}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-full transition-colors border-2 border-gray-400"
        >
          ← 랜딩페이지로 돌아가기
        </button>
      </div>
    </div>
  );
}
