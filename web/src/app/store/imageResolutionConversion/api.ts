import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EventTypes } from 'event-module';
import { ImageResolutionConversionDto } from 'dto';

export const imageResolutionConversionApi = createApi({
  reducerPath: 'imageResolutionConversionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.URL_UPLOAD
  }),
  endpoints: (builder) => ({
    postImageResolutionConversion: builder.mutation<
      string[],
      ImageResolutionConversionDto
    >({
      query: (payload) => ({
        url: `${EventTypes.IMAGE_RESOLUTION_CONVERSION}`,
        body: payload,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    })
  })
});

export const { usePostImageResolutionConversionMutation } =
  imageResolutionConversionApi;
