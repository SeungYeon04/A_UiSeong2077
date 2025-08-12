interface AuthResponse {
  google_id: string;
  email: string;
  name: string;
  picture: string;
}

export const authService = {
  // Google JWT 토큰을 프론트엔드에서 디코딩하여 사용자 정보 추출
  async authenticateWithGoogle(token: string): Promise<AuthResponse> {
    try {
      console.log('Google 토큰 처리 시작...');

      // JWT 토큰의 페이로드 부분 디코딩
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('토큰 페이로드:', payload);

      // 한글 데이터 안전하게 추출
      const safeExtract = (value: any, fallback: string): string => {
        if (!value) return fallback;

        // 문자열이 아닌 경우 문자열로 변환
        const strValue = String(value);

        // 깨진 한글 패턴 감지
        if (
          strValue.includes('ì') ||
          strValue.includes('\\x9D') ||
          strValue.includes('\\x84')
        ) {
          try {
            // URL 디코딩 시도
            const decoded = decodeURIComponent(strValue);
            if (decoded !== strValue) {
              console.log('URL 디코딩으로 복구됨:', decoded);
              return decoded;
            }

            // 이스케이프 시퀀스 처리
            const unescaped = strValue.replace(
              /\\x([0-9A-Fa-f]{2})/g,
              (match, hex) => {
                return String.fromCharCode(parseInt(hex, 16));
              }
            );

            if (unescaped !== strValue) {
              console.log('이스케이프 시퀀스 처리로 복구됨:', unescaped);
              return unescaped;
            }

            // UTF-8 바이트 배열로 처리 시도
            const bytes = strValue.split('').map((c) => c.charCodeAt(0));
            const decoder = new TextDecoder('utf-8');
            const uint8Array = new Uint8Array(bytes);
            const decodedUtf8 = decoder.decode(uint8Array);

            if (decodedUtf8 !== strValue) {
              console.log('UTF-8 디코딩으로 복구됨:', decodedUtf8);
              return decodedUtf8;
            }
          } catch (error) {
            console.error('한글 복구 중 오류:', error);
          }
        }

        return strValue;
      };

      const authResponse: AuthResponse = {
        google_id: safeExtract(payload.sub, 'unknown'),
        email: safeExtract(payload.email, 'unknown@example.com'),
        name: safeExtract(payload.name || payload.given_name, 'Unknown User'),
        picture: safeExtract(payload.picture, ''),
      };

      console.log('사용자 정보 추출 완료:', authResponse);
      return authResponse;
    } catch (error) {
      console.error('Google 토큰 처리 실패:', error);
      throw new Error('Google 로그인 정보를 처리할 수 없습니다.');
    }
  },

  // 토큰 유효성 검사 (JWT 만료 시간 확인)
  validateToken(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);

      if (payload.exp && payload.exp < currentTime) {
        console.log('토큰이 만료되었습니다.');
        return false;
      }

      return true;
    } catch (error) {
      console.error('토큰 검증 실패:', error);
      return false;
    }
  },
};
