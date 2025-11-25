"use client"

import { useState } from "react"
import ImageUploader from "./components/ImageUploader"
import ImagePreview from "./components/ImagePreview"
import ResultsDisplay from "./components/ResultsDisplay"
import "./globals.css"

export default function App() {
  const [step, setStep] = useState("upload")
  const [selectedImage, setSelectedImage] = useState(null)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)

  const analyzeImage = async (imageBase64) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return {
      diagnosis: Math.random() > 0.5 ? "Pneumonia Detected" : "No Pneumonia",
      confidence: 0.85 + Math.random() * 0.14,
    }
  }

  const handleImageSelect = (base64) => {
    setSelectedImage(base64)
    setStep("preview")
    setError(null)
  }

  const handleConfirm = async () => {
    if (!selectedImage) return
    setStep("analyzing")
    setError(null)
    try {
      const data = await analyzeImage(selectedImage)
      setResults(data)
      setStep("results")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during analysis")
      setStep("preview")
    }
  }

  const handleReset = () => {
    setStep("upload")
    setSelectedImage(null)
    setResults(null)
    setError(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg viewBox="0 0 1200 800" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="medical-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
              <path d="M 100 20 Q 120 50 100 80" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
              <circle cx="150" cy="100" r="25" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
              <path d="M 20 150 L 80 150" stroke="currentColor" strokeWidth="2" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="1200" height="800" fill="url(#medical-pattern)" className="text-blue-400" />
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.15"
            className="text-blue-400"
          />
          <circle
            cx="1100"
            cy="700"
            r="120"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.1"
            className="text-blue-400"
          />
          <g opacity="0.15" className="text-blue-400" stroke="currentColor" fill="none" strokeWidth="1.5">
            <path d="M 600 150 Q 550 200 550 300 Q 550 400 600 450" />
            <path d="M 600 150 Q 650 200 650 300 Q 650 400 600 450" />
            <circle cx="550" cy="250" r="20" opacity="0.4" />
            <circle cx="650" cy="280" r="22" opacity="0.4" />
            <path d="M 600 450 L 600 550" />
          </g>
        </svg>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-4xl font-bold text-white">Pneumonia Detection</h1>
          </div>
          <p className="text-slate-400 text-lg">AI-powered chest X-ray analysis</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 shadow-2xl rounded-lg p-8">
          {error && (
            <div className="mb-6 bg-red-900/30 border border-red-700/50 rounded-lg p-4 flex gap-3">
              <svg
                className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4v2m0 0v0m0-6v0m0 4h.01"
                />
              </svg>
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {step === "upload" && <ImageUploader onImageSelect={handleImageSelect} />}
          {step === "preview" && selectedImage && (
            <ImagePreview
              image={selectedImage}
              onConfirm={handleConfirm}
              onCancel={() => {
                setStep("upload")
                setSelectedImage(null)
              }}
            />
          )}
          {step === "analyzing" && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative w-16 h-16 mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-75 animate-pulse"></div>
                <div className="absolute inset-2 bg-slate-800 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 border-3 border-blue-400 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
              </div>
              <p className="text-slate-300 text-center text-lg font-medium">Analyzing X-ray image...</p>
              <p className="text-slate-500 text-center text-sm mt-2">This may take a few moments</p>
            </div>
          )}
          {step === "results" && results && (
            <ResultsDisplay
              diagnosis={results.diagnosis}
              confidence={results.confidence}
              image={selectedImage}
              onReset={handleReset}
            />
          )}
        </div>
       </div>
    </main>
  )
}
