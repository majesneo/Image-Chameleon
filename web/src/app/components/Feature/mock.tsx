import Title from 'antd/lib/typography/Title';
import { TextStyle } from '@/app/styles';
import React, { ReactNode } from 'react';

export interface FeaturesMockI {
  id: number;
  desc: string;
  src: string;
  title: ReactNode;
}

const FeaturesMock: FeaturesMockI[] = [
  {
    id: 1,
    desc: 'Websites images are usually too big and unoptimized for web purposes. It is easy to save a few megabytes by compressing your assets without noticing any loss in quality.',
    src: '/fast-website.svg',
    title: (
      <Title>
        <b style={TextStyle}>Smaller</b> images, <b style={TextStyle}>Faster</b>{' '}
        websites
      </Title>
    )
  },
  {
    id: 2,
    desc:
      'Compress your images and improve your SEO ranking.\n' +
      '\n' +
      'Get a higher Lighthouse score and increase your visibility in search engines.',
    src: '/seo-optimized.svg',
    title: (
      <Title>
        <b style={TextStyle}>SEO</b> and <b style={TextStyle}>Lighthouse</b>{' '}
        optimized
      </Title>
    )
  },
  {
    id: 3,
    desc:
      'Achieve huge compressions while keeping the quality of the picture intact.\n' +
      '\n' +
      'Image chameleon can help you reduce drastically the size of your images and photos whilst maintaining a high quality with almost no difference visible to the eye.',
    src: '/high-quality-compression.svg',
    title: (
      <Title>
        <b style={TextStyle}>High</b> quality <b style={TextStyle}>image</b>{' '}
        compression
      </Title>
    )
  }
];

export default FeaturesMock;
