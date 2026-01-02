import { useDeleteBookMutation, useCreateBookMutation, useUpdateBookMutation, useGetBooksQuery } from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import ConfirmationToast from "@/components/ConfirmationToast";

/*--------------------------------------------
          CREATE NEW BOOK
-------------------------------------------*/
export const useCreateBook = () => {
  const navigate = useNavigate();
  const { refetch } = useGetBooksQuery();
  const [createBook, { data, isLoading, error }] = useCreateBookMutation();

  const handleCreate = async (formData: FormData) => {
    try {
      const result = await createBook(formData).unwrap();
      toast.success("Book created successfully!");
      navigate(`/brain-bank/books/${result.id}`);
      refetch();
    } catch (err) {
      toast.error("Failed to create book.");
      console.error("Error creating book:", err);
    }
  };

  return {
    createBook: handleCreate,
    data,
    isLoading,
    error,
  };
};

/*--------------------------------------------
          UPDATE THE BOOK
-------------------------------------------*/
export const useUpdateBook = () => {
  const { refetch } = useGetBooksQuery();
  const [updateBook, { data, isLoading, error }] = useUpdateBookMutation();

  const handleUpdate = async (bookId: number, formData: FormData) => {
    try {
      await updateBook({ formData, bookId });
      toast.success("Book updated successfully!");
      refetch();
    } catch (err) {
      toast.error("Failed to update book");
      console.log("Failed to update book", err);
    }
  };

  return {
    updateBook: handleUpdate,
    data,
    isLoading,
    error,
  };
};

/*--------------------------------------------
          DELETE THE BOOK
-------------------------------------------*/
export const useDeleteBook = () => {
  const { refetch } = useGetBooksQuery();
  const [deleteBook, { isLoading, error }] = useDeleteBookMutation();

  const handleDelete = (bookId: number, onSuccess?: () => void) => {
    const toastId = `delete-confirm-${bookId}`;
    const message = "Do you really want to delete this book?";

    const onConfirm = async () => {
      try {
        toast.dismiss(toastId);
        await deleteBook(bookId);
        onSuccess && onSuccess();
        refetch();
      } catch (err) {
        toast.error("Failed to delete the book.");
      }
    };

    // delete after confirm
    const modalElement = <ConfirmationToast toastId={toastId} message={message} onConfirm={onConfirm} />;
    toast(modalElement, { toastId });
  };

  return {
    deleteBook: handleDelete,
    isLoading,
    error,
  };
};
