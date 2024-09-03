'use client';
import { Flex } from 'antd';
import { ContentDescriptionStyle, ContentTitleStyle } from '@/app/styles';
import React from 'react';
import Title from 'antd/lib/typography/Title';

const Description = () => {
  return (
    <Flex
      style={{
        flexDirection: 'column',
        zIndex: 5
      }}
    >
      <Title style={ContentTitleStyle}>
        Fast & efficient image compression
        <span>with</span>
        <span className={'content-title'}>Image Chameleon</span>
      </Title>
      <Title level={2} style={ContentDescriptionStyle}>
        Optimize JPEG, PNG, SVG, GIF and WEBP
      </Title>
    </Flex>
  );
};
export default Description;
