import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { EventTypes } from 'event-module';
import { FileUploadDto } from 'dto';

export const uploadApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL
  }),
  endpoints: (builder) => ({
    getUploadUrl: builder.query({
      query: ({ fileName, fileType }: FileUploadDto) => ({
        url: `${EventTypes.FILE_UPLOAD}`,
        params: { fileName, fileType },
        method: 'GET'
      }),
      transformResponse(baseQueryReturnValue) {
        console.log(baseQueryReturnValue, 'baseQueryReturnValue');
        return baseQueryReturnValue;
      }
    })
  })
});

export const { useLazyGetUploadUrlQuery } = uploadApi;
