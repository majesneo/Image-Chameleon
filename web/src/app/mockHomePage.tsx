import Options from '@/app/components/Options';
import {
  SmileOutlined,
  SolutionOutlined,
  UploadOutlined
} from '@ant-design/icons';
import Upload from '@/app/components/Upload';
import React from 'react';
import { Step } from '@/app/components/Steps';

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
    title: 'Process',
    content: <div>Process</div>
  },
  {
    title: 'Done',
    content: <div>Last</div>,
    icon: <SmileOutlined />
  }
];
