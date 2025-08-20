// src/stores/useGameStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameState {
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
  }) => void;
  hasSavedGame: () => boolean;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
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
        // 로컬 게임 로직 처리
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

      // 새 게임 시작
      startNewGame: (
        options: {
          tutorial?: boolean;
          playerName?: string;
          difficulty?: 'easy' | 'normal' | 'hard';
        } = {}
      ) => {
        console.log('새 게임 시작:', options);

        set({
          life: 4,
          mental: 3,
          money: 100,
          location: '의성군',
          mood: '신남',
          items: [],
          currentNarrative:
            '의성 데몬 헌터의 세계에 오신 것을 환영합니다...\n고운사에 자리잡은 요괴들을 퇴치하고 업화귀를 물리쳐야 합니다.',
          currentCharacter: '시스템',
          currentDialogue: '어떤 직업으로 시작하시겠습니까?',
          currentChoices: ['일반인 (어려움)', '스님 (보통)', '무당 (쉬움)'],
        });
      },

      // 저장된 게임이 있는지 확인
      hasSavedGame: () => {
        return false; // 로컬 게임에서는 저장 기능 없음
      },
    }),
    {
      name: 'game-storage',
    }
  )
);
