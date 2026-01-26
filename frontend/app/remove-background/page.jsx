import UploadBox from "@/components/UploadBox";
import FeatureCard from "@/components/FeatureCard";

export const metadata = {
  title: "AI Background Remover – Free Online Tool",
  description:
    "Remove image backgrounds instantly using AI. Fast, accurate and completely free.",
};

export default function RemoveBackgroundPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 font-semibold">
          <span className="text-purple-600">🖼️</span>
          AI Background Remover
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Remove Image Backgrounds with AI
        </h1>
        <p className="mt-4 text-gray-600">
          Upload your image and let our AI instantly remove the background.
          Fast, accurate, and completely free.
        </p>

        {/* Upload Box */}
        <div className="mt-10">
          <UploadBox />
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold text-center mb-10">
          Why Choose Our Background Remover?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            title="AI-Powered"
            desc="Advanced AI technology ensures accurate background removal."
            icon="✨"
          />
          <FeatureCard
            title="Lightning Fast"
            desc="Process images in seconds with our optimized system."
            icon="⚡"
          />
          <FeatureCard
            title="Easy Download"
            desc="Download your processed images with transparent backgrounds."
            icon="⬇️"
          />
        </div>
      </section>
    </main>
  );
}
