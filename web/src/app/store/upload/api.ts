import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EventTypes } from 'event-module';
import { FileUploadDto, FileUploadDtoResponse } from 'dto';

export const uploadApi = createApi({
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
    })
  })
});

export const { useLazyGetUploadUrlQuery } = uploadApi;
