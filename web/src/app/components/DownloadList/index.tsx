import React, { FC } from 'react';
import { Button, List, message, Typography } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectImagesResolution } from '@/app/store/imageResolutionConversion/slice';

const { Text } = Typography;

const DownloadList: FC = () => {
  const imagesResolution = useSelector(selectImagesResolution);
  const getFileName = (url: string) => {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const segments = pathname.split('/');
    return segments[segments.length - 1];
  };

  const handleDownload = async (url: string) => {
    try {
      const response = await fetch(url, {
        mode: 'cors'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const urlBlob = window.URL.createObjectURL(blob);
      const tagA = document.createElement('a');
      tagA.href = urlBlob;
      tagA.download = getFileName(url);
      document.body.appendChild(tagA);
      tagA.click();
      tagA.remove();
      window.URL.revokeObjectURL(urlBlob);
      message.success('The file has been successfully downloaded.');
    } catch (error) {
      console.error('Error downloading the file:', error);
      message.error('Failed to download the file.');
    }
  };

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
              onClick={() => handleDownload(item)}
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
