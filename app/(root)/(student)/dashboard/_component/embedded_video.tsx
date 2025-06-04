import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useOpenEmbeddedVideo } from "@/zustand/dialog-store";
import { useRef } from "react";
import { RotateCcw, RotateCw } from "lucide-react"; // Lucide icons

export function EmbeddedVideo() {
  const { isOpen, onClose, link } = useOpenEmbeddedVideo();
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!link) return null;

  const replaceUrl = (link: string): string => {
    return link.replace("www.dropbox.com", "dl.dropboxusercontent.com");
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[calc(70vw)]">
        <div
          className="flex flex-col items-center justify-center"
          onContextMenu={handleContextMenu}
        >
          <video
            ref={videoRef}
            width="95%"
            controls
            preload="none"
            autoPlay
            controlsList="nodownload"
            disablePictureInPicture
          >
            <source src={replaceUrl(link)} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="flex gap-4 mt-4">
            <Button
              onClick={() => skip(-10)}
              className="flex items-center gap-2"
              variant="outline"
            >
              <RotateCcw size={18} />
              Rewind 10s
            </Button>
            <Button
              onClick={() => skip(10)}
              variant="outline"
              className="flex items-center gap-2"
            >
              Skip 10s
              <RotateCw size={18} />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
