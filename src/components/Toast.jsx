import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  const ToastContainer = () => (
    <div className="fixed bottom-4 right-4 z-[9999] space-y-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`p-4 rounded-lg shadow-lg text-white ${toast.type === 'success' ? 'bg-green-500' : toast.type === 'error' ? 'bg-red-500' : 'bg-gray-700'}`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );

  return (
    <ToastContext.Provider value={{ addToast, ToastContainer }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);


