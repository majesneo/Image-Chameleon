'use client';
import React from 'react';
import { Button, Result } from 'antd';
import { useRouter } from 'next/navigation';

const Custom404: React.FC = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={handleBackToHome}>
          Back Home
        </Button>
      }
    />
  );
};

export default Custom404;
