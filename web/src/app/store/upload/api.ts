import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EventTypes } from 'event-module';
import {
  FileDownloadDto,
  FileDownloadDtoResponse,
  FileUploadDto,
  FileUploadDtoResponse
} from 'dto';

export const uploadApi = createApi({
  reducerPath: 'uploadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.URL_UPLOAD
  }),
  endpoints: (builder) => ({
    getUploadUrl: builder.query<FileUploadDtoResponse, FileUploadDto>({
      query: ({ fileName, fileType }) => ({
        url: `${EventTypes.FILE_UPLOAD}`,
        params: { fileName, fileType },
        method: 'GET'
      })
    }),
    getDownloadUrl: builder.query<FileDownloadDtoResponse, FileDownloadDto>({
      query: ({ fileId }) => ({
        url: `${EventTypes.FILE_DOWNLOAD}`,
        params: { fileId },
        method: 'GET'
      })
    })
  })
});

export const { useLazyGetUploadUrlQuery } = uploadApi;
