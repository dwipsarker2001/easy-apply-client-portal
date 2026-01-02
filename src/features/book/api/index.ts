import { baseApi } from "@/api";

export interface BookType {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  totalChapters: number;
  totalGroups: number;
  totalQuestions: number;
}

export const bookApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    /* -------------------------------------
            GET BOOK QUERY
    -------------------------------------- */
    getBook: builder.query<BookType, number>({
      query: (id) => `brain-bank/books/${id}`,
      providesTags: (result, error, id) => [{ type: "books", id }],
    }),

    /* -------------------------------------
            GET BOOKS QUERY
    -------------------------------------- */
    getBooks: builder.query<BookType[], void>({
      query: () => `brain-bank/books`,
      providesTags: ["books"],
    }),

    /* -------------------------------------
            CREATE BOOK QUERY
    -------------------------------------- */
    createBook: builder.mutation<BookType, FormData>({
      query: (formData) => ({
        url: "brain-bank/books/create",
        method: "POST",
        body: formData,
        invalidatesTags: ["books"],
      }),
    }),

    /* -------------------------------------
            UPDATE BOOK QUERY
    -------------------------------------- */
    updateBook: builder.mutation<
      BookType,
      { formData: FormData; bookId: number }
    >({
      query: ({ formData, bookId }) => ({
        url: `brain-bank/books/${bookId}`,
        method: "PATCH",
        body: formData,
      }),
    }),

    /* -------------------------------------
            DELETE BOOK QUERY
    -------------------------------------- */
    deleteBook: builder.mutation<{ status: boolean }, number>({
      query: (id) => ({
        url: `brain-bank/books/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export Books Hooks
export const {
  useGetBookQuery, // Get Book Information Hook
  useGetBooksQuery, // Get Book Information Hook
  useCreateBookMutation, // Create Book Information Hook
  useUpdateBookMutation, // Update Book Information Hook
  useDeleteBookMutation, // Delete Book Information Hook
} = bookApi;
