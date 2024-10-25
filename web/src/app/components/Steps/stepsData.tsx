import Options from '@/app/components/Options';
import {
  SmileOutlined,
  SolutionOutlined,
  UploadOutlined
} from '@ant-design/icons';
import Upload from '@/app/components/Upload';
import React, { ReactNode } from 'react';
import DownloadList from '@/app/components/DownloadList';

export type Step = {
  title: string;
  content: ReactNode;
  icon?: ReactNode;
};

export const steps: Step[] = [
  {
    title: 'Choose settings',
    content: <Options />,
    icon: <SolutionOutlined />
  },
  {
    title: 'Upload images',
    content: <Upload />,
    icon: <UploadOutlined />
  },
  {
    title: 'Done',
    content: <DownloadList />,
    icon: <SmileOutlined />
  }
];
