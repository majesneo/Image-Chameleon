'use client';
import React, { useState } from 'react';
import {
  Flex,
  GetProp,
  Image,
  Typography,
  Upload,
  UploadFile,
  UploadProps
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { TextStyle } from '@/app/styles';

const { Dragger } = Upload;
const { Text } = Typography;
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadWrapper: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  // const [getUploadUrl] = useLazyGetUploadUrlQuery();
  console.log(fileList, 'fileList');
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    console.log(newFileList, 'newFileList');
    // getUploadUrl(newFileList);
    setFileList(newFileList);
  };

  return (
    <Flex
      style={{
        flexDirection: 'column'
      }}
      gap={20}
    >
      <Dragger
        style={{
          marginBottom: 10
        }}
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        height={300}
        multiple
        accept={'image/*'}
      >
        <Flex
          style={{
            flexDirection: 'column',
            width: '100%'
          }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            <Text style={TextStyle}>Click</Text> or{' '}
            <Text style={TextStyle}>drag file</Text> to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Flex>
      </Dragger>
      {previewImage && (
        <Image
          alt={previewImage}
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage('')
          }}
          src={previewImage}
        />
      )}
    </Flex>
  );
};

export default UploadWrapper;
