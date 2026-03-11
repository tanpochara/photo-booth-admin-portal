import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLinkMerchantFrame } from "@/hooks/api/useLinkMerchantFrame";
import { useUnlinkMerchantFrame } from "@/hooks/api/useUnlinkMerchantFrame";
import { useGetFrameDetailed } from "@/hooks/api/useGetFrameDetailed";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { DetailedMerchantChildFrameDto } from "@/api";

type Props = {
  merchantId: string;
  childFrames: Array<DetailedMerchantChildFrameDto>;
};

export function MerchantFramesTab({ merchantId, childFrames }: Props) {
  const queryClient = useQueryClient();
  const { mutateAsync: linkFrame, isPending } = useLinkMerchantFrame();
  const { mutateAsync: unlinkFrame, isPending: isUnlinking } = useUnlinkMerchantFrame();
  const { data: allFrames } = useGetFrameDetailed();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFrameId, setSelectedFrameId] = useState<string | null>(null);

  const linkedFrameIds = useMemo(() => new Set(childFrames.map((f) => f.id)), [childFrames]);

  const availableFrames = useMemo(() => {
    if (!allFrames) return [];
    return allFrames.filter((f) => f.isActive && !linkedFrameIds.has(f.id));
  }, [allFrames, linkedFrameIds]);

  async function onUnlinkFrame(childFrameId: string) {
    try {
      await unlinkFrame(
        { merchantId, body: { childFrameId } },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["merchants-detailed"] });
          },
        }
      );
      toast.success("Frame unlinked successfully");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to unlink frame";
      toast.error(message);
    }
  }

  async function onLinkFrame() {
    if (!selectedFrameId) return;

    try {
      await linkFrame(
        { merchantId, body: { childFrameId: selectedFrameId } },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["merchants-detailed"] });
          },
        }
      );
      toast.success("Frame linked successfully");
      setIsDialogOpen(false);
      setSelectedFrameId(null);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to link frame";
      toast.error(message);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Linked Frames</CardTitle>
        <CardDescription>Child frames linked to this merchant.</CardDescription>
        <CardAction>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) setSelectedFrameId(null); }}>
            <DialogTrigger asChild>
              <Button>Link frame</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Link a frame</DialogTitle>
                <DialogDescription>Select a child frame to link to this merchant.</DialogDescription>
              </DialogHeader>

              <ScrollArea className="max-h-[40vh]">
                {availableFrames.length === 0 ? (
                  <div className="py-4 text-center text-sm text-muted-foreground">
                    No available frames to link.
                  </div>
                ) : (
                  <div className="grid gap-2 pr-3">
                    {availableFrames.map((frame) => (
                      <button
                        key={frame.id}
                        type="button"
                        onClick={() => setSelectedFrameId(frame.id)}
                        disabled={isPending}
                        className={`flex items-center gap-3 rounded-md border p-3 text-left transition-colors ${
                          selectedFrameId === frame.id
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "hover:bg-accent/50"
                        }`}
                      >
                        {frame.sampleImageUrl && (
                          <img
                            src={frame.sampleImageUrl}
                            alt={frame.name}
                            className="h-10 w-10 shrink-0 rounded border object-cover"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium">{frame.name}</div>
                          <div className="truncate text-xs text-muted-foreground">
                            {frame.aspectRatio} &middot; {frame.frameType} &middot; {(frame.price / 100).toFixed(2)} THB
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </ScrollArea>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isPending}>
                  Cancel
                </Button>
                <Button onClick={onLinkFrame} disabled={!selectedFrameId || isPending}>
                  Link
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>
      <CardContent>
        {childFrames.length === 0 ? (
          <div className="text-sm text-muted-foreground">No frames linked yet.</div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {childFrames.map((frame) => (
              <div
                key={frame.id}
                className="flex flex-col rounded-lg border overflow-hidden"
              >
                {frame.sampleImageUrl ? (
                  <img
                    src={frame.sampleImageUrl}
                    alt={frame.name}
                    className="h-28 w-full object-cover bg-muted"
                  />
                ) : (
                  <div className="flex h-28 w-full items-center justify-center bg-muted text-xs text-muted-foreground">
                    No image
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-2 p-2.5">
                  <div className="text-sm font-medium leading-tight truncate">{frame.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {frame.frameType} &middot; {(frame.price / 100).toFixed(0)} THB
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="mt-auto w-full"
                    onClick={() => onUnlinkFrame(frame.id)}
                    disabled={isUnlinking}
                  >
                    Unlink
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
