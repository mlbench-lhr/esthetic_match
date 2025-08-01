import Image from 'next/image'

const leftFeatures = [
  {
    icon: "/images/features/filter.svg",
    title: "Ultra-Precise Filters",
    description: "Explore the full world of aesthetic medicine — with smart filters that reference every technique, brand, and technology in the industry.",
    className: "items-start"
  },
  {
    icon: "/images/features/hand.svg",
    title: "Swipe, Match & Geolocate",
    description: "A swipe-based interface with geolocation helps you find the best practitioners near you. Connections are — fast, easy, and personalized.",
    className: "items-start"
  }
]

const rightFeatures = [
  {
    icon: "/images/features/users.svg",
    title: "Rich Practitioner Profiles",
    description: "Access detailed clinic profiles, signature techniques, top procedures, before/after galleries, verified reviews, and more — all in one place.",
    className: "text-right items-end mt-30"
  },
  {
    icon: "/images/features/shield.svg",
    title: "Online Medical Opinion",
    description: "Request a remote medical opinion before booking — to gain clarity, ask questions, and confirm your perfect match with confidence.",
    className: "text-right items-end"
  }
]

export default function Features() {
  return (
    <div className="relative flex justify-center items-start w-full max-w-7xl mx-auto ">

      {/* Left side features */}
      <div className="absolute left-0 top-0 space-y-16 w-80">
        {leftFeatures.map((feature, index) => (
          <FeatureCard
            key={`left-${index}`}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            className={index === 1 ? "mt-24" : ""}
          />
        ))}
      </div>

      {/* Center phone mockup */}
      <div className="relative z-20">
        <Image
          src="/images/features/mobile.svg"
          alt="Aesthetic Match App Interface"
          width={350}
          height={700}
          className="relative z-10"
          priority
        />
      </div>

      {/* Right side features */}
      <div className="absolute right-0 top-0 space-y-16 w-80">
        {rightFeatures.map((feature, index) => (
          <FeatureCard
            key={`right-${index}`}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            className={feature.className}
          />
        ))}
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description, className = "" }:{ icon: string, title: string, description: string, className?: string }) {
  return (
    <div className={`flex flex-col space-x-4 ${className} max-w-[250px]`}>
      <div className="mt-1">
        <div className="w-full h-full  bg-opacity-20 rounded flex items-center ">
          <Image src={icon} alt="" width={40} height={40} className="" />
        </div>
      </div>
      <div>
        <h5 className="h5 text-white_primary font-semibold mb-3">{title}</h5>
        <p className="p3 text-white_secondary font-normal leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}