export default function MedicalScene() {
  return (
    <div className="relative w-96 h-96">
      {/* Patient silhouette */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-full opacity-30"></div>
      
      {/* Medical equipment suggestion */}
      <div className="absolute top-20 left-10 w-8 h-8 bg-purple-300 rounded-full opacity-40"></div>
      <div className="absolute top-32 right-16 w-6 h-6 bg-pink-300 rounded-full opacity-40"></div>
      <div className="absolute bottom-32 left-20 w-10 h-10 bg-blue-200 rounded-lg opacity-30"></div>
      
      {/* Subtle medical cross */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-16 h-4 bg-white/20 rounded-full"></div>
        <div className="w-4 h-16 bg-white/20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  )
}