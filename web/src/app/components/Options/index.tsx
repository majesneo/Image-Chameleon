'use client';
import { Badge, Card, Flex, Space, Switch, Tooltip, Typography } from 'antd';
import React, { useCallback } from 'react';
import { TextStyle } from '@/app/styles';
import { options, selectOptions, setOptions } from '@/app/store/options/slice';
import { useDispatch, useSelector } from 'react-redux';

const { Text } = Typography;

export interface ResolutionOptions {
  mobile?: boolean;
  tablet?: boolean;
  desktop?: boolean;
}

const Options = () => {
  const dispatch = useDispatch();
  const { mobile, tablet, desktop } = useSelector(selectOptions);
  const onChange = useCallback(
    (key: options, value: boolean) => {
      dispatch(setOptions({ key, value: !value }));
    },
    [dispatch]
  );
  return (
    <Flex
      gap={30}
      style={{
        flexDirection: 'row',
        width: '100%'
      }}
    >
      <Space style={{ width: '100%' }} direction="vertical" size="small">
        <Badge.Ribbon text="Optimisation">
          <Card
            styles={{
              header: {
                textAlign: 'left',
                width: '100%'
              }
            }}
            title="Adapt the image to the devices:"
            size="small"
          >
            <Flex
              style={{
                flexDirection: 'column',
                alignItems: 'start'
              }}
              gap={10}
            >
              <Flex gap={10}>
                <Text style={TextStyle}>Mobile:</Text>
                <Switch
                  value={mobile}
                  onChange={() => onChange(options.mobile, mobile)}
                />{' '}
              </Flex>
              <Flex gap={10}>
                <Text style={TextStyle}>Tablet:</Text>
                <Switch
                  value={tablet}
                  onChange={() => onChange(options.tablet, tablet)}
                />
              </Flex>

              <Flex gap={10}>
                <Text style={TextStyle}>Desktop:</Text>
                <Switch
                  value={desktop}
                  onChange={() => onChange(options.desktop, desktop)}
                />
              </Flex>
              <Tooltip placement="top" title={'coming soon'}>
                <Flex gap={10}>
                  <Text style={TextStyle}>2K</Text>
                  <Switch disabled />
                </Flex>
              </Tooltip>
              {/*<Tooltip placement="top" title={'coming soon'}>*/}
              {/*  <Flex gap={10}>*/}
              {/*    <Text style={TextStyle}>4K</Text>*/}
              {/*    <Switch disabled onChange={onChange} />*/}
              {/*  </Flex>*/}
              {/*</Tooltip>*/}
            </Flex>
          </Card>
        </Badge.Ribbon>
        <Badge.Ribbon text="Convertor">
          <Card
            styles={{
              header: {
                textAlign: 'left'
              }
            }}
            title="Convert to any format:"
            size="small"
          >
            <Flex
              style={{
                flexDirection: 'column',
                alignItems: 'start'
              }}
              gap={10}
            >
              <Tooltip placement="top" title={'coming soon'}>
                <Flex gap={10}>
                  <Text style={TextStyle}>to JPEG</Text>
                  <Switch disabled />
                </Flex>
              </Tooltip>
              <Tooltip placement="top" title={'coming soon'}>
                <Flex gap={10}>
                  <Text style={TextStyle}>to PNG</Text>
                  <Switch disabled />
                </Flex>
              </Tooltip>
              {/*<Tooltip placement="top" title={'coming soon'}>*/}
              {/*  <Flex gap={10}>*/}
              {/*    <Text style={TextStyle}>to SVG</Text>*/}
              {/*    <Switch disabled onChange={onChange} />*/}
              {/*  </Flex>*/}
              {/*</Tooltip>*/}
              {/*<Tooltip placement="top" title={'coming soon'}>*/}
              {/*  <Flex gap={10}>*/}
              {/*    <Text style={TextStyle}>to GIF</Text>*/}
              {/*    <Switch disabled onChange={onChange} />*/}
              {/*  </Flex>*/}
              {/*</Tooltip>*/}
              {/*<Tooltip placement="top" title={'coming soon'}>*/}
              {/*  <Flex gap={10}>*/}
              {/*    <Text style={TextStyle}>to WEBP</Text>*/}
              {/*    <Switch disabled onChange={onChange} />*/}
              {/*  </Flex>*/}
              {/*</Tooltip>*/}
            </Flex>
          </Card>
        </Badge.Ribbon>
        <Badge.Ribbon text="AI">
          <Card
            styles={{
              header: {
                textAlign: 'left'
              }
            }}
            title="Improve with AI:"
            size="small"
          >
            <Flex
              style={{
                flexDirection: 'column',
                alignItems: 'start'
              }}
              gap={10}
            >
              <Tooltip placement="top" title={'coming soon'}>
                <Flex gap={10}>
                  <Text style={TextStyle}>Improve quality: </Text>
                  <Switch disabled />
                </Flex>
              </Tooltip>
            </Flex>
          </Card>
        </Badge.Ribbon>
      </Space>
    </Flex>
  );
};
export default Options;
