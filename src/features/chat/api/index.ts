import { baseApi } from "@/api";
import { ChatItem, ChatResponse } from "../types";
import { addChatItem } from "../redux/chatSlice";
const baseUrl = import.meta.env.VITE_BASE_URL;

/* -------------------------------------------------------
   Types
-------------------------------------------------------- */
type LoadMessagesResponse = {
  success: boolean;
  data: ChatResponse[];
};

/* -------------------------------------------------------
   Helper Mapper
-------------------------------------------------------- */
const mapToChatItem = (msg: ChatResponse): ChatItem => ({
  id: String(msg.id),
  message: msg.message,
  direction: msg.senderRole === "client" ? "sent" : "received",
  time: new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  type: msg.messageType,
  fileType: msg.mimeType ?? undefined,
  preview: baseUrl + "/uploads/clients/" + msg.message,
});

/* -------------------------------------------------------
   API
-------------------------------------------------------- */
export const chatApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    /* ===============================
       Load Messages
    =============================== */
    loadMessages: builder.query<
      ChatResponse[],
      { clientId: number; userId: number }
    >({
      query: ({ clientId, userId }) =>
        `/client/messages?clientId=${clientId}&userId=${userId}`,

      transformResponse: (response: LoadMessagesResponse) =>
        response.data,

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          
          // map tha data
          const chatItems = data.map(mapToChatItem);

          dispatch(addChatItem(chatItems));
        } catch (error) {
          console.error("Load messages failed:", error);
        }
      },
    }),

    /* ===============================
       Upload Factory
    =============================== */
    uploadDocument: builder.mutation<{ status: boolean }, FormData>({
      query: (body) => ({
        url: "/client/uploads",
        method: "POST",
        body,
      }),
    }),

    uploadPhoto: builder.mutation<{ status: boolean }, FormData>({
      query: (body) => ({
        url: "/client/upload-photo",
        method: "POST",
        body,
      }),
    }),

    uploadSignature: builder.mutation<{ status: boolean }, FormData>({
      query: (body) => ({
        url: "/client/upload-signature",
        method: "POST",
        body,
      }),
    }),
  }),
});

/* -------------------------------------------------------
   Hooks
-------------------------------------------------------- */
export const {
  useLoadMessagesQuery,
  useUploadDocumentMutation,
  useUploadPhotoMutation,
  useUploadSignatureMutation,
} = chatApi;
