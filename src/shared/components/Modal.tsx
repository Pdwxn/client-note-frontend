"use client";

export default function Modal({ children, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-black"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
