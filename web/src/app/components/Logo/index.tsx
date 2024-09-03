'use client';
import Title from 'antd/lib/typography/Title';
import { Image } from 'antd';
import React from 'react';
import { LogoImage, LogoTitle } from '@/app/components/Logo/styles';

const Logo = () => {
  return (
    <Title style={LogoTitle}>
      Image Chameleon
      <Image
        style={LogoImage}
        preview={false}
        height={'50px'}
        width={'50px'}
        src="/favicon.svg"
        alt="Favicon"
      />
    </Title>
  );
};

export default Logo;
