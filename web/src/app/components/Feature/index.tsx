'use client';
import React, { FC } from 'react';
import { Flex, Image, Typography } from 'antd';
import { FeaturesMockI } from '@/app/components/Feature/mock';

const { Text } = Typography;

const Feature: FC<FeaturesMockI> = ({ src, desc, title }) => {
  return (
    <Flex
      style={{
        justifyContent: 'space-evenly',
        flexDirection: 'row'
      }}
    >
      <Flex
        style={{
          flexDirection: 'column'
        }}
      >
        {title}
        <Text
          style={{
            fontSize: '1.1rem',
            lineHeight: '2rem',
            maxWidth: 500,
            textAlign: 'left'
          }}
        >
          {desc}
        </Text>
      </Flex>

      <Flex
        style={{
          flexDirection: 'column'
        }}
      >
        <span className="features_bgcopy__mYu7y"></span>
        <Image
          preview={false}
          alt="faster website"
          className="lazy entered loaded"
          data-src="/fast-website.svg"
          width="234"
          height="234"
          data-ll-status="loaded"
          src={src}
        />
      </Flex>
    </Flex>
  );
};

export default Feature;
