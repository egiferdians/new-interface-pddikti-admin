import { h } from 'preact';

export default function Box({ 
  title, 
  icon = null, 
  children, 
  detailUrl = null, 
  onDetailClick = null, 
  detailLabel = "Detail" 
}) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {icon && <span className="mr-2 text-gray-600">{icon}</span>}
          <h3 className="text-md font-semibold text-gray-700">{title}</h3>
        </div>

        {/* Tombol / Link Detail (opsional) */}
        {detailUrl && (
          <a
            href={detailUrl}
            className="text-sm text-blue-600 hover:underline"
          >
            {detailLabel}
          </a>
        )}
        {onDetailClick && (
          <button
            onClick={onDetailClick}
            className="text-sm text-blue-600 hover:underline"
          >
            {detailLabel}
          </button>
        )}
      </div>

      {/* Content */}
      <div className="text-gray-700">
        {children}
      </div>
    </div>
  );
}
