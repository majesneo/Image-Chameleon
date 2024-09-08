'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  Flex,
  Image,
  Skeleton,
  Slider,
  SliderSingleProps,
  Typography
} from 'antd';
import imageCompression from 'browser-image-compression';
import { WrapperSlider } from '@/app/components/ImageCompressionSlider/styles';
import { TextStyle } from '@/app/styles';

const { Text } = Typography;

type CompressionLevel = number;

const marks: SliderSingleProps['marks'] = {
  0: '0%',
  100: '100%'
};

const ImageCompressionSlider: React.FC = () => {
  const [compression, setCompression] = useState<CompressionLevel>(100);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const imageUrl: string = '/image-compression.jpeg';
  const isFirstLoading = useRef(true);
  const qualityReduction = Number(
    (100 - (compressedSize / originalSize) * 100).toFixed(2)
  );
  useEffect(() => {
    compressImage(compression);
    isFirstLoading.current = false;
  }, [compression]);

  const handleSliderChange = (value: CompressionLevel): void => {
    setCompression(value);
  };

  const compressImage = async (quality: CompressionLevel): Promise<void> => {
    if (isFirstLoading.current) {
      setLoading(true);
    }
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
      initialQuality: quality === 0 ? 0.01 : quality / 100
    };

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      setOriginalSize(blob.size / 1024);
      const compressedFile = await imageCompression(blob as File, options);
      setCompressedSize(compressedFile.size / 1024);
      const compressedImageUrl = URL.createObjectURL(compressedFile);
      setCompressedImage(compressedImageUrl);
    } catch (error) {
      console.error('Error compressing the image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex style={WrapperSlider}>
      <Text style={TextStyle}>Change the image quality</Text>
      <Slider
        marks={marks}
        style={{ width: '100%', maxWidth: 400, zIndex: 10 }}
        min={0}
        max={100}
        value={compression}
        onChange={handleSliderChange}
      />
      <Flex
        style={{ marginTop: '20px', width: '100%', flexDirection: 'column' }}
      >
        <Skeleton.Image
          active={true}
          style={{
            width: '600px',
            height: '400px',
            display: !loading && !isFirstLoading.current ? 'none' : 'flex'
          }}
        />
        <>
          <Image
            src={compressedImage || ''}
            alt="Compressed"
            style={{
              width: '600px',
              height: '400px',
              display: compressedImage ? 'block' : 'none',
              boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.5)',
              borderRadius: 4
            }}
          />
          <Flex
            style={{
              marginTop: '20px',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Text>
              Original Size:{' '}
              <span style={TextStyle}>{originalSize.toFixed(2)} KB</span>
            </Text>
            <Text>
              Compressed Size:{' '}
              <span style={TextStyle}>{compressedSize.toFixed(2)} KB</span>
            </Text>
            <Text>
              Quality reduction :{' '}
              <span style={TextStyle}>
                {isNaN(qualityReduction) ? 0 : qualityReduction}%
              </span>
            </Text>
          </Flex>
        </>
      </Flex>
    </Flex>
  );
};

export default ImageCompressionSlider;
