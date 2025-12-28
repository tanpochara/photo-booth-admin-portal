import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEditFrameOverview } from "@/hooks/api/useEditFrameOverview";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { EditOverviewRequestDto } from "@/api";
import { toast } from "sonner";

type Props = {
  frameId: string;
  displayedName: string;
  frame: {
    layout?: string | null;
    imagesCount: number;
    replaceBackgroundPrompt?: string | null;
  };
};

export function OverviewTab({ frameId, displayedName, frame }: Props) {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useEditFrameOverview();
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState<EditOverviewRequestDto>({
    name: displayedName,
    layout: frame.layout ?? null,
    imagesCount: frame.imagesCount,
    replaceBackgroundPrompt: frame.replaceBackgroundPrompt ?? null,
  });

  useEffect(() => {
    if (!isEditing) {
      setForm({
        name: displayedName,
        layout: frame.layout ?? null,
        imagesCount: frame.imagesCount,
        replaceBackgroundPrompt: frame.replaceBackgroundPrompt ?? null,
      });
    }
  }, [displayedName, frame.imagesCount, frame.layout, frame.replaceBackgroundPrompt, isEditing]);

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


