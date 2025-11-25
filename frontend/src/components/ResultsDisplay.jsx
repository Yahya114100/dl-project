"use client"

export default function ResultsDisplay({ diagnosis, confidence, image, onReset }) {
  const isPneumonia = diagnosis.toLowerCase().includes("pneumonia detected")
  const confidencePercent = Math.round(confidence * 100)

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full bg-slate-700/30 rounded-lg p-4 border border-slate-600">
        <p className="text-slate-400 text-sm font-medium mb-3">Analyzed X-ray Image</p>
        <div className="relative w-full bg-slate-900 rounded-lg overflow-hidden" style={{ aspectRatio: "16/10" }}>
          <img src={image || "/placeholder.svg"} alt="Analyzed chest X-ray" className="w-full h-full object-contain" />
        </div>
      </div>

      <div
        className={`w-20 h-20 rounded-full flex items-center justify-center ${isPneumonia ? "bg-red-500/20" : "bg-green-500/20"}`}
      >
        {isPneumonia ? (
          <svg
            className="w-10 h-10 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 6l12 12M6 18L18 6"
            />
          </svg>) : (
          <svg className="w-10 h-10 text-green-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 15.172l9.192-9.193a1 1 0 111.415 1.415l-10.606 10.606a1 1 0 01-1.415 0l-4.242-4.243a1 1 0 111.415-1.415l3.036 3.035z" />
          </svg>
        )}
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          {isPneumonia ? "Pneumonia Detected" : "No Pneumonia Detected"}
        </h2>
      </div>

      <div className="w-full bg-slate-700/50 rounded-lg p-6 border border-slate-600">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-slate-300 font-medium">Model Confidence</span>
          </div>
          <span className="text-2xl font-bold text-blue-400">{confidencePercent}%</span>
        </div>
        <div className="w-full bg-slate-600 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${isPneumonia ? "bg-red-500" : "bg-green-500"}`}
            style={{ width: `${confidencePercent}%` }}
          ></div>
        </div>
        <p className="text-slate-400 text-sm mt-4">
          This confidence score represents the model's certainty in its diagnosis.
        </p>
      </div>
      <button
        onClick={onReset}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-all"
      >
        Analyze Another Image
      </button>
    </div>
  )
}
