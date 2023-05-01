import { endpoints } from "./../../../core/constants/endpoints";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../types/IUser";
import { prepareHeaders } from "../../../core/utils/rtk.config";
import { IResponse } from "../types/IResponseRequest";

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
    prepareHeaders: prepareHeaders,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query<IUser, void>({
      query() {
        return {
          url: endpoints.USER,
        };
      },
    }),
    users: builder.query<IUser[], void>({
      query() {
        return {
          url: endpoints.USERS,
        };
      },
      transformResponse: (response: { data: IUser[] }) => response.data,
    }),
    deleteUser: builder.mutation<IResponse, number>({
      query(id) {
        return {
          url: endpoints.USERS + "/" + id,
          method: "DELETE",
        };
      },
    }),
    showUser: builder.query<IUser, number>({
      query: (id) => ({
        url: endpoints.USERS + "/" + id,
      }),
    }),
    updateUser: builder.mutation<IUser, number>({
      query(id) {
        return {
          url: endpoints.USERS + "/" + id,
          method: "PUT",
        };
      },
    }),
  }),
});
export const {
  useUsersQuery,
  useGetMeQuery,
  useShowUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApi;
