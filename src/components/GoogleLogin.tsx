import React, { useEffect } from 'react';

declare global {
  interface Window {
    google: any;
  }
}

interface GoogleLoginProps {
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}

const GoogleLogin: React.FC<GoogleLoginProps> = ({ onSuccess, onError }) => {
  useEffect(() => {
    // Google Identity Services 초기화
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id:
          '578368786163-tu63h13aklp2lbrmdpud1mjo3ah5i7ov.apps.googleusercontent.com',
        callback: (response: any) => {
          if (onSuccess) {
            onSuccess(response);
          }
          console.log('Google 로그인 성공:', response);
        },
      });

      // 로그인 버튼 렌더링
      window.google.accounts.id.renderButton(
        document.getElementById('google-login-button'),
        {
          theme: 'outline',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
          locale: 'ko',
        }
      );
    }
  }, [onSuccess]);

  return (
    <div id="google-login-button" className="flex justify-center">
      {/* Google 버튼이 여기에 렌더링됩니다 */}
    </div>
  );
};

export default GoogleLogin;
