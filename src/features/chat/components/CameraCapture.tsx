import { Camera01Icon, Cancel01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import React, { useEffect, useRef, useState } from 'react';

interface CameraCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (file: File) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({
  isOpen,
  onClose,
  onCapture,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [error, setError] = useState<string>('');

  // Start camera when component opens
  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          setIsCameraReady(true);
        };
      }
    } catch (err) {
      console.error('Camera error:', err);
      setError('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsCameraReady(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas to blob/file
      canvas.toBlob(
        blob => {
          if (blob) {
            const file = new File([blob], `photo_${Date.now()}.jpg`, {
              type: 'image/jpeg',
            });
            onCapture(file);
            handleClose();
          }
        },
        'image/jpeg',
        0.9
      );
    }
  };

  const handleClose = () => {
    stopCamera();
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent">
        <h2 className="text-white text-lg font-semibold">Take Photo</h2>
        <button
          onClick={handleClose}
          className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
        >
          <HugeiconsIcon icon={Cancel01Icon} size={24} className="text-white" />
        </button>
      </div>

      {/* Camera View */}
      <div className="flex-1 relative overflow-hidden bg-black">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-6">
              <p className="text-lg mb-2">⚠️ Camera Error</p>
              <p className="text-sm opacity-80">{error}</p>
            </div>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />

            {/* Loading indicator */}
            {!isCameraReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="text-white text-center">
                  <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-3" />
                  <p>Loading camera...</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Capture Button */}
      <div className="absolute bottom-0 left-0 right-0 pb-8 pt-6 bg-gradient-to-t from-black/60 to-transparent">
        <div className="flex justify-center items-center">
          <button
            onClick={capturePhoto}
            disabled={!isCameraReady || !!error}
            className="w-20 h-20 rounded-full bg-white border-4 border-gray-300 hover:scale-110 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <div className="w-full h-full rounded-full border-2 border-black flex items-center justify-center">
              <HugeiconsIcon icon={Camera01Icon} size={32} />
            </div>
          </button>
        </div>
        <p className="text-white text-center mt-3 text-sm">Tap to capture</p>
      </div>

      {/* Hidden canvas for capturing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CameraCapture;
