'use client';

import React, { useState } from 'react';
import AddActionRT from '../ActionButton/AddactionRT';
import AddActionPenduduk from '../ActionButton/AddactionPenduduk';

type TabType = 'rt' | 'penduduk';

interface AddActionProps {
  onClose?: () => void;
}

export default function AddAction({ onClose }: AddActionProps) {
  const [activeTab, setActiveTab] = useState<TabType>('rt');

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Tabs Navigation */}
      <div className="bg-white shadow-md rounded-xl mb-6">
        <div className="flex gap-2 p-2 border-b">
          <button
            onClick={() => setActiveTab('rt')}
            className={`cursor-pointer flex-1 px-6 py-3 font-semibold rounded-lg transition-colors ${
              activeTab === 'rt'
                ? 'bg-blue-400 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Data RT
          </button>
          <button
            onClick={() => setActiveTab('penduduk')}
            className={`cursor-pointer flex-1 px-6 py-3 font-semibold rounded-lg transition-colors ${
              activeTab === 'penduduk'
                ? 'bg-blue-400 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Data Penduduk
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'rt' ? <AddActionRT onClose={onClose} /> : <AddActionPenduduk onClose={onClose} />}
    </div>
  );
}
