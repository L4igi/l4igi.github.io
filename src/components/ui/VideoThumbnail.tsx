import { useRef } from "react";
import { Play } from "lucide-react";

export const VideoThumbnail = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => videoRef.current?.play().catch(() => {});
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="relative w-full h-full bg-black group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
        <div className="bg-black/50 backdrop-blur-sm p-2 rounded-full border border-white/20 shadow-lg">
          <Play size={16} className="text-white fill-white" />
        </div>
      </div>
    </div>
  );
};
