import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { Button, Flex, message, Steps, theme } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  decreaseCurrentSteps,
  increaseCurrentSteps,
  resetSteps,
  selectCurrentSteps,
  selectIsLoadingSteps,
  selectSteps,
  setSteps
} from '@/app/store/steps/slice';
import { Step } from '@/app/components/Steps/stepsData';
import {
  resetImageResolution,
  selectImagesResolution
} from '@/app/store/imageResolutionConversion/slice';
import useDownload from '@/app/hooks/useDownload';
import { DownloadOutlined } from '@ant-design/icons';

const StepsWrapper: FC<{ steps: Step[] }> = ({ steps }) => {
  const { token } = theme.useToken();
  const dispatch = useDispatch();
  const selectedSteps = useSelector(selectSteps);
  const currentSteps = useSelector(selectCurrentSteps);
  const imagesResolution = useSelector(selectImagesResolution);
  const isLoadingSteps = useSelector(selectIsLoadingSteps);

  const { download } = useDownload();

  const handleDownloadAll = () => {
    if (!imagesResolution || imagesResolution.length === 0) {
      message.warning('There are no available files to upload.');
      return;
    }

    imagesResolution.forEach((url) => download(url));
    message.success('The download of all files has begun.');
  };

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
  const onClickResetSteps = () => {
    dispatch(resetSteps());
    dispatch(resetImageResolution());
    dispatch(setSteps(steps.length - 1));
  };

  const isLastStep = useMemo(
    () => currentSteps === selectedSteps && imagesResolution?.length > 0,
    [currentSteps, imagesResolution?.length, selectedSteps]
  );

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
        {currentSteps < selectedSteps && !isLoadingSteps && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}
        {isLastStep && (
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleDownloadAll}
          >
            Download all
          </Button>
        )}
        {currentSteps > 0 && !isLastStep && !isLoadingSteps && (
          <Button style={{ margin: '0 8px' }} onClick={prev}>
            Previous
          </Button>
        )}
        {isLastStep && (
          <Button style={{ margin: '0 8px' }} onClick={onClickResetSteps}>
            Again
          </Button>
        )}
      </div>
    </Flex>
  );
};

export default StepsWrapper;
