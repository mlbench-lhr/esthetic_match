import React from 'react'
import TreatmentCarousel from './TreatmentCarousel'

function Services() {
    return (
        <div className="min-h-screen bg-gray-50 py-20">
            <div className="max-w-7xl mx-auto px-8">
                {/* Header */}
                <div className="mb-16">
                    <h1 className="text-4xl font-light text-gray-900 mb-4">
                        All Aesthetic Universes in one App
                    </h1>
                </div>

                {/* Carousel */}
                <div className="relative">
                    <TreatmentCarousel />
                </div>
            </div>
        </div>
    )
}

export default Services