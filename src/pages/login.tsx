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
    <div
      className={`flex flex-col justify-center items-center min-h-screen text-center px-4 transition-colors duration-200 ${
        theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      {/* 테마 토글 버튼 */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="max-w-4xl mx-auto w-full">
        <p className="text-2xl sm:text-4xl md:text-6xl mb-5 px-4 leading-tight">
          인공지능을 통해서 즐기는
        </p>
        <h1 className="text-4xl sm:text-6xl md:text-7xl text-[#6D00C1] mb-6 md:mb-10 px-4 font-bold">
          TEXT ADVENTURE
        </h1>

        {/* 에러 메시지 */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg max-w-md mx-auto text-sm sm:text-base">
            {error}
          </div>
        )}

        {/* 로딩 상태 */}
        {isLoading && (
          <div className="mb-6 flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-purple-600"></div>
            <span className="ml-3 text-base sm:text-lg">로그인 중...</span>
          </div>
        )}

        <div className="px-4">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>
      </div>
    </div>
  );
}
