import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/useUserStore';
import Modal from '../Modal';

const GameHeader: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useUserStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSave = () => {
    // 게임 상태는 자동으로 저장되므로 별도 저장 로직 불필요
    alert('게임이 자동으로 저장되었습니다!');
  };

  const handleMainMenu = () => {
    setIsMenuOpen(true);
  };

  const handleQuitGame = () => {
    if (window.confirm('정말로 게임을 종료하시겠습니까?')) {
      navigate('/home');
    }
  };

  const handleLogout = () => {
    if (window.confirm('정말로 로그아웃하시겠습니까?')) {
      logout();
      navigate('/');
    }
  };

  return (
    <>
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex space-x-1 sm:space-x-2 z-10">
        <button
          onClick={handleSave}
          className="px-2 py-1 sm:px-4 sm:py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors text-xs sm:text-sm font-bold border-2 border-yellow-300"
        >
          💾 저장
        </button>
        <button
          onClick={handleMainMenu}
          className="px-2 py-1 sm:px-4 sm:py-2 bg-black text-yellow-400 rounded-lg hover:bg-gray-800 transition-colors text-xs sm:text-sm font-bold border-2 border-yellow-400"
        >
          ⚙️ 메뉴
        </button>
      </div>

      {/* 메뉴 모달 */}
      <Modal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        title="게임 메뉴"
        size="sm"
        buttons={[
          {
            text: '홈으로',
            onClick: () => {
              setIsMenuOpen(false);
              navigate('/home');
            },
            variant: 'primary',
          },
          {
            text: '취소',
            onClick: () => setIsMenuOpen(false),
            variant: 'secondary',
          },
        ]}
      >
        <div className="space-y-4">
          <button
            onClick={handleSave}
            className="w-full text-left p-3 hover:bg-yellow-100 rounded-lg transition-colors border-l-4 border-yellow-500 pl-4"
          >
            💾 게임 저장
          </button>
          <button
            onClick={handleQuitGame}
            className="w-full text-left p-3 hover:bg-red-100 rounded-lg transition-colors text-red-600 border-l-4 border-red-500 pl-4"
          >
            🚪 게임 종료
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left p-3 hover:bg-red-100 rounded-lg transition-colors text-red-600 border-l-4 border-red-500 pl-4"
          >
            🔓 로그아웃
          </button>
        </div>
      </Modal>
    </>
  );
};

export default GameHeader;
