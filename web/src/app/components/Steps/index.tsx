import React, { FC, useCallback, useEffect } from 'react';
import { Button, Flex, message, Steps, theme } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  decreaseCurrentSteps,
  increaseCurrentSteps,
  selectCurrentSteps,
  selectSteps,
  setSteps
} from '@/app/store/steps/slice';
import { Step } from '@/app/components/Steps/stepsData';

const StepsWrapper: FC<{ steps: Step[] }> = ({ steps }) => {
  const { token } = theme.useToken();
  const dispatch = useDispatch();
  const selectedSteps = useSelector(selectSteps);
  const currentSteps = useSelector(selectCurrentSteps);
  useEffect(() => {
    dispatch(setSteps(steps.length - 1));
  }, []);

  const next = useCallback(() => {
    dispatch(increaseCurrentSteps());
  }, [dispatch]);

  const prev = useCallback(() => {
    dispatch(decreaseCurrentSteps());
  }, [dispatch]);

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon
  }));

  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    width: '100%',
    padding: '1rem',
    height: 446
  };

  return (
    <Flex
      style={{
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '70%'
      }}
    >
      <Steps current={currentSteps} items={items} />
      <div style={contentStyle}>{steps[currentSteps].content}</div>
      <div style={{ marginTop: 24 }}>
        {currentSteps < selectedSteps && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}
        {currentSteps === selectedSteps && (
          <Button
            type="primary"
            onClick={() => message.success('Processing complete!')}
          >
            Done
          </Button>
        )}
        {currentSteps > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={prev}>
            Previous
          </Button>
        )}
      </div>
    </Flex>
  );
};

export default StepsWrapper;
