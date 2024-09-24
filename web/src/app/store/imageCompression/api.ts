import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FileInfo } from '@/app/components/Upload';
import { EventTypes } from 'event-module';

export const imageCompressionApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.URL_IMAGE_RESOLUTION_CONVERSION
  }),
  endpoints: (builder) => ({
    getImageResolutionConversion: builder.query<unknown, FileInfo>({
      query: (payload) => ({
        url: `${EventTypes.IMAGE_RESOLUTION_CONVERSION}`,
        body: payload,
        method: 'POST'
      })
    })
  })
});

export const { useLazyGetImageResolutionConversionQuery } = imageCompressionApi;
