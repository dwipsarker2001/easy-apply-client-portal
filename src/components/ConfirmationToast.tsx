import React from "react";
import { toast } from "react-toastify";

interface PropsType {
  toastId: string;
  message?: string;
  onConfirm: () => void;
}

const ConfirmationToast: React.FC<PropsType> = (props) => {
  const { toastId, message, onConfirm } = props;
  const onCancel = () => toast.dismiss(toastId);

  return (
    <div className="w-[360px] max-w-full rounded-lg border-gray-200 bg-white">
      <p className="text-sm text-gray-800">{message && "Are you sure?"}</p>
      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="bg-background border-border rounded-md border px-3 py-0.5 text-sm text-gray-700 transition hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="rounded-md bg-red-500 px-3 py-0.5 text-sm text-white transition hover:bg-red-600"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmationToast;
