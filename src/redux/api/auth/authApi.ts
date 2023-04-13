import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../configuredURL";
import { endpoints } from "../../../core/constants/endpoints";
import { prepareHeaders } from "../../../core/utils/rtk.config";
import { ILoginRequest } from "../../../pages/Login";
import { ILoginResponse, IRegisterRequest, IUser } from "../types/IUser";

export interface userState {
  user: IUser | null;
}
const headers = { Accept: "application/json" };
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
    //prepareHeaders: prepareHeaders,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query(loginRequest) {
        return {
          url: endpoints.SIGN_IN,
          method: "POST",
          body: loginRequest,
        };
      },
    }),
    register: builder.mutation({
      query(registerRequest: IRegisterRequest) {
        return {
          url: "/api/auth/register",
          headers: headers,
          method: "POST",
          body: registerRequest,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
