export default function DownloadButton({text}:{text:string}) {
  return (
    <button className="inline-flex items-center px-8 py-2.5 bg-gray-900 text-white font-semibold text-sm tracking-wide rounded-full hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
      {text}
    </button>
  )
}