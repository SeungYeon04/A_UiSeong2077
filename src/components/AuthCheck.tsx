import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';

interface AuthCheckProps {
  children: React.ReactNode;
}

const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
  const { isLoggedIn, user } = useUserStore();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (!isLoggedIn()) {
        // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
        navigate('/', { replace: true });
        return;
      }
      setIsChecking(false);
    };

    // 초기 체크
    checkAuth();

    // 주기적으로 인증 상태 확인 (선택사항)
    const interval = setInterval(checkAuth, 30000); // 30초마다 체크

    return () => clearInterval(interval);
  }, [isLoggedIn, navigate]);

  // 로그인 상태 확인 중
  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로그인 확인 중...</p>
        </div>
      </div>
    );
  }

  // 로그인되지 않은 경우 (리다이렉트 중)
  if (!isLoggedIn()) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로그인이 필요합니다...</p>
        </div>
      </div>
    );
  }

  // 로그인된 경우 자식 컴포넌트 렌더링
  return <>{children}</>;
};

export default AuthCheck;
