"use client"

import { useRef } from "react"

export default function ImageUploader({ onImageSelect }) {
  const fileInputRef = useRef(null)

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64 = e.target?.result
        onImageSelect(base64)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    event.currentTarget.classList.add("border-blue-400", "bg-blue-400/5")
  }

  const handleDragLeave = (event) => {
    event.preventDefault()
    event.currentTarget.classList.remove("border-blue-400", "bg-blue-400/5")
  }

  const handleDrop = (event) => {
    event.preventDefault()
    event.currentTarget.classList.remove("border-blue-400", "bg-blue-400/5")
    const file = event.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64 = e.target?.result
        onImageSelect(base64)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="w-full border-2 border-dashed border-slate-600 rounded-xl p-8 text-center cursor-pointer transition-all duration-300 hover:border-blue-400 hover:bg-blue-400/5"
      >
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-blue-400/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Upload Chest X-Ray</h3>
        <p className="text-slate-400 mb-4">Drag and drop your X-ray image here or click to select</p>
        <p className="text-slate-500 text-sm">Supported formats: JPG, PNG, DICOM</p>
      </div>
      <button
        onClick={() => fileInputRef.current?.click()}
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-lg font-medium transition-all"
      >
        Choose File
      </button>
    </div>
  )
}
