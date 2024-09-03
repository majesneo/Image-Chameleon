'use client';
import React, { ReactNode } from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import '../../public/globals.css';
import { layoutStyle } from '@/app/styles';
import { ConfigProvider, Layout } from 'antd';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import theme from '@/app/themeConfig';
import { Head } from '@/app/Head';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      style={{
        minWidth: '100vw',
        backgroundColor: theme?.token?.colorPrimary
      }}
      lang="en"
    >
      <Head />
      <body style={{ minWidth: '100vw' }}>
        <AntdRegistry>
          <ConfigProvider theme={theme}>
            <Layout style={layoutStyle}>
              <Header />
              <main style={{ minWidth: '100vw' }}>{children}</main>
              <Footer />
            </Layout>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
