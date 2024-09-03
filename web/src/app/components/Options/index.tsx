'use client';
import { Flex, Switch, Typography } from 'antd';
import { TextStyle } from '@/app/styles';
import React from 'react';
import Title from 'antd/lib/typography/Title';

const { Text } = Typography;

const Options = () => {
  const onChange = (v: boolean) => {
    console.log(v, 'v Options');
  };
  return (
    <Flex
      gap={20}
      style={{
        flexDirection: 'column',
        alignItems: 'baseline'
      }}
    >
      <Title level={4} style={TextStyle}>
        Adapt the image to the devices:
      </Title>
      <Flex gap={10}>
        <Text style={TextStyle}>Computer:</Text>
        <Switch defaultChecked onChange={onChange} />
      </Flex>
      <Flex gap={10}>
        <Text style={TextStyle}>Mobile:</Text>
        <Switch defaultChecked onChange={onChange} />
      </Flex>
      <Flex gap={10}>
        <Text style={TextStyle}>Tablet:</Text>
        <Switch defaultChecked onChange={onChange} />
      </Flex>
    </Flex>
  );
};
export default Options;
