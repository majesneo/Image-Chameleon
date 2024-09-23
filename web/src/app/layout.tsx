'use client';
import React, { ReactNode } from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import '../../public/globals.css';
import { layoutStyle } from '@/app/styles';
import { App as AntdApp, ConfigProvider, Layout } from 'antd';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import theme from '@/app/themeConfig';
import { Head } from '@/app/Head';
import { Provider } from 'react-redux';
import { appStore } from '@/app/store';

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
          <Provider store={appStore}>
            <ConfigProvider theme={theme}>
              <AntdApp>
                <Layout style={layoutStyle}>
                  <Header />
                  <main style={{ minWidth: '100vw' }}>{children}</main>
                  <Footer />
                </Layout>
              </AntdApp>
            </ConfigProvider>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
