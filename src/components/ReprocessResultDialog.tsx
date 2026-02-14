import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface ReprocessResultDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newJobId: string;
}

export const ReprocessResultDialog = ({
  open,
  onOpenChange,
  newJobId,
}: ReprocessResultDialogProps) => {
  const resultUrl = `https://keptscene.com/result?jobId=${newJobId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(resultUrl);
      toast.success("Link copied to clipboard!");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Reprocess Complete</DialogTitle>
          <DialogDescription>
            The job has been successfully reprocessed. Copy the link or open it in a new tab to view the result.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Link Section with Copy Button */}
          <div className="flex items-center gap-2">
            <div className="flex-1 rounded-md border bg-muted px-3 py-2 font-mono text-sm">
              {resultUrl}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopyLink}
              title="Copy link"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          {/* Open in New Tab Button */}
          <div className="flex flex-col items-center gap-3 py-6 border rounded-md bg-muted/30">
            <p className="text-sm text-muted-foreground">
              Click below to view the reprocessed result
            </p>
            <Button
              size="lg"
              onClick={() => window.open(resultUrl, "_blank", "noopener,noreferrer")}
              className="gap-2"
            >
              <ExternalLink className="h-5 w-5" />
              Open in New Tab
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
