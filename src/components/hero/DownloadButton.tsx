import Link from "next/link";

export default function DownloadButton({text, className}:{text:string, className?: string}) {
  return (
    <Link href="https://v0-waiting-list-form.vercel.app/" target="_blank" className={` items-center px-8  bg-gray-900 text-white font-semibold text-14 tracking-wide  hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${className}`}>
      {text}
    </Link>
  )
}