import { baseApi } from '@/api';
import { UserInfo, UserResponse } from '../types';
import { login, setClientId, setLoginSheet } from '../redux/authSlice';

/*----------------------------------
  Types
----------------------------------*/
export interface ClientType {
  id: string;
  name: string;
  phoneNumber: string;
  createdAt: string;
}

export type RegisterPayload = {
  name: string;
  phoneNumber: string;
};

export interface ClientState {
  clientId: number | null;
}

export interface RegisterApiResponse {
  success: boolean;
  message: string;
  data: {
    clientId: number;
  };
}


/*----------------------------------
  RTK Query clientApi
----------------------------------*/
export const clientApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: builder => ({

    /* ------------------------------
       Get Shop owner information
    ------------------------------ */
    userInfo: builder.query<UserInfo, string>({
      query: username => `/api/auth/${username}`,
      transformResponse: (response: UserResponse) => response.data,
      async onQueryStarted(username, { dispatch, queryFulfilled }) {
        try {
          const user = await queryFulfilled;
          dispatch(login(user.data));
        } catch (error) {
          console.error('Failed to fetch owner info', error);
        }
      },
    }),


    /* ------------------------------
       Register Client
    ------------------------------ */
    register: builder.mutation<RegisterApiResponse, RegisterPayload>({
      query: payload => ({
        url: '/client/register',
        method: 'POST',
        body: payload,
      }),

      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // update Redux state here
          localStorage.setItem('clientId', String(data.data.clientId));
          dispatch(setClientId(data.data.clientId));
          dispatch(setLoginSheet(false));
        } catch (err) {
          console.error('Registration failed', err);
        }
      },
    }),
    /* ------------------------------
       Get All Clients
    ------------------------------ */
    getAllClients: builder.query<ClientType[], void>({
      query: () => '/client/clients',
      providesTags: ['Client'],
    }),
  }),
});

/*----------------------------------
  Export hooks
----------------------------------*/
export const { useUserInfoQuery, useRegisterMutation, useGetAllClientsQuery } = clientApi;
