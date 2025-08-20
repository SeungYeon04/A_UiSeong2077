import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';
import { useGameStore } from '../stores/useGameStore';
import Modal from '../components/Modal';

export default function Home() {
  const navigate = useNavigate();
  const { user, login, logout } = useUserStore();
  const { startNewGame, hasSavedGame } = useGameStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContinueModalOpen, setIsContinueModalOpen] = useState(false);

  console.log('User data:', user);
  console.log('User name:', user?.name);
  console.log('User name length:', user?.name?.length);
  console.log(
    'User name bytes:',
    user?.name?.split('').map((c) => c.charCodeAt(0))
  );

  // 테스트용: 사용자가 없으면 임시 사용자 정보 설정
  React.useEffect(() => {
    if (!user) {
      login({
        id: 'test-user',
        name: '테스트 사용자',
        email: 'test@example.com',
        picture: 'https://via.placeholder.com/150',
      });
    }
  }, [user, login]);

  // 깨진 한글 데이터 복구 함수
  const fixKoreanText = (text: string): string => {
    if (!text) return '게스트';

    // 깨진 한글 패턴 감지 및 복구
    if (
      text.includes('ì') ||
      text.includes('\\x9D') ||
      text.includes('\\x84')
    ) {
      try {
        // URL 디코딩 시도
        const decoded = decodeURIComponent(text);
        if (decoded !== text) {
          console.log('URL 디코딩으로 복구됨:', decoded);
          return decoded;
        }

        // 이스케이프 시퀀스 처리
        const unescaped = text.replace(/\\x([0-9A-Fa-f]{2})/g, (match, hex) => {
          return String.fromCharCode(parseInt(hex, 16));
        });

        if (unescaped !== text) {
          console.log('이스케이프 시퀀스 처리로 복구됨:', unescaped);
          return unescaped;
        }

        // UTF-8 바이트 배열로 처리 시도
        const bytes = text.split('').map((c) => c.charCodeAt(0));
        const decoder = new TextDecoder('utf-8');
        const uint8Array = new Uint8Array(bytes);
        const decodedUtf8 = decoder.decode(uint8Array);

        if (decodedUtf8 !== text) {
          console.log('UTF-8 디코딩으로 복구됨:', decodedUtf8);
          return decodedUtf8;
        }

        console.log('한글 복구 실패, 원본 반환:', text);
        return text;
      } catch (error) {
        console.error('한글 복구 중 오류:', error);
        return text;
      }
    }

    return text;
  };

  // 사용자 이름 처리
  const getUserName = (): string => {
    if (!user?.name) return '게스트';

    const fixedName = fixKoreanText(user.name);
    console.log('원본 이름:', user.name);
    console.log('복구된 이름:', fixedName);

    return fixedName;
  };

  return (
    <div className="min-h-screen bg-black font-sans text-white">
      {/* Top Section */}
      <div className="relative bg-yellow-500 text-black">
        <div className="max-w-6xl mx-auto px-2 py-20 flex flex-col items-center">
          <div className="text-center">
            <h1 id="title" className="text-6xl font-extrabold text-white">
              의성 2077: 고운사 수호자
            </h1>
            <h2 id="title" className="text-5xl font-extrabold text-yellow-950">
              모험의 시작
            </h2>
            <p id="text" className="text-1xl mt-2 text-white">
              {getUserName()}님, 고운사를 수호하는 모험을 떠나보세요!
            </p>
          </div>
        </div>
      </div>

      {/* 게임 선택 섹션 */}
      <div className="bg-yellow-500 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2
            id="title"
            className="text-4xl font-bold text-black text-center mb-12"
          >
            게임을 선택하세요
          </h2>

          <div id="text" className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-black text-white p-8 rounded-2xl shadow-2xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 border-4 border-yellow-300"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">🎮</div>
                <h3 id="text" className="text-2xl font-bold mb-2">
                  새로 시작
                </h3>
                <p id="text" className="text-yellow-300">
                  새로운 모험을 시작합니다
                </p>
              </div>
            </button>

            <button
              id="text"
              onClick={() => {
                if (hasSavedGame()) {
                  setIsContinueModalOpen(true);
                } else {
                  alert('저장된 게임이 없습니다.');
                }
              }}
              className="bg-black text-white p-8 rounded-2xl shadow-2xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 border-4 border-yellow-300"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">📚</div>
                <h3 id="text" className="text-2xl font-bold mb-2">
                  이어서 하기
                </h3>
                <p id="text" className="text-yellow-300">
                  저장된 게임을 불러옵니다
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 로그아웃 버튼 */}
      <div id="text" className="bg-black py-8 text-center">
        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-colors border-2 border-red-400"
        >
          로그아웃
        </button>
      </div>

      {/* 새 게임 시작 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="새로운 모험을 시작하시겠습니까?"
        size="lg"
        buttons={[
          {
            text: '시작하기',
            onClick: () => {
              // 로컬 게임 시작
              startNewGame({
                tutorial: false,
                playerName: getUserName(),
                difficulty: 'normal',
              });
              setIsModalOpen(false);
              navigate('/game');
            },
            variant: 'primary',
          },
          {
            text: '취소',
            onClick: () => setIsModalOpen(false),
            variant: 'secondary',
          },
        ]}
      >
        <div id="text" className="text-center">
          <p className="text-lg mb-4 text-gray-600">
            새로운 모험을 시작하면 이전 진행 상황이 초기화됩니다.
          </p>
          <p className="text-gray-600">
            정말로 새로운 모험을 시작하시겠습니까?
          </p>
        </div>
      </Modal>

      {/* 이어서 하기 모달 */}
      <Modal
        isOpen={isContinueModalOpen}
        onClose={() => setIsContinueModalOpen(false)}
        title="저장된 게임을 불러오시겠습니까?"
        size="lg"
        buttons={[
          {
            text: '불러오기',
            onClick: () => {
              alert('로컬 게임에서는 저장 기능을 지원하지 않습니다.');
              setIsContinueModalOpen(false);
            },
            variant: 'primary',
          },
          {
            text: '취소',
            onClick: () => setIsContinueModalOpen(false),
            variant: 'secondary',
          },
        ]}
      >
        <div id="text" className="text-center">
          <p className="text-lg mb-4">
            저장된 게임을 불러와서 이전 진행 상황을 계속합니다.
          </p>
          <p className="text-gray-600">저장된 게임을 불러오시겠습니까?</p>
        </div>
      </Modal>
    </div>
  );
}
