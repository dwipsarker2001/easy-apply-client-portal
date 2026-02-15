import { useState } from 'react';
import { useAppDispatch } from '@/hooks';
import { useSocket } from './useSocket';
import { ChatFileItem, UseSendMessageProps } from '../types';
import { ChatTextItem } from '../types';
import { addFiles, addMessage, setMediaFrom } from '../redux/chatSlice';

export const useSendMessage = ({
  roomId,
  userId,
  clientId,
  senderRole = 'user',
}: UseSendMessageProps) => {
  const socket = useSocket();
  const dispatch = useAppDispatch();
  const [textValue, setTextValue] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const sendMessage = async () => {
    if (!textValue.trim() && !selectedFile) return;

    // ----------------------------
    // Upload file first if exists
    // ----------------------------
    if (selectedFile) {
      try {

        // File information goes here
        const fileInfo:ChatFileItem = {
          id: Date.now().toString(),
          type: "file",
          name: selectedFile.name,
          preview: URL.createObjectURL(selectedFile),
          direction: "sent",
          fileType: selectedFile.type,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        } 

        // Add file to Redux
        dispatch(addFiles(fileInfo));
        setSelectedFile(null);
      } catch (err) {
        console.error('File upload failed:', err);
      } finally {
        setIsUploading(false);
      }
    }

    // ----------------------------
    // Send text message if exists
    // ----------------------------
    if (textValue.trim()) {
      const message: ChatTextItem = {
        id: Date.now().toString(),
        type: 'text',
        content: textValue.trim(),
        direction: 'sent',
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

    dispatch(setMediaFrom(null));
  };

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
