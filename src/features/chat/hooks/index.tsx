import { useAppDispatch } from '@/hooks';
import { useClearChatMutation, useUploadDocumentMutation } from '../api';
import { toast } from 'react-toastify';
import { clearChat } from '../redux/chatSlice';
export { useChatAreaController } from './useChatAreaController';

/*--------------------------------------------
          Use Document Upload
-------------------------------------------*/
export const useDocumentUpload = () => {
  const [uploadDocument, { data, isLoading, error }] =
    useUploadDocumentMutation();

  const handleUpload = async (formData: FormData) => {
    try {
      const result = await uploadDocument(formData).unwrap();
      return result;
    } catch (err) {
      console.error('Error uploading document:', err);
      throw err;
    }
  };

  return {
    uploadDocument: handleUpload,
    data,
    isLoading,
    error,
  };
};

/*--------------------------------------------
          Use Document Upload
-------------------------------------------*/
export const useClearChat = () => {
  const dispatch = useAppDispatch();
  const [clearChatMutation, { data, isLoading, error }] =
    useClearChatMutation();

  const handleClearChat = async (userId: number, clientId: number) => {
    try {
      dispatch(clearChat());
      const result = await clearChatMutation({ userId, clientId }).unwrap();
      toast.success('Chat cleared successfully');
      return result;
    } catch (err) {
      toast.error('Failed to clear chat.');
      console.error('Error clearing chat:', err);
      throw err;
    }
  };

  return {
    handleClearChat,
    data,
    isLoading,
    error,
  };
};
