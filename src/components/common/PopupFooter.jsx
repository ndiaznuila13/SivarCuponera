export default function PopupFooter({ open, onClose, title, children }) {
  if (!open) return null
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative mx-4">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-[#002147]">{title}</h2>
        <div className="text-slate-600 text-sm">{children}</div>
      </div>
    </div>
  )
}
