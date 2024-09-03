'use client';
import { FC } from 'react';

export const Head: FC = () => (
  <head>
    <title>Image Chameleon</title>
    <meta
      name="description"
      content="Optimize and compress JPEG, PNG, SVG, GIF and WEBP images online. Compress, resize and rename your photos for free."
    />
    <meta
      name="title"
      content="Image Chameleon - optimize and compress JPEG photos and PNG images"
    />
    <meta property="og:type" content="website" />
    {/*<meta property="og:url" content="https://image-chameleon.io/" />*/}
    <meta
      property="og:title"
      content="Image Chameleon - optimize and compress JPEG photos and PNG images"
    />
    <meta
      property="og:description"
      content="Optimize and compress your jpeg and png images online. Image Chameleon is a lossy and lossless photo compression tool."
    />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/favicon.ico" />
    {/*<link rel="canonical" href="https://image-chameleon.io" />*/}
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="next-head-count" content="10" />
  </head>
);
