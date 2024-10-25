'use client';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Flex,
  GetProp,
  Image,
  message,
  Typography,
  Upload,
  UploadFile,
  UploadProps
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { TextStyle } from '@/app/styles';
import { useLazyGetUploadUrlQuery } from '@/app/store/upload/api';
import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
import { useDispatch, useSelector } from 'react-redux';
import { selectOptions } from '@/app/store/options/slice';
import { ResolutionOptions } from '@/app/components/Options';
import { usePostImageResolutionConversionMutation } from '@/app/store/imageResolutionConversion/api';
import { setImagesResolution } from '@/app/store/imageResolutionConversion/slice';
import { increaseCurrentSteps } from '@/app/store/steps/slice';

const { Dragger } = Upload;
const { Text } = Typography;
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export interface FileInfo {
  fileId: string;
  options: ResolutionOptions;
  originalFileName: string;
}

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadWrapper: React.FC = () => {
  const [action, setAction] = useState('');
  const [fileIdMap, setFileIdMap] = useState<Record<string, FileInfo>>({});
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const dispatch = useDispatch();
  const [getUploadUrl] = useLazyGetUploadUrlQuery();
  const [
    postImageResolutionConversion,
    { data: imagesResolution, isSuccess: isSuccessImagesResolution }
  ] = usePostImageResolutionConversionMutation();

  useEffect(() => {
    if (isSuccessImagesResolution) {
      dispatch(setImagesResolution(imagesResolution));
      dispatch(increaseCurrentSteps());
    }
  }, [dispatch, imagesResolution, isSuccessImagesResolution]);
  const { mobile, tablet, desktop } = useSelector(selectOptions);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = useCallback(
    ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
      setFileList(newFileList);
    },
    []
  );

  const beforeUpload = async (file: FileType) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
      return false;
    }

    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error('Image must be smaller than 10MB!');
      return false;
    }

    const { data, error } = await getUploadUrl({
      fileName: file.name,
      fileType: file.type || ''
    });

    if (error || !data?.presignedUrl) {
      message.error('File upload failed.');
      return false;
    }

    setAction(data.presignedUrl);
    setFileIdMap((prev) => ({
      ...prev,
      [file.uid]: {
        originalFileName: file.name,
        fileId: data.fileId,
        options: {
          mobile,
          tablet,
          desktop
        }
      }
    }));
    return true;
  };

  const customRequest = async (options: RcCustomRequestOptions) => {
    const { file, onSuccess, onError } = options;

    try {
      const response = await fetch(action, {
        method: 'PUT',
        body: file as Blob,
        headers: {
          'Content-Type': (file as File).type
        }
      });

      if (response.ok) {
        if (onSuccess) onSuccess(file);
        message.success('File uploaded successfully.');
        const currentFileIdMap = fileIdMap[(file as UploadFile).uid];
        postImageResolutionConversion(currentFileIdMap);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      if (onError) onError(error as ProgressEvent);
      message.error('File upload failed.');
    }
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
        customRequest={customRequest}
        beforeUpload={beforeUpload}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        height={300}
        multiple
        accept={'image/*'}
        method="PUT"
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
