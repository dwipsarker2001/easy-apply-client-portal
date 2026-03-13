import { ModalConfig } from '@/types';

/*----------------------------------
  Confirmation Modal
----------------------------------*/
const ConfirmModal: React.FC<{
  config: ModalConfig;
  onCancel: () => void;
}> = ({ config, onCancel }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-[320px] p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto
          ${config.confirmColor === 'red' ? 'bg-red-50' : 'bg-orange-50'}`}
        >
          {config.confirmColor === 'red' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f97316"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
              <path d="M9 6V4h6v2" />
            </svg>
          )}
        </div>

        {/* Text */}
        <div className="text-center">
          <h3 className="text-gray-900 font-semibold text-base">
            {config.title}
          </h3>
          <p className="text-gray-500 text-sm mt-1">{config.description}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-1">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={config.onConfirm}
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors
              ${
                config.confirmColor === 'red'
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-orange-500 hover:bg-orange-600'
              }`}
          >
            {config.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
