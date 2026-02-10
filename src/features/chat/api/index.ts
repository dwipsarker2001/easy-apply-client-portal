import { baseApi } from "@/api";


export const chatApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    /* -------------------------------------
            Greetings QUERY
    -------------------------------------- */
    greetings: builder.query<{ message: string }, void>({
      query: () => `/client/greetings`,
    }),

    /* -------------------------------------
            Message QUERY
    -------------------------------------- */
    message: builder.mutation<{ reply: string }, { message: string }>({
      query: (payload) => ({
        url: "/client/message",
        method: "POST",
        body: payload,
      }),
    }),

    /* -------------------------------------
            Upload Document QUERY
    -------------------------------------- */
    uploadDocument: builder.mutation<{ status: boolean }, FormData>({
      query: (formData) => ({
        url: "/client/uploads",
        method: "POST",
        body: formData,
      }),
    }),

    /* -------------------------------------
            Upload Photo QUERY
    -------------------------------------- */
    uploadPhoto: builder.mutation<{ status: boolean }, FormData>({
      query: (formData) => ({
        url: "/client/upload-photo",
        method: "POST",
        body: formData,
      }),
    }),

    /* -------------------------------------
            Upload Signature QUERY
    -------------------------------------- */
    uploadSignature: builder.mutation<{ status: boolean }, FormData>({
      query: (formData) => ({
        url: "/client/upload-signature",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

// Note:
// Other response message will be done they are response

// Export Books Hooks
export const {
  useGreetingsQuery,
  useUploadDocumentMutation,
  useUploadPhotoMutation,
  useUploadSignatureMutation,
} = chatApi;
