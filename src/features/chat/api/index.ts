import { baseApi } from "@/api";
import { Message } from "../types";
import { addChatItem } from "../redux/chatSlice";
import { ChatItem } from "@/types";


export const chatApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    /* -------------------------------------
            Greetings QUERY
    -------------------------------------- */
    loadMessages: builder.query<
      Message[], // return type: Message array
      { clientId: number; userId: number }
    >({
      query: ({ clientId, userId }) =>
        `/client/messages?clientId=${clientId}&userId=${userId}`,

      transformResponse: (response: { success: boolean; data: Message[] }) =>
        response.data, // <-- now queryFulfilled.data is Message[]

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const messages = (await queryFulfilled).data;

          const chatItems: ChatItem[] = messages.map(msg => ({
            id: msg.id.toString(),
            type: "text",
            content: msg.message,
            direction: msg.senderRole === "user" ? "sent" : "received",
          }));

          dispatch(addChatItem(chatItems));
        } catch (error) {
          console.error("Failed to load messages", error);
        }
      },
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
  useLoadMessagesQuery,
  useUploadDocumentMutation,
  useUploadPhotoMutation,
  useUploadSignatureMutation,
} = chatApi;
