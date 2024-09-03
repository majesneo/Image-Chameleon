import { CSSProperties } from 'react';
import theme from '@/app/themeConfig';

export const footerStyle: CSSProperties = {
  width: '100%',
  margin: '0 auto',
  padding: '2rem 0 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderBottom: `5px solid ${theme?.token?.colorPrimary}`
};
