import DoctorProfile from './DoctorProfile'

export default function PhoneMockup() {
    return (
        <div className="w-full h-full bg-black rounded-[2rem] p-1 shadow-2xl">
            <div className="w-full h-full bg-white rounded-[1.8rem] overflow-hidden relative">
                {/* Status Bar */}
                <div className="flex justify-between items-center px-4 py-2 bg-white text-black">
                    <div className="text-sm font-semibold">9:41</div>
                    <div className="flex items-center space-x-1">
                        <div className="flex space-x-1">
                            <div className="w-1 h-1 bg-black rounded-full"></div>
                            <div className="w-1 h-1 bg-black rounded-full"></div>
                            <div className="w-1 h-1 bg-black rounded-full"></div>
                        </div>
                        <div className="w-6 h-3 border border-black rounded-sm">
                            <div className="w-4 h-1 bg-green-500 rounded-sm mt-0.5 ml-0.5"></div>
                        </div>
                    </div>
                </div>

                {/* App Content */}
                <div className="flex-1 bg-gray-50">
                    <DoctorProfile />
                </div>
            </div>
        </div>
    )
}