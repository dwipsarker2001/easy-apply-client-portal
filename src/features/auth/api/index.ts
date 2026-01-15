import { baseApi } from "@/api";

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
  endpoints: (builder) => ({

    /* ------------------------------
       Register Client
    ------------------------------ */
    register: builder.mutation<RegisterApiResponse, RegisterPayload>({
      query: (payload) => ({
        url: '/client/register',
        method: 'POST',
        body: payload,
      }),
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
export const { 
  useRegisterMutation,
  useGetAllClientsQuery

 } = clientApi;
