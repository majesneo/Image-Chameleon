'use client';
import React, { FC } from 'react';
import { footerStyle } from '@/app/components/Footer/styles';
import { Footer } from 'antd/lib/layout/layout';
import Logo from '@/app/components/Logo';
import { Typography } from 'antd';

const { Text } = Typography;

const FooterWrapper: FC = () => {
  return (
    <Footer style={footerStyle}>
      <Logo />
      <Text>© 2024 All rights reserved.</Text>
    </Footer>
  );
};

export default FooterWrapper;
