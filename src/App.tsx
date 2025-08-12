// src/App.tsx
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useGameStore } from './stores/useGameStore';
import { useThemeStore } from './stores/useThemeStore';
import { useUserStore } from './stores/useUserStore';
import ThemeToggle from './components/ThemeToggle';
import UserInfo from './components/UserInfo';

import { useEffect } from 'react';

function App() {
  const { life, mental, money, location, mood } = useGameStore();
  const { theme } = useThemeStore();
  const { logout } = useUserStore();
  const navigate = useNavigate();
  const location_path = useLocation();

  // 테마에 따라 body 클래스 변경
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  const handleLogout = () => {
    // 로그아웃 처리
    console.log('로그아웃');
    logout();
    navigate('/');
  };

  // 로그인 페이지에서는 헤더와 푸터를 숨김
  if (location_path.pathname === '/') {
    return <Outlet />;
  }

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* 상단 상태 표시바 */}
      <header
        className={`p-4 text-sm flex justify-between items-center transition-colors duration-200 ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-white border-b border-gray-200'
        }`}
      >
        <div>
          ❤️ 체력: {life} | 🧠 정신: {mental}
        </div>
        <div className="flex items-center gap-4">
          <UserInfo />
          <span>
            💰 {money}원 | 📍 {location} | 😶‍🌫️ {mood}
          </span>
          <ThemeToggle />
          <button
            onClick={handleLogout}
            className={`px-3 py-1 rounded text-xs transition-colors duration-200 ${
              theme === 'dark'
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            로그아웃
          </button>
        </div>
      </header>

      {/* 페이지 본문 */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

      {/* 하단 안내 */}
      <footer
        className={`text-center text-xs py-4 transition-colors duration-200 ${
          theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
        }`}
      >
        ⓒ 2025 서울 어드벤처. 당신의 선택이 미래를 만듭니다.
      </footer>
    </div>
  );
}

export default App;
