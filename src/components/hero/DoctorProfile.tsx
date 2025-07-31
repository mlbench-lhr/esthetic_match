export default function DoctorProfile() {
    return (
        <div className="p-4 h-full">
            {/* Doctor Profile Image */}
            <div className="relative mb-4">
                <div className="w-full h-48 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-2xl overflow-hidden relative">
                    {/* Profile photo placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                    {/* Heart icon */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                    </div>

                    {/* Doctor info overlay */}
                    <div className="absolute bottom-4 left-4">
                        <h3 className="text-white font-semibold text-lg">Noelle Moreau</h3>
                        <p className="text-white/90 text-sm">10+ years experience</p>
                    </div>
                </div>
            </div>

            {/* About section */}
            <div className="mb-4">
                <h4 className="font-semibold text-gray-900 text-sm mb-2">About</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    posuere diam at vehicula ullamcorper. Pellentesque
                    a nulla sagittis, vulputate urna non. Viverra leo
                </p>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-gray-600">1.1 miles</span>
                </div>
                <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Aesthetic Medicine Study</span>
                </div>
            </div>

            {/* Specialty badges */}
            <div className="flex items-center space-x-2 mb-4">
                <div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-xs">A</span>
                </div>
                <div className="w-7 h-7 bg-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-pink-600 font-bold text-xs">M</span>
                </div>
                <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xs">D</span>
                </div>
            </div>

            {/* Clinic info */}
            <div className="bg-white rounded-xl p-3 mb-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center space-x-1 mb-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span className="text-xs font-medium text-gray-900">Clinique Nouvelle Beauté</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Before/After Gallery */}
            <div className="mb-4">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Before/After Gallery</span>
                    <span className="text-xs text-blue-600 font-medium">View All →</span>
                </div>
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center space-x-1">
                <div className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
            </div>
        </div>
    )
}