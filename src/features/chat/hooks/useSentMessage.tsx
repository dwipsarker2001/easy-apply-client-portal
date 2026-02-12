import { useState } from 'react';
import { useAppDispatch } from '@/hooks';
import { useSocket } from './useSocket';
import { UseSendMessageProps } from '../types';
import { ChatTextItem } from '@/types';
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

  const sendMessage = () => {
    if (!textValue.trim() && !selectedFile) return;

    // Send file if exists
    if (selectedFile) {
      dispatch(addFiles([selectedFile]));
      socket?.emit('send_message', {
        roomId,
        clientId,
        userId,
        senderRole,
        message: selectedFile.name,
        fileType: 'document',
      });
      setSelectedFile(null);
    }

    // Send text message if exists
    if (textValue.trim()) {
      const message: ChatTextItem = {
        id: Date.now().toString(),
        type: 'text',
        content: textValue.trim(),
        direction: 'sent',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // e.g., "08:42"
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
  };
};
