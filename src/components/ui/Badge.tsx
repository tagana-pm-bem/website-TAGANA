import React from 'react';

interface BadgeProps {
  type: 'success' | 'error';
  message?: string;
  detail?: string;
}

const Badge: React.FC<BadgeProps> = ({ type, message, detail }) => {
  const badges = {
    success: {
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      borderColor: 'border-green-300',
      icon: '✓',
      defaultMessage: 'Upload Berhasil',
      defaultDetail: 'File gambar berhasil di unggah'
    },
    error: {
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      borderColor: 'border-red-300',
      icon: '✕',
      defaultMessage: 'Gagal Menyimpan',
      defaultDetail: 'Koneksi terputus'
    }
  };

  const badge = badges[type];

  return (
    <div className={`flex items-center gap-2 px-4 py-3 rounded-lg border ${badge.bgColor} ${badge.borderColor}`}>
      <div className={`flex items-center justify-center w-6 h-6 rounded-full ${badge.textColor} font-bold text-sm`}>
        {badge.icon}
      </div>
      <div className="flex flex-col">
        <span className={`font-semibold ${badge.textColor} text-sm`}>
          {message || badge.defaultMessage}
        </span>
        <span className={`text-xs ${badge.textColor} opacity-80`}>
          {detail || badge.defaultDetail}
        </span>
      </div>
    </div>
  );
};

export default Badge;
export { Badge };
