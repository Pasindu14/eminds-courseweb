import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useOpenEmbeddedVideo } from "@/zustand/dialog-store";
import { useRef, useState } from "react";
import { RotateCcw, RotateCw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function EmbeddedVideo() {
  const { isOpen, onClose, link } = useOpenEmbeddedVideo();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [speed, setSpeed] = useState("1");

  if (!link) return null;

  const replaceUrl = (link: string): string => {
    return link.replace("www.dropbox.com", "dl.dropboxusercontent.com");
  };

  const toRawUrl = (link: string): string => {
    const u = new URL(link);
    u.hostname = "www.dropbox.com";
    u.searchParams.delete("dl"); // remove dl=0/1
    u.searchParams.set("raw", "1"); // force raw stream
    return u.toString();
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const changeSpeed = (value: string) => {
    setSpeed(value);
    if (videoRef.current) {
      videoRef.current.playbackRate = parseFloat(value);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[calc(70vw)]">
        <div
          className="flex flex-col items-center justify-center"
          onContextMenu={handleContextMenu}
        >
          <div className="w-full flex flex-col items-center gap-2">
            <video
              ref={videoRef}
              width="95%"
              controls
              preload="none"
              autoPlay
              controlsList="nodownload"
              disablePictureInPicture
            >
              <source src={toRawUrl(link)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

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
            <Select value={speed} onValueChange={changeSpeed}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Speed" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.5">0.5x</SelectItem>
                <SelectItem value="1">1x</SelectItem>
                <SelectItem value="1.5">1.5x</SelectItem>
                <SelectItem value="2">2x</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
