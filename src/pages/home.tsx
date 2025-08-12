import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';
import { useGameStore } from '../stores/useGameStore';
import Modal from '../components/Modal';

export default function Home() {
  const navigate = useNavigate();
  const { user, login, logout } = useUserStore();
  const {
    startNewGame,
    loadGame,
    hasSavedGame,
    isConnected,
    serverHealth,
    checkServerConnection,
  } = useGameStore();
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

  // 컴포넌트 마운트 시 서버 연결 상태 확인
  React.useEffect(() => {
    checkServerConnection();
  }, [checkServerConnection]);

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
    <div className="relative min-h-screen">
      {/* 로그아웃 버튼 */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="px-3 py-2 sm:px-4 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
        >
          로그아웃
        </button>
      </div>

      {/* 서버 연결 상태 표시 */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div
          className={`px-3 py-2 rounded-lg text-sm font-medium ${
            serverHealth
              ? 'bg-green-100 text-green-800 border border-green-300'
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}
        >
          {serverHealth ? '🟢 백엔드 연결됨' : '🔴 백엔드 연결 안됨'}
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl absolute top-4 left-4 font-bold">
        TEXT ADVENTURE
      </h1>

      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h2 className="text-3xl sm:text-5xl md:text-7xl mb-8 md:mb-14 text-center leading-tight">
          모험을 떠나보아요{' '}
          <span className="text-4xl sm:text-6xl md:text-8xl text-purple-500 block sm:inline">
            {getUserName()}
          </span>
          님!
        </h2>

        <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-md">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:min-w-96 shadow-lg rounded-full flex text-xl sm:text-3xl md:text-4xl items-center justify-center py-3 px-6 border border-gray-400 bg-white hover:bg-gray-50 transition-all duration-200"
          >
            새로시작
          </button>
          <button
            onClick={() => {
              if (hasSavedGame()) {
                setIsContinueModalOpen(true);
              } else {
                alert('저장된 게임이 없습니다.');
              }
            }}
            className="w-full sm:min-w-96 shadow-lg rounded-full flex text-xl sm:text-3xl md:text-4xl items-center justify-center py-3 px-6 border border-gray-400 bg-white hover:bg-gray-50 transition-all duration-200"
          >
            이어서 하기
          </button>
        </div>
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
            onClick: async () => {
              try {
                // 백엔드로 사용자 이름과 함께 게임 시작
                await startNewGame({
                  tutorial: false,
                  playerName: getUserName(),
                  difficulty: 'normal',
                });
                setIsModalOpen(false);
                navigate('/game');
              } catch (error) {
                console.error('게임 시작 실패:', error);
                alert('게임 시작에 실패했습니다. 다시 시도해주세요.');
              }
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
        <div className="text-center">
          <p className="text-lg mb-4">
            새로운 모험을 시작하면 이전 진행 상황이 초기화됩니다.
          </p>
          <p className="text-gray-600">
            정말로 새로운 모험을 시작하시겠습니까?
          </p>
          {serverHealth && (
            <p className="text-green-600 text-sm mt-2">
              백엔드 서버와 연결되어 있어 게임 진행 상황이 저장됩니다.
            </p>
          )}
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
            onClick: async () => {
              try {
                await loadGame();
                setIsContinueModalOpen(false);
                navigate('/game');
              } catch (error) {
                console.error('게임 로드 실패:', error);
                alert('게임 로드에 실패했습니다. 다시 시도해주세요.');
              }
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
        <div className="text-center">
          <p className="text-lg mb-4">
            저장된 게임을 불러와서 이전 진행 상황을 계속합니다.
          </p>
          <p className="text-gray-600">저장된 게임을 불러오시겠습니까?</p>
          {!serverHealth && (
            <p className="text-red-600 text-sm mt-2">
              백엔드 서버에 연결할 수 없어 저장된 게임을 불러올 수 없습니다.
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
}
