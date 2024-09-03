import { CSSProperties } from 'react';
import theme from '@/app/themeConfig';

export const contentStyle: CSSProperties = {
  textAlign: 'center',
  color: 'white',
  backgroundColor: 'white',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 80,
  width: '100%'
};

export const layoutStyle: CSSProperties = {
  overflow: 'hidden',
  width: '100%',
  backgroundColor: 'white',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between'
};

export const ContentTitleStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  margin: '2rem 0',
  fontWeight: 'lighter'
};

export const ContentDescriptionStyle: CSSProperties = {
  display: 'inline-block',
  margin: '0 auto',
  background: '#fff',
  color: `${theme?.token?.colorPrimary}`,
  padding: '.25rem .5rem',
  lineHeight: '1.5rem',
  borderRadius: '6px',
  boxShadow: '-1px 1px 2px rgba(0, 0, 0, .27)',
  border: '1px solid rgba(0, 0, 0, .04)',
  textAlign: 'center',
  fontSize: '1.2rem'
};

export const TextStyle: CSSProperties = {
  color: `${theme?.token?.colorPrimary}`
};
