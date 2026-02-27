import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditFrameOverview } from "@/hooks/api/useEditFrameOverview";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { EditOverviewRequestDto, DetailedFrameResponseDto } from "@/api";
import { toast } from "sonner";

type Props = {
  frameId: string;
  displayedName: string;
  price: number;
  frameType: DetailedFrameResponseDto.frameType;
  aspectRatio: DetailedFrameResponseDto.aspectRatio;
  frame: {
    layout?: string | null;
    imagesCount: number;
    replaceBackgroundPrompt?: string | null;
  };
};

export function OverviewTab({ frameId, displayedName, price, frameType, aspectRatio, frame }: Props) {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useEditFrameOverview();
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState<EditOverviewRequestDto>({
    name: displayedName,
    layout: frame.layout ?? null,
    imagesCount: frame.imagesCount,
    replaceBackgroundPrompt: frame.replaceBackgroundPrompt ?? null,
    price: price,
    frameType: frameType,
    aspectRatio: aspectRatio,
  });

  useEffect(() => {
    if (!isEditing) {
      setForm({
        name: displayedName,
        layout: frame.layout ?? null,
        imagesCount: frame.imagesCount,
        replaceBackgroundPrompt: frame.replaceBackgroundPrompt ?? null,
        price: price,
        frameType: frameType,
        aspectRatio: aspectRatio,
      });
    }
  }, [displayedName, frame.imagesCount, frame.layout, frame.replaceBackgroundPrompt, price, frameType, aspectRatio, isEditing]);

  async function onSave() {
    await mutateAsync(
      { frameId, overview: form },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ["frame-detailed"] });
          toast.success("Frame overview updated");
          setIsEditing(false);
        },
        onError: () => {
          toast.error("Failed to update frame overview");
        },
      }
    );
  }

  const getAspectRatioLabel = (aspectRatio: DetailedFrameResponseDto.aspectRatio) => {
    switch (aspectRatio) {
      case DetailedFrameResponseDto.aspectRatio.ONE_TO_ONE:
        return "1:1 Square";
      case DetailedFrameResponseDto.aspectRatio.FOUR_TO_THREE:
        return "4:3 Landscape";
      case DetailedFrameResponseDto.aspectRatio.THREE_TO_FOUR:
        return "3:4 Portrait";
      case DetailedFrameResponseDto.aspectRatio.FOUR_TO_FIVE:
        return "4:5 Portrait";
      case DetailedFrameResponseDto.aspectRatio.FIVE_TO_FOUR:
        return "5:4 Landscape";
      default:
        return "Unknown";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>Basic metadata about this frame.</CardDescription>
        <CardAction>
          {!isEditing ? (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isPending}>
                Cancel
              </Button>
              <Button onClick={onSave} disabled={isPending}>
                Save
              </Button>
            </div>
          )}
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">ID</div>
            <div className="font-mono text-sm">{frameId}</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Name</div>
            {isEditing ? (
              <Input
                value={form.name ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                disabled={isPending}
              />
            ) : (
              <div className="font-medium">{displayedName}</div>
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <div className="text-sm text-muted-foreground">Layout</div>
            {isEditing ? (
              <Input
                value={form.layout ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, layout: e.target.value || null }))}
                disabled={isPending}
              />
            ) : (
              <div className="font-medium">{frame.layout || "-"}</div>
            )}
          </div>

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Images count</div>
            {isEditing ? (
              <Input
                type="number"
                value={form.imagesCount ?? ""}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    imagesCount: e.target.value === "" ? null : Number(e.target.value),
                  }))
                }
                disabled={isPending}
              />
            ) : (
              <div className="font-medium">{frame.imagesCount}</div>
            )}
          </div>

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Price</div>
            {isEditing ? (
              <div className="relative">
                <Input
                  type="number"
                  value={form.price ? Math.round(form.price / 100) : ""}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      price: e.target.value === "" ? null : Math.round(Number(e.target.value) * 100),
                    }))
                  }
                  disabled={isPending}
                  className="pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  THB
                </span>
              </div>
            ) : (
              <div className="font-medium">{(price / 100).toFixed(2)} THB</div>
            )}
          </div>

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Frame Type</div>
            {isEditing ? (
              <Select
                value={form.frameType ?? ""}
                onValueChange={(value) =>
                  setForm((p) => ({
                    ...p,
                    frameType: value as DetailedFrameResponseDto.frameType,
                  }))
                }
                disabled={isPending}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frame type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MONTHLY">Monthly</SelectItem>
                  <SelectItem value="LOCATION">Location</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="font-medium">{frameType}</div>
            )}
          </div>

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Aspect Ratio</div>
            {isEditing ? (
              <Select
                value={form.aspectRatio ?? ""}
                onValueChange={(value) =>
                  setForm((p) => ({
                    ...p,
                    aspectRatio: value as DetailedFrameResponseDto.aspectRatio,
                  }))
                }
                disabled={isPending}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select aspect ratio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ONE_TO_ONE">1:1 Square</SelectItem>
                  <SelectItem value="FOUR_TO_THREE">4:3 นอน</SelectItem>
                  <SelectItem value="THREE_TO_FOUR">3:4 ตั้ง</SelectItem>
                  <SelectItem value="FOUR_TO_FIVE">4:5 ตั้ง</SelectItem>
                  <SelectItem value="FIVE_TO_FOUR">5:4 นอน</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="font-medium">
                {getAspectRatioLabel(aspectRatio)}
              </div>
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <div className="text-sm text-muted-foreground">Replace background prompt</div>
            {isEditing ? (
              <textarea
                value={form.replaceBackgroundPrompt ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, replaceBackgroundPrompt: e.target.value || null }))}
                disabled={isPending}
                className="min-h-[96px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50"
              />
            ) : (
              <div className="font-medium whitespace-pre-wrap">{frame.replaceBackgroundPrompt || "-"}</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


