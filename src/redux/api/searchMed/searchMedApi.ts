import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "../../../core/utils/rtk.config";
import { endpoints } from "../../../core/constants/endpoints";
import { ISearchMedRequest, ISearchMedResponse } from "../types/ISearchMed";

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;

export const searchMedicationApi = createApi({
  reducerPath: "searchMedicationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
    prepareHeaders: prepareHeaders,
  }),
  tagTypes: ["results"],

  endpoints: (builder) => ({
    searchMedication: builder.query<ISearchMedResponse[], ISearchMedRequest>({
      query(request) {
        return {
          url: endpoints.SEARCH_MEDICATION,
          params: request,
        };
      },
      providesTags: ["results"],
    }),
  }),
});
export const { useSearchMedicationQuery } = searchMedicationApi;
