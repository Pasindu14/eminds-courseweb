import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useOpenEmbeddedVideo } from "@/zustand/dialog-store";

export function EmbeddedVideo() {
  const { isOpen, onClose, link } = useOpenEmbeddedVideo();

  if (!link) {
    return null;
  }

  const replaceUrl = (link: string): string => {
    return link.replace("www.dropbox.com", "dl.dropboxusercontent.com");
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[calc(70vw)]">
        <div
          className="flex flex-col items-center justify-center"
          onContextMenu={handleContextMenu}
        >
          <video
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
