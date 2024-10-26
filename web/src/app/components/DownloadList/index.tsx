import React, { FC } from 'react';
import { Button, List, Typography } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectImagesResolution } from '@/app/store/imageResolutionConversion/slice';
import useDownload from '@/app/hooks/useDownload';

const { Text } = Typography;

const DownloadList: FC = () => {
  const imagesResolution = useSelector(selectImagesResolution);
  const getFileName = (url: string) => {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const segments = pathname.split('/');
    return segments[segments.length - 1];
  };
  const { download } = useDownload();

  return (
    <List
      header={<div>Downloaded images</div>}
      bordered
      dataSource={imagesResolution}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button
              key={item}
              type="primary"
              icon={<DownloadOutlined />}
              onClick={() => download(item)}
            >
              Download
            </Button>
          ]}
        >
          <Text>{getFileName(item)}</Text>
        </List.Item>
      )}
    />
  );
};

export default DownloadList;
