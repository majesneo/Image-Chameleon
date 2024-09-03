'use client';
import React, { FC } from 'react';
import { Header } from 'antd/lib/layout/layout';
import { headerStyle } from '@/app/components/Header/styles';
import Logo from '@/app/components/Logo';

const HeaderWrapper: FC = () => {
  return (
    <Header style={headerStyle}>
      <Logo />
    </Header>
  );
};
export default HeaderWrapper;
