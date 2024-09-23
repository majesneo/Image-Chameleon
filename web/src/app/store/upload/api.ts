import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EventTypes } from 'event-module';
import { FileUploadDto } from 'dto';

export const uploadApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL
  }),
  endpoints: (builder) => ({
    getUploadUrl: builder.query<{ presignedUrl: string }, FileUploadDto>({
      query: ({ fileName, fileType }) => ({
        url: `${EventTypes.FILE_UPLOAD}`,
        params: { fileName, fileType },
        method: 'GET'
      })
    })
  })
});

export const { useLazyGetUploadUrlQuery } = uploadApi;
