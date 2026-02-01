"use client";

import { useState } from "react";

export default function UploadBox() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const removeBackground = async () => {
    if (!image) return;

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", image);

      const response = await fetch("https://ramandeepsinghbhella-ai-image-editor.hf.space/remove-bg", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Background removal failed");
      }

      const blob = await response.blob();
      const outputUrl = URL.createObjectURL(blob);
      setResult(outputUrl);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while removing background");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!result) return;

    const link = document.createElement("a");
    link.href = result;
    link.download = "removed-background.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};


  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-xl mx-auto">
      {!preview ? (
        <label className="border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer text-gray-500 hover:border-purple-500 transition">
          <div className="text-3xl mb-2">⬆️</div>
          <p className="font-medium">Drag & drop your image here</p>
          <p className="text-sm mt-1">or</p>

          <span className="mt-3 inline-block bg-purple-600 text-white px-4 py-2 rounded-md">
            Choose File
          </span>

          <p className="text-xs mt-3 text-gray-400">
            Supported formats: PNG, JPG, JPEG (Max 10MB)
          </p>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
        </label>
      ) : (
        <div className="space-y-4">
          {/* Original Image */}
          <div className="border rounded-lg p-4">
            <p className="font-medium mb-2">Original Image</p>
            <img
              src={preview}
              alt="Preview"
              className="rounded-lg max-h-64 mx-auto"
            />
          </div>

          {/* Result Image */}
          {result && (
            <div className="border rounded-lg p-4">
              <p className="font-medium mb-2">Background Removed</p>
              <img
                src={result}
                alt="Result"
                className="rounded-lg max-h-64 mx-auto"
              />
            </div>
          )}

          <button
            onClick={result ? downloadImage : removeBackground}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-medium transition disabled:opacity-60"
          >
            {loading ? "Processing..." : result ? "Download Image" : "Remove Background"}
          </button>
        </div>
      )}
    </div>
  );
}
