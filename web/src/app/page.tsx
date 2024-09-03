'use client';
import { Content } from 'antd/lib/layout/layout';
import React from 'react';
import { Flex } from 'antd';
import { contentStyle } from '@/app/styles';
import ImageCompressionSlider from '@/app/components/ImageCompressionSlider';
import Feature from '@/app/components/Feature';
import FeaturesMock from '@/app/components/Feature/mock';
import Description from '@/app/components/Description';
import Steps from '@/app/components/Steps';
import { steps } from '@/app/mockHomePage';

export default function Page() {
  // const onChange = (checked: boolean) => {
  //   console.log(`switch to ${checked}`);
  // };
  return (
    <Content className={'content'} style={contentStyle}>
      <Description />
      <ImageCompressionSlider />

      <Flex
        style={{
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '70%'
        }}
      >
        <Steps steps={steps} />
      </Flex>

      <Flex
        gap={30}
        style={{
          flexDirection: 'column',
          marginBottom: 30,
          width: '100%'
        }}
      >
        {FeaturesMock.map((featureItem) => (
          <Feature
            desc={featureItem.desc}
            key={featureItem.id}
            src={featureItem.src}
            title={featureItem.title}
            id={featureItem.id}
          />
        ))}
      </Flex>
    </Content>
  );
}
