"use client"

export default function ImagePreview({ image, onConfirm, onCancel }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-full max-w-sm h-96 bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
        <img src={image || "/placeholder.svg"} alt="Preview" className="w-full h-full object-contain" />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white mb-2">Review Image</h3>
        <p className="text-slate-400 text-sm mb-6">Please confirm that the image is clear and properly positioned</p>
      </div>
      <div className="flex gap-4 w-full sm:w-auto">
        <button
          onClick={onCancel}
          className="flex-1 sm:flex-none border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white bg-transparent px-6 py-2 rounded-lg transition-all"
        >
          Back
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 sm:flex-none bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all"
        >
          Analyze
        </button>
      </div>
    </div>
  )
}
