'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  type: AlertType;
  title: string;
  message?: string;
  onClose?: () => void;
  autoDismiss?: number;
}

interface AlertItem extends AlertProps {
  id: string;
}

const AlertContext = createContext<any>(null);

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const showAlert = useCallback((alert: AlertProps) => {
    const id = Math.random().toString(36).substring(7);
    const newAlert = { ...alert, id };
    
    setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);

    if (!alert.autoDismiss) {
      setTimeout(() => {
        setAlerts(prev => prev.filter(a => a.id !== id));
      }, 5000);
    }
  }, []);

  const removeAlert = useCallback((id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert, removeAlert }}>
      {children}
      <div className="fixed top-4 right-4 z-50 w-full max-w-sm space-y-3">
        {alerts.map((alert) => (
          <AlertItem key={alert.id} alert={alert} onClose={() => removeAlert(alert.id)} />
        ))}
      </div>
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within AlertProvider');
  }
  return context;
};

interface AlertItemProps {
  alert: AlertItem;
  onClose: () => void;
}

function AlertItem({ alert, onClose }: AlertItemProps) {
  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div className={`border rounded-lg p-4 ${colors[alert.type]} animate-slide-in`}>
      <div className="flex items-start gap-3">
        <div className="font-bold text-lg flex-shrink-0">{icons[alert.type]}</div>
        <div className="flex-1">
          <h3 className="font-semibold">{alert.title}</h3>
          {alert.message && <p className="text-sm mt-1 opacity-90">{alert.message}</p>}
        </div>
        <button onClick={onClose} className="text-lg font-bold opacity-60 hover:opacity-100">
          ✕
        </button>
      </div>
    </div>
  );
}
