import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  
  let errorMessage: string;
  
  if (isRouteErrorResponse(error)) {
    errorMessage = error.status === 404 
      ? '페이지를 찾을 수 없습니다.' 
      : '오류가 발생했습니다.';
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = '알 수 없는 오류가 발생했습니다.';
  }

  const handleGoBack = () => {
    // 인증 상태에 따라 적절한 페이지로 이동
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      navigate('/');
    } else {
      navigate('/landing');
    }
  };

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">앗!</h1>
      <p className="text-xl mb-8">{errorMessage}</p>
      <Button onClick={handleGoBack}>
        메인으로 돌아가기
      </Button>
    </div>
  );
};

export default ErrorPage; 