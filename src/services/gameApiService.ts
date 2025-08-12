const API_BASE_URL = 'https://llm-adventure.de.r.appspot.com';

interface GameState {
  gameSessionId: string;
  currentState: any;
  storyText: string;
  availableChoices: string[];
  // API 문서에 따른 추가 필드들
  playerStats?: {
    life: number;
    mental: number;
    money: number;
    location: string;
    mood: string;
  };
  inventory?: string[];
  gameProgress?: {
    chapter: number;
    quest: string;
    completedQuests: string[];
  };
}

interface ChoiceRequest {
  gameSessionId: string;
  choice: string;
}

interface NewGameRequest {
  tutorial?: boolean;
  playerName?: string;
  difficulty?: 'easy' | 'normal' | 'hard';
}

export const gameApiService = {
  // 새로운 게임 시작
  async startNewGame(options: NewGameRequest = {}): Promise<GameState> {
    try {
      console.log('새 게임 시작 요청:', options);

      // 쿼리 파라미터 구성
      const params = new URLSearchParams();
      if (options.tutorial !== undefined)
        params.append('tutorial', options.tutorial.toString());
      if (options.playerName) params.append('playerName', options.playerName);
      if (options.difficulty) params.append('difficulty', options.difficulty);

      const url = `${API_BASE_URL}/newgame${
        params.toString() ? '?' + params.toString() : ''
      }`;
      console.log('API 요청 URL:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      console.log('API 응답 상태:', response.status);
      console.log(
        'API 응답 헤더:',
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API 오류 응답:', errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const data: GameState = await response.json();
      console.log('새 게임 시작 성공:', data);
      return data;
    } catch (error) {
      console.error('새 게임 시작 실패:', error);
      throw error;
    }
  },

  // 저장된 게임 로드
  async loadGame(): Promise<GameState> {
    try {
      console.log('게임 로드 요청');

      const response = await fetch(`${API_BASE_URL}/loadgame`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      console.log('게임 로드 응답 상태:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('게임 로드 오류 응답:', errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const data: GameState = await response.json();
      console.log('게임 로드 성공:', data);
      return data;
    } catch (error) {
      console.error('게임 로드 실패:', error);
      throw error;
    }
  },

  // 현재 게임 정보 로드
  async loadGameInfo(): Promise<GameState> {
    try {
      console.log('게임 정보 로드 요청');

      const response = await fetch(`${API_BASE_URL}/loadinfo`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      console.log('게임 정보 로드 응답 상태:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('게임 정보 로드 오류 응답:', errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const data: GameState = await response.json();
      console.log('게임 정보 로드 성공:', data);
      return data;
    } catch (error) {
      console.error('게임 정보 로드 실패:', error);
      throw error;
    }
  },

  // 선택지 선택
  async selectChoice(
    gameSessionId: string,
    choice: string
  ): Promise<GameState> {
    try {
      console.log('선택지 선택 요청:', { gameSessionId, choice });

      const response = await fetch(`${API_BASE_URL}/selectchoice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          gameSessionId,
          choice,
        } as ChoiceRequest),
      });

      console.log('선택지 선택 응답 상태:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('선택지 선택 오류 응답:', errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const data: GameState = await response.json();
      console.log('선택지 선택 성공:', data);
      return data;
    } catch (error) {
      console.error('선택지 선택 실패:', error);
      throw error;
    }
  },
};
