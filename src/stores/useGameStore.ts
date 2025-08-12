// src/stores/useGameStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { gameApiService } from '../services/gameApiService';

interface GameState {
  // 게임 세션
  gameSessionId: string | null;
  isConnected: boolean;
  serverHealth: boolean;

  // 플레이어 상태
  life: number;
  mental: number;
  money: number;
  location: string;
  mood: string;
  items: string[];

  // 게임 진행 상태
  currentNarrative: string;
  currentCharacter: string;
  currentDialogue: string;
  currentChoices: string[];

  // 액션 함수들
  setPlayerState: (update: Partial<GameState>) => void;
  makeChoice: (choiceIndex: number) => void;
  updateNarrative: (narrative: string) => void;
  updateDialogue: (character: string, dialogue: string) => void;
  updateChoices: (choices: string[]) => void;
  addItem: (item: string) => void;
  removeItem: (item: string) => void;
  startNewGame: (options?: {
    tutorial?: boolean;
    playerName?: string;
    difficulty?: 'easy' | 'normal' | 'hard';
  }) => Promise<void>;
  loadGame: () => Promise<void>;
  loadGameInfo: () => Promise<void>;
  selectChoice: (choice: string) => Promise<void>;
  hasSavedGame: () => boolean;
  checkServerConnection: () => Promise<void>;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // 게임 세션
      gameSessionId: null,
      isConnected: false,
      serverHealth: false,

      // 플레이어 상태
      life: 4,
      mental: 3,
      money: 100,
      location: '의성군',
      mood: '신남',
      items: [],

      // 게임 진행 상태
      currentNarrative:
        '의성 데몬 헌터의 세계에 오신 것을 환영합니다...\n고운사에 자리잡은 요괴들을 퇴치하고 업화귀를 물리쳐야 합니다.',
      currentCharacter: '시스템',
      currentDialogue: '어떤 직업으로 시작하시겠습니까?',
      currentChoices: ['일반인 (어려움)', '스님 (보통)', '무당 (쉬움)'],

      // 액션 함수들
      setPlayerState: (update) => set((state) => ({ ...state, ...update })),

      makeChoice: (choiceIndex: number) => {
        const choice = get().currentChoices[choiceIndex];
        console.log(`선택: ${choice}`);

        // 백엔드 API로 선택지 전송
        if (get().gameSessionId && get().isConnected) {
          get().selectChoice(choice);
        } else {
          console.log('백엔드 연결 없음, 로컬 처리');
          // 로컬 게임 로직 처리
        }
      },

      updateNarrative: (narrative: string) => {
        set({ currentNarrative: narrative });
      },

      updateDialogue: (character: string, dialogue: string) => {
        set({ currentCharacter: character, currentDialogue: dialogue });
      },

      updateChoices: (choices: string[]) => {
        set({ currentChoices: choices });
      },

      // 아이템 추가
      addItem: (item: string) => {
        set((state) => ({
          items: [...state.items, item],
        }));
      },

      // 아이템 제거
      removeItem: (item: string) => {
        set((state) => ({
          items: state.items.filter((i) => i !== item),
        }));
      },

      // 서버 연결 상태 확인
      checkServerConnection: async () => {
        try {
          // /loadinfo 엔드포인트로 서버 연결 상태 확인
          const response = await fetch(
            'https://llm-adventure.de.r.appspot.com/loadinfo',
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
            }
          );

          const isHealthy = response.ok;
          set({ serverHealth: isHealthy, isConnected: isHealthy });
          console.log('서버 연결 상태:', isHealthy);
        } catch (error) {
          console.error('서버 연결 확인 실패:', error);
          set({ serverHealth: false, isConnected: false });
        }
      },

      // 백엔드 API로 새 게임 시작
      startNewGame: async (
        options: {
          tutorial?: boolean;
          playerName?: string;
          difficulty?: 'easy' | 'normal' | 'hard';
        } = {}
      ) => {
        try {
          console.log('백엔드로 새 게임 시작 시도:', options);

          // 서버 연결 상태 확인
          await get().checkServerConnection();

          if (!get().serverHealth) {
            throw new Error('서버에 연결할 수 없습니다.');
          }

          const gameState = await gameApiService.startNewGame(options);

          set({
            gameSessionId: gameState.gameSessionId,
            currentNarrative: gameState.storyText,
            currentChoices: gameState.availableChoices,
            isConnected: true,
            serverHealth: true,
          });

          // 백엔드에서 받은 플레이어 상태가 있으면 업데이트
          if (gameState.playerStats) {
            set({
              life: gameState.playerStats.life,
              mental: gameState.playerStats.mental,
              money: gameState.playerStats.money,
              location: gameState.playerStats.location,
              mood: gameState.playerStats.mood,
            });
          }

          // 백엔드에서 받은 인벤토리가 있으면 업데이트
          if (gameState.inventory) {
            set({ items: gameState.inventory });
          }

          console.log('백엔드 게임 시작 성공');
        } catch (error) {
          console.error('백엔드 게임 시작 실패:', error);
          // 로컬 게임으로 폴백
          set({
            life: 4,
            mental: 3,
            money: 100,
            location: '의성군',
            mood: '신남',
            items: [],
            currentNarrative:
              '의성 데몬 헌터의 세계에 오신 것을 환영합니다...\n백엔드 연결 실패로 로컬 게임을 시작합니다.',
            currentCharacter: '시스템',
            currentDialogue: '어떤 직업으로 시작하시겠습니까?',
            currentChoices: ['일반인 (어려움)', '스님 (보통)', '무당 (쉬움)'],
            isConnected: false,
            serverHealth: false,
          });
        }
      },

      // 백엔드 API로 게임 로드
      loadGame: async () => {
        try {
          console.log('백엔드로 게임 로드 시도');

          if (!get().serverHealth) {
            throw new Error('서버에 연결할 수 없습니다.');
          }

          const gameState = await gameApiService.loadGame();

          set({
            gameSessionId: gameState.gameSessionId,
            currentNarrative: gameState.storyText,
            currentChoices: gameState.availableChoices,
            isConnected: true,
            serverHealth: true,
          });

          // 백엔드에서 받은 플레이어 상태가 있으면 업데이트
          if (gameState.playerStats) {
            set({
              life: gameState.playerStats.life,
              mental: gameState.playerStats.mental,
              money: gameState.playerStats.money,
              location: gameState.playerStats.location,
              mood: gameState.playerStats.mood,
            });
          }

          // 백엔드에서 받은 인벤토리가 있으면 업데이트
          if (gameState.inventory) {
            set({ items: gameState.inventory });
          }

          console.log('백엔드 게임 로드 성공');
        } catch (error) {
          console.error('백엔드 게임 로드 실패:', error);
          set({ isConnected: false, serverHealth: false });
          throw error;
        }
      },

      // 백엔드 API로 게임 정보 로드
      loadGameInfo: async () => {
        try {
          console.log('백엔드로 게임 정보 로드 시도');

          if (!get().serverHealth) {
            throw new Error('서버에 연결할 수 없습니다.');
          }

          const gameState = await gameApiService.loadGameInfo();

          set({
            gameSessionId: gameState.gameSessionId,
            currentNarrative: gameState.storyText,
            currentChoices: gameState.availableChoices,
            isConnected: true,
            serverHealth: true,
          });

          console.log('백엔드 게임 정보 로드 성공');
        } catch (error) {
          console.error('백엔드 게임 정보 로드 실패:', error);
          set({ isConnected: false, serverHealth: false });
        }
      },

      // 백엔드 API로 선택지 선택
      selectChoice: async (choice: string) => {
        try {
          const sessionId = get().gameSessionId;
          if (!sessionId) {
            throw new Error('게임 세션이 없습니다.');
          }

          if (!get().serverHealth) {
            throw new Error('서버에 연결할 수 없습니다.');
          }

          console.log('백엔드로 선택지 전송:', choice);
          const gameState = await gameApiService.selectChoice(
            sessionId,
            choice
          );

          set({
            currentNarrative: gameState.storyText,
            currentChoices: gameState.availableChoices,
          });

          // 백엔드에서 받은 플레이어 상태가 있으면 업데이트
          if (gameState.playerStats) {
            set({
              life: gameState.playerStats.life,
              mental: gameState.playerStats.mental,
              money: gameState.playerStats.money,
              location: gameState.playerStats.location,
              mood: gameState.playerStats.mood,
            });
          }

          // 백엔드에서 받은 인벤토리가 있으면 업데이트
          if (gameState.inventory) {
            set({ items: gameState.inventory });
          }

          console.log('백엔드 선택지 처리 성공');
        } catch (error) {
          console.error('백엔드 선택지 처리 실패:', error);
          set({ isConnected: false, serverHealth: false });
        }
      },

      // 저장된 게임이 있는지 확인
      hasSavedGame: () => {
        return get().gameSessionId !== null || get().isConnected;
      },
    }),
    {
      name: 'game-storage',
    }
  )
);
