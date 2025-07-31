import Image from 'next/image'

export default function BackgroundElements() {
  return (
    <div className="absolute top-0 left-0 w-full h-full">
      {/* Left side curved lines */}
      <Image
        src="/decorative-lines-left.png"
        alt=""
        width={400}
        height={600}
        className="absolute top-0 left-0 opacity-40"
      />
      {/* Right side curved lines */}
      <Image
        src="/decorative-lines-right.png"
        alt=""
        width={400}
        height={600}
        className="absolute top-0 right-0 opacity-40"
      />
    </div>
  )
}
