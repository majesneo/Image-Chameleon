import { useCallback } from 'react';
import { message } from 'antd';

const useDownload = () => {
  const defaultGetFileName = useCallback((url: string): string => {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const segments = pathname.split('/');
      return segments[segments.length - 1] || 'downloaded_file';
    } catch (err) {
      console.error('Invalid URL:', url);
      throw err;
    }
  }, []);

  const download = useCallback(
    async (url: string) => {
      try {
        const response = await fetch(url, { mode: 'cors' });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const blob = await response.blob();
        const urlBlob = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = urlBlob;
        link.download = defaultGetFileName(url);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(urlBlob);
        message.success(`File "${link.download}" successfully uploaded.`);
      } catch (err) {
        console.error('Error downloading the file:', err);
        message.error('Failed to upload the file.');
      }
    },
    [defaultGetFileName]
  );

  return { download };
};

export default useDownload;
