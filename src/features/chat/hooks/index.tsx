import {
  useUploadDocumentMutation,
  useUploadPhotoMutation,
  useUploadSignatureMutation,
} from "../api";
import { toast } from "react-toastify";

/*--------------------------------------------
          Use Document Upload
-------------------------------------------*/
export const useDocumentUpload = () => {
  const [uploadDocument, { data, isLoading, error }] =
    useUploadDocumentMutation();

  const handleUpload = async (formData: FormData) => {
    try {
      const result = await uploadDocument(formData).unwrap();
      console.log(result,'this is result');
      toast.success("Document uploaded successfully!");
      return result;
    } catch (err) {
      toast.error("Failed to upload document.");
      console.error("Error uploading document:", err);
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
          Use Photo Upload
-------------------------------------------*/
export const usePhotoUpload = () => {
  const [uploadPhoto, { data, isLoading, error }] = useUploadPhotoMutation();

  const handleUpload = async (formData: FormData) => {
    try {
      const result = await uploadPhoto(formData).unwrap();
      toast.success("Photo uploaded successfully!");
      return result;
    } catch (err) {
      toast.error("Failed to upload photo.");
      console.error("Error uploading photo:", err);
      throw err;
    }
  };

  return {
    uploadPhoto: handleUpload,
    data,
    isLoading,
    error,
  };
};

/*--------------------------------------------
          Use Signature Upload
-------------------------------------------*/
export const useSignatureUpload = () => {
  const [uploadSignature, { data, isLoading, error }] =
    useUploadSignatureMutation();

  const handleUpload = async (formData: FormData) => {
    try {
      const result = await uploadSignature(formData).unwrap();
      toast.success("Signature uploaded successfully!");
      return result;
    } catch (err) {
      toast.error("Failed to upload signature.");
      console.error("Error uploading signature:", err);
      throw err;
    }
  };

  return {
    uploadSignature: handleUpload,
    data,
    isLoading,
    error,
  };
};
