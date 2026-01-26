export default function FeatureCard({ title, desc, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 text-center">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-gray-600 text-sm mt-2">{desc}</p>
    </div>
  );
}
