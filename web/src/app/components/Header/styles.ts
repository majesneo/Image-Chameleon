import theme from '@/app/themeConfig';

export const headerStyle = {
  zIndex: 100,
  width: '100%',
  borderTop: `5px solid ${theme?.token?.colorPrimary}`,
  display: 'grid',
  gridTemplateRows: 'minmax(min-content, 65px)',
  backgroundColor: 'white',
  boxShadow: '0 20px 40px 0 rgba(0, 0, 0, .02), 0 4px 6px 0 rgba(0, 0, 0, .03)',
  height: '100%'
};
