import { useState } from 'react';
import { useAppDispatch } from '@/hooks';
import { useSocket } from './useSocket';
import { ChatItem, UseSendMessageProps } from '../types';
import { addFiles, addMessage, setMediaFrom } from '../redux/chatSlice';
import { useDocumentUpload } from '.';

export const useSendMessage = ({
  roomId,
  userId,
  clientId,
  senderRole = 'client',
}: UseSendMessageProps) => {
  const socket = useSocket();
  const dispatch = useAppDispatch();
  const [textValue, setTextValue] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Use your custom upload hook
  const { uploadDocument } = useDocumentUpload();

  // ----------------------------
  // Function to send message
  // ----------------------------
  const sendMessage = async () => {
    if (!textValue.trim() && !selectedFile) return;

    // ----------------------------
    // Handle file upload if exists
    // ----------------------------
    if (selectedFile) {
      // Save file to upload later
      const fileToUpload = selectedFile;

      // Clear selected file immediately for UI update
      setSelectedFile(null);

      setIsUploading(true);
      try {
        // Show preview in Redux before upload completes
        const fileInfo: ChatItem = {
          id: Date.now().toString(),
          type: 'file',
          message: fileToUpload.name,
          preview: URL.createObjectURL(fileToUpload),
          direction: 'sent',
          fileType: fileToUpload.type,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };
        dispatch(addFiles(fileInfo));

        // Prepare form data for upload
        const formData = new FormData();
        formData.append('document', fileToUpload);
        formData.append('clientId', clientId.toString());

        // Upload document
        await uploadDocument(formData);
      } catch (err) {
        console.error('File upload failed:', err);
      } finally {
        setIsUploading(false);
      }
    }

    // ----------------------------
    // Handle text message if exists
    // ----------------------------
    if (textValue.trim()) {
      const message: ChatItem = {
        id: Date.now().toString(),
        type: 'text',
        message: textValue.trim(),
        direction: "sent",
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      dispatch(addMessage(message));
      socket?.emit('send_message', {
        roomId,
        clientId,
        userId,
        senderRole,
        message: textValue.trim(),
        messageType: 'text',
      });

      setTextValue('');
    }

    // Reset media selection in Redux (optional)
    dispatch(setMediaFrom(null));
  };

  // ----------------------------
  // Handle file selection
  // ----------------------------
  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
    dispatch(setMediaFrom(null));
  };

  return {
    textValue,
    setTextValue,
    selectedFile,
    setSelectedFile,
    sendMessage,
    handleFileChange,
    isUploading,
  };
};
